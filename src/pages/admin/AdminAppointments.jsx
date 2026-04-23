import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Calendar, Clock, User, Phone, Tag } from "lucide-react";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const data = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.date && item.time) // Only keep those with date/time
        .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
      
      setAppointments(data);
    } catch (e) {
      console.error("Error fetching appointments", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to cancel/delete this appointment?")) {
      try {
        await deleteDoc(doc(db, "contacts", id));
        fetchAppointments();
      } catch (e) {
        console.error("Error deleting appointment", e);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "contacts", id), { status: newStatus });
      fetchAppointments();
    } catch (e) {
      console.error("Error updating status", e);
    }
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    Completed: "bg-green-100 text-green-800 border-green-200",
    Cancelled: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <div className="p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-xl shadow-lg">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Appointments Calendar</h2>
          <p className="text-gray-500 text-sm mt-1">Manage all customer bookings and scheduled visits.</p>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-1">No Upcoming Appointments</h3>
          <p className="text-gray-500">When users book a date and time via the contact form, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {appointments.map((apt) => {
            const dateObj = new Date(apt.date);
            const isPast = new Date(`${apt.date}T${apt.time}`) < new Date();
            const status = apt.status || "Pending";
            const colorClass = statusColors[status] || statusColors.Pending;
            
            return (
              <div key={apt.id} className={`bg-white rounded-2xl p-6 shadow-sm border-2 relative flex flex-col ${colorClass.split(' ')[2]} ${isPast && status !== 'Completed' ? 'opacity-80' : ''}`}>
                
                <div className="absolute top-4 right-4">
                  <select 
                    value={status} 
                    onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-full font-bold outline-none cursor-pointer appearance-none ${colorClass.split(' ').slice(0,2).join(' ')}`}
                  >
                    <option value="Pending">🟡 Pending</option>
                    <option value="Confirmed">🔵 Confirmed</option>
                    <option value="Completed">🟢 Completed</option>
                    <option value="Cancelled">🔴 Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-heading ${isPast ? 'bg-gray-100 text-gray-500' : 'bg-primary/10 text-primary'}`}>
                    <span className="text-xs font-bold uppercase">{dateObj.toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-xl font-bold leading-none">{dateObj.getDate()}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{apt.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {apt.time}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {apt.phone}
                  </div>
                  {apt.interest && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{apt.interest}</span>
                    </div>
                  )}
                  {apt.message && (
                    <div className="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg italic">
                      "{apt.message}"
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => handleDelete(apt.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
