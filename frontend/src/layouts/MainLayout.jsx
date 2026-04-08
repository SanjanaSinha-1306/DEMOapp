
import { Outlet, Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="text-xl font-bold text-blue-600 tracking-tight">PRO-STOCK</div>
        
        <div className="flex gap-8 font-medium text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
          <Link to="/login" className="hover:text-blue-600 transition text-blue-600 font-semibold">Login</Link>
          <Link to="/signup" className="hover:text-blue-600 transition text-blue-600 font-semibold">Sign-up</Link>
        </div>
      </nav>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-8 px-8 mt-auto">
    <div className="max-w-6xl mx-auto text-center">
      <p>&copy; 2026 Pro-Stock Industrial. All rights reserved.</p>
    </div>
  </footer>
);

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet /> {/*  Home/Login/Signup pages appear */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;