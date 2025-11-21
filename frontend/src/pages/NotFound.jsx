import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fadeIn">
        <h1 className="text-8xl md:text-9xl font-black text-slate-900 mb-2 leading-none">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
          The link you are looking for doesn't exist or has been deleted.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
