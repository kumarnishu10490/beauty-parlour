import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Edit2, Trash2, X } from "lucide-react";

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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-4 relative">
          {editingId && (
            <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">
              <Edit2 className="w-3 h-3" /> Editing Mode
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <input className="border p-2 rounded focus:ring-2 outline-none" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title (e.g. Basic Beauty)" />
            <input className="border p-2 rounded focus:ring-2 outline-none" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (e.g. 3 Months)" />
            <input className="border p-2 rounded focus:ring-2 outline-none" value={students} onChange={(e) => setStudents(e.target.value)} placeholder="Students (e.g. 50+ Enrolled)" />
            <input className="border p-2 rounded focus:ring-2 outline-none" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="Original Price (e.g. ₹15,000)" />
            <input className="border p-2 rounded focus:ring-2 outline-none" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Discounted Price (e.g. ₹12,000)" />
            <div className="flex items-center gap-2 px-2">
                <input type="checkbox" id="popular" checked={popular} onChange={(e) => setPopular(e.target.checked)} className="w-4 h-4 text-primary" />
                <label htmlFor="popular" className="text-gray-700">Mark as Popular</label>
            </div>
          </div>
          <div className="h-48 mb-12">
            <ReactQuill theme="snow" value={description} onChange={setDescription} className="h-full" placeholder="Course Description..." />
          </div>
          <textarea className="border p-2 rounded w-full focus:ring-2 outline-none h-20" value={modules} onChange={(e) => setModules(e.target.value)} placeholder="Modules (comma separated, e.g. Skincare Basics, Hair Styling, Makeup)"></textarea>
          
          <div className="flex justify-end gap-3 pt-2">
            {editingId && (
              <button 
                onClick={resetForm}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
            <button 
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2" 
                onClick={saveCourse}
            >
                <Edit2 className="w-4 h-4" /> {editingId ? "Update Course" : "Add Course"}
            </button>
          </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map((item) =>
          <div key={item.id} className="border p-5 rounded-xl bg-white shadow-sm flex flex-col relative">
              {item.popular && <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">Popular</span>}
              <h3 className="font-bold text-xl mb-1">{item.title}</h3>
              <div className="flex gap-4 text-xs text-gray-500 mb-2">
                  <span>{item.duration}</span>
                  <span>{item.students}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                  <p className="text-gradient-gold font-bold text-lg">{item.price}</p>
                  {item.originalPrice && <p className="text-gray-400 line-through text-sm">{item.originalPrice}</p>}
              </div>
              <div className="text-sm text-gray-600 mb-4 quill-content line-clamp-3" dangerouslySetInnerHTML={{ __html: item.description }}></div>
              
              <div className="mb-4 text-sm text-gray-500">
                  <strong>Modules:</strong>
                  <ul className="list-disc pl-4 mt-1">
                      {item.modules && item.modules.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
              </div>

              <div className="mt-auto pt-4 border-t flex justify-end gap-3">
                <button 
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1" 
                  onClick={() => handleEdit(item)}
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button 
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1" 
                  onClick={() => deleteCourse(item.id)}
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
