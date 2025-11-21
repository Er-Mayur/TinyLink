import { useState } from 'react';

const CreateLinkCard = ({ onSubmit, loading, error, success, createdLink, onDelete }) => {
  const [longUrl, setLongUrl] = useState('');
  const [code, setCode] = useState('');
  const [urlError, setUrlError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);
  const shortUrlBase = import.meta.env.VITE_APP_SHORT_URL_BASE || 'http://localhost:3000';

  const validateUrl = (url) => {
    try {
      // Check if URL starts with http:// or https://
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        setUrlError('URL must start with https:// or http://');
        return false;
      }
      new URL(url);
      setUrlError('');
      return true;
    } catch {
      setUrlError('Please enter a valid URL');
      return false;
    }
  };

  const validateCode = (customCode) => {
    if (!customCode) {
      setCodeError('');
      return true;
    }
    // Must be 6-8 alphanumeric characters
    if (!/^[A-Za-z0-9]{6,8}$/.test(customCode)) {
      setCodeError('Code must be 6-8 alphanumeric characters (A-Z, a-z, 0-9)');
      return false;
    }
    setCodeError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUrl(longUrl)) return;
    if (!validateCode(code)) return;
    onSubmit({ longUrl, code });
    setLongUrl('');
    setCode('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Create a Short Link</h2>
        <p className="text-slate-600">Paste your long URL below to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Long URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/very/long/url"
            value={longUrl}
            onChange={(e) => {
              setLongUrl(e.target.value);
              if (e.target.value) validateUrl(e.target.value);
            }}
            required
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              urlError
                ? 'border-red-300 bg-red-50'
                : 'border-slate-300 bg-white hover:border-slate-400'
            }`}
          />
          {urlError && <p className="text-red-600 text-sm mt-1">{urlError}</p>}
        </div>

        {/* Custom Code Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Custom Code (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., mylink123 (leave blank for auto-generate)"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (e.target.value) validateCode(e.target.value);
            }}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              codeError
                ? 'border-red-300 bg-red-50'
                : 'border-slate-300 bg-white hover:border-slate-400'
            }`}
          />
          {codeError ? (
            <p className="text-red-600 text-sm mt-1">{codeError}</p>
          ) : (
            <p className="text-slate-500 text-xs mt-1">6-8 alphanumeric characters (A-Z, a-z, 0-9)</p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-md"
        >
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>

      {/* Success State with Created Link */}
      {success && createdLink && (
        <div className="mt-6 bg-green-50 border border-green-300 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 text-green-600 flex-shrink-0">
              <svg
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
            <p className="text-green-700 font-medium">{success}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Short URL</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-slate-100 px-3 py-2 rounded flex-1 truncate">
                    {`${shortUrlBase}/${createdLink.code}`}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`${shortUrlBase}/${createdLink.code}`)}
                    className={`px-3 py-2 rounded font-medium text-sm transition-all ${
                      copiedCode === `${shortUrlBase}/${createdLink.code}`
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                    }`}
                  >
                    {copiedCode === `${shortUrlBase}/${createdLink.code}` ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Original URL</p>
                <p className="text-sm text-slate-700 truncate" title={createdLink.long_url}>
                  {createdLink.long_url}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateLinkCard;
