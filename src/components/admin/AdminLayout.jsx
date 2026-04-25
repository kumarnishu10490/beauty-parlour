import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/");
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-body relative overflow-hidden md:overflow-visible">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-black text-white p-4 flex justify-between items-center shadow-md z-30 relative">
        <div>
          <h2 className="text-xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-white">Sakshi Beauty</h2>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 focus:outline-none">
          {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden" 
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-20
        transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-black text-white p-6 flex flex-col shadow-2xl md:min-h-screen
      `}>
        <div className="mb-10 hidden md:block">
            <h2 className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-white">Sakshi Beauty</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Admin Panel</p>
        </div>

        <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
          <Link onClick={closeMenu} to="/admin/dashboard" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/dashboard' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Dashboard</Link>
          <Link onClick={closeMenu} to="/admin/services" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/services' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Services</Link>
          <Link onClick={closeMenu} to="/admin/gallery" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/gallery' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Gallery</Link>
          <Link onClick={closeMenu} to="/admin/courses" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/courses' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Courses</Link>
          <Link onClick={closeMenu} to="/admin/appointments" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/appointments' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Appointments</Link>
          <Link onClick={closeMenu} to="/admin/contact" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/contact' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}`}>Messages</Link>
          
          <div className="mt-auto pt-10 border-t border-gray-800">
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full text-center hover:bg-red-500 bg-red-500/10 text-red-500 hover:text-white py-3 rounded-xl transition-colors font-medium cursor-pointer">
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50/50 relative z-0 h-[calc(100vh-64px)] md:h-screen">
        <Outlet />
      </div>
    </div>
  );
}
