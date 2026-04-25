import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Loader2, UploadCloud, Edit2, Trash2, X, Sparkles, Heart, Scissors, Palette, Hand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState("Sparkles");
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentImg, setCurrentImg] = useState("");

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

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setDesc("");
    setFile(null);
    setIcon("Sparkles");
    setEditingId(null);
    setCurrentImg("");
  };

  const handleEdit = (service) => {
    setTitle(service.title);
    setPrice(service.price);
    setDesc(service.desc);
    setIcon(service.icon || "Sparkles");
    setCurrentImg(service.img || "");
    setEditingId(service.id);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveService = async () => {
    if (!title || !price || !desc) return;
    
    setUploading(true);

    const saveToDb = async (imageUrl = "") => {
      try {
        const finalImg = imageUrl || currentImg;
        if (editingId) {
          await updateDoc(doc(db, "services", editingId), { title, price, desc, img: finalImg, icon });
        } else {
          await addDoc(collection(db, "services"), { title, price, desc, img: finalImg, icon, createdAt: new Date().toISOString() });
        }
        fetchServices();
        resetForm();
        setUploading(false);
      } catch (e) {
        console.error("Error saving service", e);
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

  const deleteService = async (id) => {
    if(!window.confirm("Are you sure you want to delete this service?")) return;
    try {
        await deleteDoc(doc(db, "services", id));
        fetchServices();
    } catch (e) {
        console.error("Error deleting service", e);
    }
  };

  return (
    <div className="p-6 md:p-10 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Admin Services</h2>
          <p className="text-zinc-400 text-sm mt-1">Add or modify the beauty services you offer.</p>
        </div>
      </div>

      {/* Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-zinc-800/50 mb-12 shadow-2xl relative overflow-hidden"
      >
          {editingId && (
            <div className="absolute top-4 right-4 bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-rose-500/20">
              <Edit2 className="w-3 h-3" /> Editing Mode
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Service Title</label>
                <input 
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Bridal Makeup" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Pricing</label>
                <input 
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="e.g. Starting ₹2,500" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Service Icon</label>
                <select 
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all appearance-none" 
                  value={icon} 
                  onChange={(e) => setIcon(e.target.value)}
                >
                  <option value="Sparkles">Sparkles</option>
                  <option value="Heart">Heart</option>
                  <option value="Flower2">Flower</option>
                  <option value="Scissors">Haircare</option>
                  <option value="Palette">Makeup</option>
                  <option value="Hand">Massage</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Service Image</label>
                <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800/30 transition-all relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <UploadCloud className="w-10 h-10 text-zinc-500 mb-2 group-hover:text-rose-400 transition-colors" />
                  <p className="text-sm text-zinc-400 text-center font-medium">
                    {file ? file.name : (currentImg ? "Change existing image" : "Click to upload service photo")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Description</label>
              <div className="flex-1 bg-zinc-950/30 rounded-2xl border border-zinc-800 overflow-hidden quill-dark">
                <ReactQuill theme="snow" value={desc} onChange={setDesc} className="h-full min-h-[200px]" />
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-end gap-3">
            {editingId && (
              <button 
                onClick={resetForm}
                className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
            <button 
              disabled={uploading || !title || !price || !desc}
              className="bg-white text-zinc-950 px-10 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2" 
              onClick={saveService}
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingId ? <Edit2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />)}
              {uploading ? "Saving..." : (editingId ? "Update Service" : "Publish Service")}
            </button>
          </div>
      </motion.div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {services.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id} 
                className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 p-5 rounded-3xl hover:border-rose-500/30 transition-all duration-500 flex flex-col shadow-xl"
              >
                  {item.img && (
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-4">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-white group-hover:text-rose-400 transition-colors">{item.title}</h3>
                    <div className="p-2 bg-rose-500/10 rounded-lg">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                    </div>
                  </div>
                  <p className="text-rose-300 font-bold text-lg mb-3">{item.price}</p>
                  <div className="text-sm text-zinc-400 mb-6 line-clamp-3 quill-content flex-1" dangerouslySetInnerHTML={{ __html: item.desc }}></div>
                  
                  <div className="pt-4 border-t border-zinc-800 flex justify-between gap-3">
                    <button 
                      className="text-zinc-400 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors" 
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      className="text-zinc-500 hover:text-rose-400 text-sm font-semibold flex items-center gap-2 transition-colors" 
                      onClick={() => deleteService(item.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
              </motion.div>
            ))}
          </AnimatePresence>
      </div>
    </div>
  );
}