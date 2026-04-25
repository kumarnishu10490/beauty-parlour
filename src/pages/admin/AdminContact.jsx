import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { MessageSquare, Calendar, Phone, User, Trash2, Mail, ExternalLink, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    } catch (e) {
      console.error("Error fetching messages", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "contacts", id));
        fetchMessages();
      } catch (e) {
        console.error("Error deleting message", e);
      }
    }
  };

  return (
    <div className="p-6 md:p-10 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Customer Inquiries</h2>
          <p className="text-zinc-400 text-sm mt-1">Review and manage messages from your website visitors.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-zinc-400">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-16 text-center border border-zinc-800/50 shadow-2xl"
        >
          <MessageSquare className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Inbox is Empty</h3>
          <p className="text-zinc-400 max-w-md mx-auto">Messages submitted via your contact form will appear here in real-time.</p>
        </motion.div>
      ) : (
        <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-zinc-950/50 border-b border-zinc-800/50">
                  <th className="p-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Received</th>
                  <th className="p-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Customer</th>
                  <th className="p-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Service Interest</th>
                  <th className="p-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Appointment</th>
                  <th className="p-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Message</th>
                  <th className="p-5 text-xs font-black text-zinc-500 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={msg.id} 
                      className="border-b border-zinc-800/30 last:border-0 hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-5 text-sm text-zinc-400">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col">
                            <span className="font-bold text-white">{msg.name}</span>
                            <span className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3 text-rose-500" /> {msg.phone}
                            </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-bold">
                            {msg.interest || 'General'}
                        </span>
                      </td>
                      <td className="p-5 text-sm text-zinc-300">
                        {msg.date ? (
                            <div className="flex flex-col">
                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> {msg.date}</span>
                                <span className="flex items-center gap-1.5 mt-0.5"><ExternalLink className="w-3.5 h-3.5 text-zinc-500" /> {msg.time}</span>
                            </div>
                        ) : (
                            <span className="text-zinc-600 italic">No request</span>
                        )}
                      </td>
                      <td className="p-5">
                        <p className="text-sm text-zinc-400 max-w-xs truncate group-hover:text-zinc-200 transition-colors" title={msg.message}>
                          {msg.message || '—'}
                        </p>
                      </td>
                      <td className="p-5 text-right">
                        <button 
                          onClick={() => handleDelete(msg.id)}
                          className="p-2 text-zinc-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}