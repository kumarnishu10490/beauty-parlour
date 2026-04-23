import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";

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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-medium text-gray-600">Date</th>
                <th className="p-4 font-medium text-gray-600">Name</th>
                <th className="p-4 font-medium text-gray-600">Phone</th>
                <th className="p-4 font-medium text-gray-600">Interest</th>
                <th className="p-4 font-medium text-gray-600">Preferred Time</th>
                <th className="p-4 font-medium text-gray-600">Message</th>
                <th className="p-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-500">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4 font-medium">{msg.name}</td>
                  <td className="p-4 text-sm">{msg.phone}</td>
                  <td className="p-4 text-sm text-primary">{msg.interest || 'N/A'}</td>
                  <td className="p-4 text-sm">
                    {msg.date ? `${msg.date} at ${msg.time}` : 'Not specified'}
                  </td>
                  <td className="p-4 text-sm max-w-xs truncate" title={msg.message}>
                    {msg.message || 'No message'}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}