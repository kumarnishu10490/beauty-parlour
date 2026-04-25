import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Edit2, Trash2, X, BookOpen, Clock, Users, Star, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  
  // Form state
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [students, setStudents] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState("");
  const [popular, setPopular] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // FETCH DATA
  const fetchCourses = async () => {
    try {
        const q = query(collection(db, "courses"), orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(data || []);
    } catch (e) {
        console.error("Error fetching courses", e);
        // Fallback for docs without createdAt
        const querySnapshot = await getDocs(collection(db, "courses"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(data || []);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDuration("");
    setStudents("");
    setPrice("");
    setOriginalPrice("");
    setDescription("");
    setModules("");
    setPopular(false);
    setEditingId(null);
  };

  const handleEdit = (course) => {
    setTitle(course.title);
    setDuration(course.duration || "");
    setStudents(course.students || "");
    setPrice(course.price || "");
    setOriginalPrice(course.originalPrice || "");
    setDescription(course.description || "");
    setModules(course.modules ? course.modules.join(", ") : "");
    setPopular(course.popular || false);
    setEditingId(course.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveCourse = async () => {
    if (!title || !price || !description) return;
    
    // Convert comma-separated string to array
    const modulesArray = modules.split(",").map(m => m.trim()).filter(m => m);

    try {
        const courseData = { 
            title, 
            duration, 
            students, 
            price, 
            originalPrice,
            description, 
            modules: modulesArray,
            popular
        };

        if (editingId) {
            await updateDoc(doc(db, "courses", editingId), courseData);
        } else {
            await addDoc(collection(db, "courses"), {
                ...courseData,
                createdAt: new Date().toISOString()
            });
        }
        
        fetchCourses();
        resetForm();
    } catch (e) {
        console.error("Error saving course", e);
    }
  };

  // DELETE
  const deleteCourse = async (id) => {
    if(confirm("Are you sure you want to delete this course?")) {
        try {
            await deleteDoc(doc(db, "courses", id));
            fetchCourses();
        } catch (e) {
            console.error("Error deleting course", e);
        }
    }
  };

  return (
    <div className="p-6 md:p-10 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Manage Courses</h2>
          <p className="text-zinc-400 text-sm mt-1">Design and publish training courses for your students.</p>
        </div>
      </div>

      {/* Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-zinc-800/50 mb-12 shadow-2xl relative overflow-hidden"
      >
          {editingId && (
            <div className="absolute top-4 right-4 bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10 border border-rose-500/20">
              <Edit2 className="w-3 h-3" /> Editing Mode
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Course Title</label>
                <input className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Professional Makeup" />
            </div>
            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Duration</label>
                <input className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 3 Months" />
            </div>
            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Student Status</label>
                <input className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all" value={students} onChange={(e) => setStudents(e.target.value)} placeholder="e.g. 50+ Students" />
            </div>
            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Original Price</label>
                <input className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="e.g. ₹15,000" />
            </div>
            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Offer Price</label>
                <input className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. ₹12,000" />
            </div>
            <div className="flex items-center gap-3 px-2 mt-6">
                <input type="checkbox" id="popular" checked={popular} onChange={(e) => setPopular(e.target.checked)} className="w-5 h-5 rounded border-zinc-800 bg-zinc-950 text-rose-500 focus:ring-rose-500/50 cursor-pointer" />
                <label htmlFor="popular" className="text-zinc-300 font-medium cursor-pointer">Mark as Popular</label>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Description</label>
                <div className="bg-zinc-950/30 rounded-2xl border border-zinc-800 overflow-hidden quill-dark h-[200px]">
                    <ReactQuill theme="snow" value={description} onChange={setDescription} className="h-full" placeholder="Course Description..." />
                </div>
            </div>
            <div className="flex-1 mt-6 lg:mt-0">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Modules (Comma Separated)</label>
                <textarea className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all h-[200px] resize-none" value={modules} onChange={(e) => setModules(e.target.value)} placeholder="e.g. Skincare Basics, Hair Styling, Makeup Basics"></textarea>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-zinc-800">
            {editingId && (
              <button 
                onClick={resetForm}
                className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-all flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
            <button 
                className="bg-white text-zinc-950 px-10 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2" 
                onClick={saveCourse}
            >
                <BookOpen className="w-5 h-5" /> {editingId ? "Update Course" : "Add Course"}
            </button>
          </div>
      </motion.div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {courses.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id} 
                className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl hover:border-rose-500/30 transition-all duration-500 flex flex-col relative shadow-xl"
              >
                  {item.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg z-10 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Popular
                    </div>
                  )}
                  <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-rose-400 transition-colors">{item.title}</h3>
                  <div className="flex gap-4 text-xs text-zinc-400 mb-4 font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-rose-500" /> {item.duration}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-rose-500" /> {item.students}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                      <p className="text-white font-bold text-2xl">{item.price}</p>
                      {item.originalPrice && <p className="text-zinc-500 line-through text-sm">{item.originalPrice}</p>}
                  </div>
                  <div className="text-sm text-zinc-400 mb-6 quill-content line-clamp-3 flex-1" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                  
                  <div className="mb-6 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800">
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-rose-500" /> Key Modules
                      </p>
                      <div className="flex flex-wrap gap-2">
                          {item.modules && item.modules.slice(0, 4).map((m, i) => (
                            <span key={i} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg">
                                {m}
                            </span>
                          ))}
                          {item.modules && item.modules.length > 4 && <span className="text-[10px] text-zinc-500">+{item.modules.length - 4} more</span>}
                      </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex justify-between gap-3">
                    <button 
                      className="text-zinc-400 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors" 
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      className="text-zinc-500 hover:text-rose-400 text-sm font-semibold flex items-center gap-2 transition-colors" 
                      onClick={() => deleteCourse(item.id)}
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
