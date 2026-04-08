
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6 text-center">
      <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
        Modern Inventory <br /> 
        <span className="text-blue-600">Management for Industry.</span>
      </h1>
      <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
        Track your products, manage your team, and analyze your data—all in one secure SQL-powered dashboard.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Link to="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700">
          Get Started
        </Link>
        <Link to="/login" className="bg-white border border-slate-300 px-8 py-3 rounded-lg font-bold hover:bg-slate-50">
          View Demo
        </Link>
      </div>
    </div>
  );
};

export default Home;