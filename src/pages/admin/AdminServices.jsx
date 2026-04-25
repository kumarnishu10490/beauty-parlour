import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Loader2, UploadCloud, Edit2, Trash2, X } from "lucide-react";

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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Services</h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-4 relative">
          {editingId && (
            <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Editing Mode
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
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
                <p className="text-sm text-gray-500 text-center">{file ? file.name : (currentImg ? "Upload new image to replace existing" : "Click or drag image for this service")}</p>
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
          
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            {editingId && (
              <button 
                onClick={resetForm}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
            <button 
              disabled={uploading || !title || !price || !desc}
              className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2" 
              onClick={saveService}
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Edit2 className="w-4 h-4" /> : <UploadCloud className="w-4 h-4" />)}
              {uploading ? "Saving..." : (editingId ? "Update Service" : "Add Service")}
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
              <div className="mt-auto pt-4 border-t flex justify-end gap-3">
                <button 
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1" 
                  onClick={() => handleEdit(item)}
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button 
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1" 
                  onClick={() => deleteService(item.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}