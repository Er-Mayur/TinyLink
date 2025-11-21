import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDateISTShort } from '../utils/dateFormatter';

const LinksTable = ({ links, onDelete, loading }) => {
  const [copiedCode, setCopiedCode] = useState(null);
  const shortUrlBase = import.meta.env.VITE_APP_SHORT_URL_BASE || 'http://localhost:3000';

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(`${shortUrlBase}/${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (links.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 border border-slate-100 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No links yet</h3>
        <p className="text-slate-600">Create your first short link to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Code</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">URL</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Clicks</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Last Clicked</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {links.map((link, index) => (
              <tr
                key={link.code}
                className="hover:bg-slate-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                      {link.code}
                    </code>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate text-slate-700 text-sm" title={link.long_url}>
                    {link.long_url}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg">
                    <span className="text-lg font-bold text-blue-600">{link.clicks}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatDateISTShort(link.last_clicked)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => copyToClipboard(link.code)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        copiedCode === link.code
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                      }`}
                    >
                      {copiedCode === link.code ? '✓ Copied' : 'Copy'}
                    </button>
                    <Link
                      to={`/stats/${link.code}`}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                    >
                      Stats
                    </Link>
                    <button
                      onClick={() => onDelete(link.code)}
                      disabled={loading}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-red-50 hover:bg-red-100 text-red-700 transition-all disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinksTable;
