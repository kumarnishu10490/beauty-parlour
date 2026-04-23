import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-gray-100 flex font-body">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6 flex flex-col shadow-2xl z-10">
        <div className="mb-10">
            <h2 className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-white">Sakshi Beauty</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Admin Panel</p>
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          <Link to="/admin/dashboard" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/dashboard' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Dashboard</Link>
          <Link to="/admin/services" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/services' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Services</Link>
          <Link to="/admin/gallery" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/gallery' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Gallery</Link>
          <Link to="/admin/courses" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/courses' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Courses</Link>
          <Link to="/admin/appointments" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/appointments' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Appointments</Link>
          <Link to="/admin/contact" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/contact' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Messages</Link>
          
          <div className="mt-auto pt-10 border-t border-gray-800">
            <Link to="/admin" className="flex items-center justify-center gap-2 w-full text-center hover:bg-red-500 bg-red-500/10 text-red-500 hover:text-white py-3 rounded-xl transition-colors font-medium">
              Logout
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50/50">
        <Outlet />
      </div>
    </div>
  );
}
