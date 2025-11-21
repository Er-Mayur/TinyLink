import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CreateLinkCard from '../components/CreateLinkCard';
import LinksTable from '../components/LinksTable';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [createdLink, setCreatedLink] = useState(null);

  useEffect(() => {
    fetchLinks();
    
    // Fetch links when page regains focus (user comes back to tab)
    const handleFocus = () => {
      fetchLinks();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await axios.get('/api/links');
      setLinks(res.data || []);
    } catch (err) {
      setError('Failed to fetch links');
    }
  };

  const handleCreateLink = async ({ longUrl, code }) => {
    setLoading(true);
    setError('');
    setSuccess('');
    setCreatedLink(null);
    try {
      const res = await axios.post('/api/links', { longUrl, code: code || undefined });
      setSuccess(`Link created successfully!`);
      setCreatedLink(res.data);
      fetchLinks();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create link');
    }
    setLoading(false);
  };

  const handleDelete = async (code) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await axios.delete(`/api/links/${code}`);
        fetchLinks();
      } catch (err) {
        setError('Failed to delete link');
      }
    }
  };

  const filteredLinks = links.filter(
    (link) =>
      link.code.toLowerCase().includes(search.toLowerCase()) ||
      link.long_url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Shorten and Manage Your Links
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl">
              Track clicks, manage URLs, and share instantly. Create short, memorable links in seconds.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Create Link Card */}
          <div id="create-link-form">
            <CreateLinkCard
              onSubmit={handleCreateLink}
              loading={loading}
              error={error}
              success={success}
              createdLink={createdLink}
              onDelete={handleDelete}
            />
          </div>

          {/* Links Section */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Your Links</h2>
                <p className="text-slate-600">Manage and track your short links</p>
              </div>
              {links.length > 0 && (
                <div className="text-sm text-slate-600">
                  {links.length} {links.length === 1 ? 'link' : 'links'} created
                </div>
              )}
            </div>

            {/* Search Bar */}
            {links.length > 0 && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search by code or URL..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 bg-white hover:border-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Links Table */}
            <LinksTable links={filteredLinks} onDelete={handleDelete} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;