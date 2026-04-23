import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Loader2, UploadCloud } from "lucide-react";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState("Sparkles");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // FETCH DATA
  const fetchServices = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(data || []);
    } catch (e) {
        console.error("Error fetching services", e);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ADD
  const addService = async () => {
    if (!title || !price || !desc) return;
    
    setUploading(true);

    const saveToDb = async (imageUrl = "") => {
      try {
        await addDoc(collection(db, "services"), { title, price, desc, img: imageUrl, icon });
        fetchServices();
        setTitle("");
        setPrice("");
        setDesc("");
        setFile(null);
        setIcon("Sparkles");
        setProgress(0);
        setUploading(false);
      } catch (e) {
        console.error("Error adding service", e);
        setUploading(false);
      }
    };

    if (file) {
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
          saveToDb(data.data.url);
        } else {
          console.error("ImgBB Upload Failed:", data);
          setUploading(false);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploading(false);
      }
    } else {
      saveToDb("");
    }
  };

  // DELETE
  const deleteService = async (id) => {
    try {
        await deleteDoc(doc(db, "services", id));
        fetchServices();
    } catch (e) {
        console.error("Error deleting service", e);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Services</h2>

      {/* Add Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <input className="w-full border p-2 rounded focus:ring-2 outline-none" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Service Title" />
              <input className="w-full border p-2 rounded focus:ring-2 outline-none" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (e.g. Starting ₹1,000)" />
              <select className="w-full border p-2 rounded focus:ring-2 outline-none" value={icon} onChange={(e) => setIcon(e.target.value)}>
                <option value="Sparkles">Sparkles Icon</option>
                <option value="Heart">Heart Icon</option>
                <option value="Flower2">Flower Icon</option>
                <option value="Scissors">Scissors Icon</option>
                <option value="Palette">Palette Icon</option>
                <option value="Hand">Hand Icon</option>
              </select>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">{file ? file.name : "Optional: Click or drag image for this service"}</p>
              </div>
              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full transition-all animate-pulse w-full"></div>
                </div>
              )}
            </div>

            <div className="h-full flex flex-col">
              <p className="text-sm font-medium text-gray-700 mb-1">Service Description</p>
              <div className="flex-1 bg-white">
                <ReactQuill theme="snow" value={desc} onChange={setDesc} className="h-48 mb-12" />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              disabled={uploading || !title || !price || !desc}
              className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2" 
              onClick={addService}
            >
              {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
              {uploading ? "Saving..." : "Add Service"}
            </button>
          </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((item) =>
          <div key={item.id} className="border p-4 rounded-xl bg-white shadow-sm flex flex-col">
              {item.img && <img src={item.img} alt="service" className="w-full h-32 object-cover rounded-lg mb-3" />}
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-primary font-medium my-1">{item.price}</p>
              <div className="text-sm text-gray-500 mb-4 line-clamp-3 quill-content" dangerouslySetInnerHTML={{ __html: item.desc }}></div>
              <div className="mt-auto pt-2 border-t">
                <button className="text-red-500 hover:text-red-700 text-sm font-medium" onClick={() => deleteService(item.id)}>Delete</button>
              </div>
            </div>
          )}
      </div>
    </div>);
}