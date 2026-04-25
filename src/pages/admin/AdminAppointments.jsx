import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Calendar, Clock, User, Phone, Tag, CheckCircle2, AlertCircle, XCircle, Timer, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const statusConfig = {
    Pending: { icon: Timer, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    Confirmed: { icon: CheckCircle2, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
    Completed: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    Cancelled: { icon: XCircle, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" }
  };

  return (
    <div className="p-6 md:p-10 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-rose-500 to-purple-500 text-white flex items-center justify-center rounded-2xl shadow-lg shadow-rose-500/20">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Appointments Calendar</h2>
            <p className="text-zinc-400 text-sm mt-1 font-medium">Manage and monitor all salon bookings.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-zinc-400">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading appointments...
        </div>
      ) : appointments.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-16 text-center border border-zinc-800/50 shadow-2xl"
        >
          <Calendar className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No Appointments Yet</h3>
          <p className="text-zinc-400 max-w-md mx-auto">New bookings from your website will automatically appear here once customers fill out the contact form.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {appointments.map((apt) => {
              const dateObj = new Date(apt.date);
              const isPast = new Date(`${apt.date}T${apt.time}`) < new Date();
              const status = apt.status || "Pending";
              const config = statusConfig[status] || statusConfig.Pending;
              const StatusIcon = config.icon;
              
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={apt.id} 
                  className={`bg-zinc-900/40 backdrop-blur-md rounded-3xl p-6 border border-zinc-800/50 shadow-xl flex flex-col relative transition-all duration-300 hover:border-rose-500/30 ${isPast && status !== 'Completed' ? 'opacity-70' : ''}`}
                >
                  
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.bg} ${config.color} ${config.border} text-[10px] font-black uppercase tracking-widest`}>
                        <StatusIcon className="w-3 h-3" />
                        <select 
                            value={status} 
                            onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                            className="bg-transparent outline-none cursor-pointer appearance-none"
                        >
                            <option value="Pending" className="bg-zinc-900 text-white">Pending</option>
                            <option value="Confirmed" className="bg-zinc-900 text-white">Confirmed</option>
                            <option value="Completed" className="bg-zinc-900 text-white">Completed</option>
                            <option value="Cancelled" className="bg-zinc-900 text-white">Cancelled</option>
                        </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6 mt-2">
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border ${isPast ? 'bg-zinc-800/50 border-zinc-700 text-zinc-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-lg shadow-rose-500/10'}`}>
                      <span className="text-[10px] font-black uppercase tracking-tighter">{dateObj.toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-2xl font-black leading-none">{dateObj.getDate()}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-white group-hover:text-rose-400 transition-colors leading-tight">{apt.name}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-400 mt-1">
                        <Clock className="w-4 h-4 text-rose-500" />
                        {apt.time}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-sm text-zinc-300 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                      <Phone className="w-4 h-4 text-rose-500" />
                      {apt.phone}
                    </div>
                    {apt.interest && (
                      <div className="flex items-center gap-3 text-sm text-zinc-300 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                        <Tag className="w-4 h-4 text-rose-500" />
                        <span className="font-medium">{apt.interest}</span>
                      </div>
                    )}
                    {apt.message && (
                      <div className="mt-4 text-sm text-zinc-400 bg-rose-500/5 p-4 rounded-2xl border border-rose-500/10 italic relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/20" />
                        "{apt.message}"
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex justify-end">
                    <button 
                      onClick={() => handleDelete(apt.id)}
                      className="text-zinc-500 hover:text-rose-400 px-4 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" /> Cancel Booking
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
