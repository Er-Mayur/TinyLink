import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const StatsPage = () => {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchLink();
    // Refresh stats every 5 seconds
    const interval = setInterval(fetchLink, 5000);
    return () => clearInterval(interval);
  }, [code]);

  const fetchLink = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/links/${code}`);
      setLink(res.data);
    } catch (err) {
      setError('Link not found');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Link Statistics</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error ? (
            <div className="bg-red-50 border border-red-300 rounded-xl p-6 text-center">
              <svg
                className="w-16 h-16 text-red-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2m0-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold text-red-900 mb-2">Link Not Found</h2>
              <p className="text-red-700">This link has been deleted or doesn't exist.</p>
              <Link
                to="/"
                className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Return to Dashboard
              </Link>
            </div>
          ) : !link ? (
            <div className="text-center">
              <div className="inline-block">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <p className="text-slate-600 font-medium">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              <StatsCard link={link} onCopy={copyToClipboard} copied={copied} />

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => copyToClipboard(link.long_url)}
                    className="px-6 py-3 rounded-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
                  >
                    Copy Original URL
                  </button>
                  <a
                    href={link.long_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-center"
                  >
                    Open URL
                  </a>
                  <Link
                    to="/"
                    className="px-6 py-3 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-center"
                  >
                    Create Another
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StatsPage;