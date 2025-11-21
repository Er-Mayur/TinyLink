import { formatDateIST } from '../utils/dateFormatter';

const StatsCard = ({ link, onCopy, copied }) => {
  const shortUrlBase = import.meta.env.VITE_APP_SHORT_URL_BASE || 'http://localhost:3000';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Main Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
          Short Link
        </h3>
        <div className="flex items-center gap-3 mb-6">
          <code className="text-xl font-bold text-blue-600 bg-blue-50 px-4 py-3 rounded-lg flex-1 break-all">
            {link.code}
          </code>
          <button
            onClick={() => onCopy(`${shortUrlBase}/${link.code}`)}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
            }`}
          >
            {copied ? '✓' : 'Copy'}
          </button>
        </div>

        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
          Original URL
        </h3>
        <a
          href={link.long_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline text-sm break-all block mb-2"
        >
          {link.long_url}
        </a>
        <p className="text-xs text-slate-500">Click to open in new tab</p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 border border-blue-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
              Total Clicks
            </p>
            <p className="text-4xl font-bold text-blue-600">{link.clicks}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
              CTR
            </p>
            <p className="text-4xl font-bold text-indigo-600">100%</p>
          </div>
          <div className="col-span-2 pt-4 border-t border-blue-200">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
              Created
            </p>
            <p className="text-slate-700">
              {formatDateIST(link.created_at)}
            </p>
          </div>
          <div className="col-span-2 pt-4 border-t border-blue-200">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
              Last Clicked
            </p>
            <p className="text-slate-700">
              {link.last_clicked ? formatDateIST(link.last_clicked) : 'Never'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
