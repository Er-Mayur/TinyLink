import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToCreateLink = () => {
    // If already on dashboard, just scroll
    if (location.pathname === '/') {
      const createLinkElement = document.getElementById('create-link-form');
      if (createLinkElement) {
        createLinkElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to dashboard and scroll after render
      navigate('/');
      setTimeout(() => {
        const createLinkElement = document.getElementById('create-link-form');
        if (createLinkElement) {
          createLinkElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-slate-900">TinyLink</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-slate-700 hover:text-blue-600 transition font-medium">
              Dashboard
            </Link>
            <button
              onClick={scrollToCreateLink}
              className="text-slate-700 hover:text-blue-600 transition font-medium bg-transparent border-none cursor-pointer"
            >
              Create Link
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
