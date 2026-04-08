

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      // 1. Tell the backend to clear the cookie
      await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
      
      // 2. Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('loginTime');

      // 3. Go back to login
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
      // Even if backend fails, 
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">Pro-Stock</div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full text-left p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition"
          >
            🏠 Home
          </button>
          
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition">Inventory</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition">Orders</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition">Settings</div>
        </nav>
        <div className="p-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-all text-white text-center"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-800">Overview</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">Welcome, Admin</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          </div>
        </header>

        {/* Dashboard Body */}
        <section className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-slate-500 text-sm font-medium">Monthly Revenue</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">₹24,50,000</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-slate-500 text-sm font-medium">Active Users</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">1,204</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-slate-500 text-sm font-medium">Pending Orders</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">45</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="h-32 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-slate-400">
              Activity chart will be rendered here.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;;