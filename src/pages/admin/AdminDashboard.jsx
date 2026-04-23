import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, getCountFromServer, query, where } from "firebase/firestore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    gallery: 0,
    courses: 0,
    contacts: 0,
    appointments: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const servicesCount = await getCountFromServer(collection(db, "services"));
        const galleryCount = await getCountFromServer(collection(db, "gallery"));
        const coursesCount = await getCountFromServer(collection(db, "courses"));
        const contactsCount = await getCountFromServer(collection(db, "contacts"));
        
        // Count appointments (where date is not empty)
        const appointmentsQuery = query(collection(db, "contacts"), where("date", ">", ""));
        const appointmentsCount = await getCountFromServer(appointmentsQuery);

        setStats({
          services: servicesCount.data().count,
          gallery: galleryCount.data().count,
          courses: coursesCount.data().count,
          contacts: contactsCount.data().count,
          appointments: appointmentsCount.data().count
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-heading font-bold mb-2">Welcome Back, Admin</h1>
      <p className="text-gray-500 mb-8">Here's an overview of your salon management panel.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link to="/admin/services" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">Services</h2>
            <span className="bg-primary/10 text-primary font-bold text-lg px-3 py-1 rounded-lg">{stats.services}</span>
          </div>
          <p className="text-gray-500 text-sm mt-auto">Manage salon services and pricing</p>
        </Link>

        <Link to="/admin/gallery" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">Gallery</h2>
            <span className="bg-primary/10 text-primary font-bold text-lg px-3 py-1 rounded-lg">{stats.gallery}</span>
          </div>
          <p className="text-gray-500 text-sm mt-auto">Upload student and bridal photos</p>
        </Link>

        <Link to="/admin/courses" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">Courses</h2>
            <span className="bg-primary/10 text-primary font-bold text-lg px-3 py-1 rounded-lg">{stats.courses}</span>
          </div>
          <p className="text-gray-500 text-sm mt-auto">Manage training center courses</p>
        </Link>

        <Link to="/admin/appointments" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">Appointments</h2>
            <span className="bg-primary/10 text-primary font-bold text-lg px-3 py-1 rounded-lg">{stats.appointments}</span>
          </div>
          <p className="text-gray-500 text-sm mt-auto">View booked dates and times</p>
        </Link>

        <Link to="/admin/contact" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">Messages</h2>
            <span className="bg-primary/10 text-primary font-bold text-lg px-3 py-1 rounded-lg">{stats.contacts}</span>
          </div>
          <p className="text-gray-500 text-sm mt-auto">Customer inquiries and contact forms</p>
        </Link>

      </div>
    </div>
  );
}