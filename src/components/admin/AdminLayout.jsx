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
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row font-sans relative overflow-hidden md:overflow-visible">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 text-white p-4 flex justify-between items-center shadow-md z-30 relative">
        <div>
          <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400">Sakshi Beauty</h2>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 focus:outline-none hover:bg-zinc-800 rounded-lg transition-colors">
          {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 md:hidden" 
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-20
        transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-zinc-900/90 backdrop-blur-xl border-r border-zinc-800/50 text-white p-6 flex flex-col shadow-2xl md:min-h-screen
      `}>
        <div className="mb-10 hidden md:block">
            <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400">Sakshi Beauty</h2>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-semibold">Admin Panel</p>
        </div>

        <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
          <Link onClick={closeMenu} to="/admin/dashboard" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/dashboard' ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 font-medium border border-rose-500/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>Dashboard</Link>
          <Link onClick={closeMenu} to="/admin/services" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/services' ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 font-medium border border-rose-500/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>Services</Link>
          <Link onClick={closeMenu} to="/admin/gallery" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/gallery' ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 font-medium border border-rose-500/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>Gallery</Link>
          <Link onClick={closeMenu} to="/admin/courses" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/courses' ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 font-medium border border-rose-500/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>Courses</Link>
          <Link onClick={closeMenu} to="/admin/appointments" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/appointments' ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 font-medium border border-rose-500/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>Appointments</Link>
          <Link onClick={closeMenu} to="/admin/contact" className={`px-4 py-3 rounded-xl transition-all ${path === '/admin/contact' ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 font-medium border border-rose-500/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>Messages</Link>
          
          <div className="mt-auto pt-10 border-t border-zinc-800/50">
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full text-center hover:bg-rose-500 bg-rose-500/10 text-rose-400 hover:text-white py-3 rounded-xl transition-colors font-medium cursor-pointer border border-rose-500/20 hover:border-rose-500">
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content with Dynamic Background */}
      <div className="flex-1 overflow-auto bg-zinc-950 relative z-0 h-[calc(100vh-64px)] md:h-screen text-white">
        {/* Dynamic Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none fixed" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none fixed" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
