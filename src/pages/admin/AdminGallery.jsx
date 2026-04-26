import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Loader2, UploadCloud, Trash2, Camera, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Gallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Makeup");
  const [uploading, setUploading] = useState(false);

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
        await addDoc(collection(db, "gallery"), { url: downloadURL, title, category, createdAt: new Date().toISOString() });
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
    <div className="p-6 md:p-10 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Gallery Manager</h2>
          <p className="text-zinc-400 text-sm mt-1">Upload and showcase your best beauty transformations.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row gap-6 mb-12 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-zinc-800/50 shadow-2xl items-stretch"
      >
          <div className="flex-1 min-w-0 w-full lg:w-auto">
            <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Select Image</label>
            <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800/30 transition-all relative group h-full min-h-[160px]">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <UploadCloud className="w-12 h-12 text-zinc-500 mb-2 group-hover:text-rose-400 transition-colors" />
              <p className="text-sm text-zinc-400 text-center font-medium">
                {file ? file.name : "Drop beauty photos here"}
              </p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-5 justify-center">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Photo Title</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-rose-400 transition-colors">
                  <Camera className="h-5 w-5" />
                </div>
                <input
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                  type="text"
                  placeholder="e.g. Bridal Glow"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Category</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-rose-400 transition-colors">
                  <Tag className="h-5 w-5" />
                </div>
                <select 
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all appearance-none"
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
            </div>
          </div>

          <div className="flex items-end lg:pb-0">
            <button 
              disabled={uploading || !file || !title}
              className="w-full lg:w-40 bg-white text-zinc-950 h-[52px] rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2" 
              onClick={handleUpload}
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
              {uploading ? "Saving..." : "Upload"}
            </button>
          </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {images.map((img) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={img.id} 
              className="group relative h-64 w-full rounded-3xl overflow-hidden border border-zinc-800/50 shadow-xl"
            >
              <img src={img.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={img.title} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1">{img.category}</p>
                <p className="text-white font-bold text-lg leading-tight mb-2">{img.title}</p>
                
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="w-full py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border border-rose-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Photo
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>);
}

export default Gallery;