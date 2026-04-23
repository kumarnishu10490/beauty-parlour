import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Loader2, UploadCloud } from "lucide-react";

function Gallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Makeup");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // GET images
  const fetchImages = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setImages(data || []);
    } catch (e) {
        console.error("Error fetching images", e);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload to ImgBB
  const handleUpload = async () => {
    if (!file || !title) return;
    
    setUploading(true);

    try {
      const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
      if (!IMGBB_API_KEY) {
        alert("Please add VITE_IMGBB_API_KEY to your .env file");
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const downloadURL = data.data.url;
        await addDoc(collection(db, "gallery"), { url: downloadURL, title, category });
        fetchImages();
        setFile(null);
        setTitle("");
        setUploading(false);
      } else {
        console.error("ImgBB Upload Failed:", data);
        setUploading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if(confirm("Delete this image?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
        fetchImages();
      } catch (e) {
        console.error("Error deleting image", e);
      }
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Gallery</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 items-start">
          <div className="flex-1 w-full space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">{file ? file.name : "Click or drag image to upload"}</p>
            </div>
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full transition-all animate-pulse w-full"></div>
              </div>
            )}
          </div>
          
          <div className="flex-1 w-full space-y-4">
            <input
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              type="text"
              placeholder="Title (e.g. Bridal Magic)"
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
            <select 
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="Bridal">Bridal</option>
              <option value="Hair">Hair</option>
              <option value="Makeup">Makeup</option>
              <option value="Mehndi">Mehndi</option>
              <option value="Skincare">Skincare</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          <button 
            disabled={uploading || !file || !title}
            className="bg-black text-white px-8 py-3 h-[90px] rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex flex-col items-center justify-center gap-1" 
            onClick={handleUpload}
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Upload"}
            {uploading ? "Uploading..." : "Save"}
          </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img) =>
        <div key={img.id} className="relative group">
          <img src={img.url} className="w-full h-auto rounded" alt="gallery" />
          <button 
            onClick={() => handleDelete(img.id)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Delete
          </button>
        </div>
        )}
      </div>
    </div>);
}

export default Gallery;