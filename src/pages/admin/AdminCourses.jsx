import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  
  // Form state
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [students, setStudents] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState("");
  const [popular, setPopular] = useState(false);

  // FETCH DATA
  const fetchCourses = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(data || []);
    } catch (e) {
        console.error("Error fetching courses", e);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ADD
  const addCourse = async () => {
    if (!title || !price || !description) return;
    
    // Convert comma-separated string to array
    const modulesArray = modules.split(",").map(m => m.trim()).filter(m => m);

    try {
        await addDoc(collection(db, "courses"), { 
            title, 
            duration, 
            students, 
            price, 
            description, 
            modules: modulesArray,
            popular 
        });
        fetchCourses();
        setTitle("");
        setDuration("");
        setStudents("");
        setPrice("");
        setDescription("");
        setModules("");
        setPopular(false);
    } catch (e) {
        console.error("Error adding course", e);
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

      {/* Add Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input className="border p-2 rounded focus:ring-2 outline-none" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title (e.g. Basic Beauty)" />
            <input className="border p-2 rounded focus:ring-2 outline-none" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (e.g. 3 Months)" />
            <input className="border p-2 rounded focus:ring-2 outline-none" value={students} onChange={(e) => setStudents(e.target.value)} placeholder="Students (e.g. 50+ Enrolled)" />
            <input className="border p-2 rounded focus:ring-2 outline-none" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (e.g. ₹12,000)" />
            <div className="flex items-center gap-2 px-2">
                <input type="checkbox" id="popular" checked={popular} onChange={(e) => setPopular(e.target.checked)} className="w-4 h-4 text-primary" />
                <label htmlFor="popular" className="text-gray-700">Mark as Popular</label>
            </div>
          </div>
          <div className="h-48 mb-12">
            <ReactQuill theme="snow" value={description} onChange={setDescription} className="h-full" placeholder="Course Description..." />
          </div>
          <textarea className="border p-2 rounded w-full focus:ring-2 outline-none h-20" value={modules} onChange={(e) => setModules(e.target.value)} placeholder="Modules (comma separated, e.g. Skincare Basics, Hair Styling, Makeup)"></textarea>
          <button className="bg-black text-white px-6 py-2 rounded" onClick={addCourse}>Add Course</button>
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
              <p className="text-gradient-gold font-bold text-lg mb-2">{item.price}</p>
              <div className="text-sm text-gray-600 mb-4 quill-content line-clamp-3" dangerouslySetInnerHTML={{ __html: item.description }}></div>
              
              <div className="mb-4 text-sm text-gray-500">
                  <strong>Modules:</strong>
                  <ul className="list-disc pl-4 mt-1">
                      {item.modules && item.modules.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
              </div>

              <div className="mt-auto pt-3 border-t">
                <button className="text-red-500 hover:text-red-700 text-sm font-medium" onClick={() => deleteCourse(item.id)}>Delete Course</button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
