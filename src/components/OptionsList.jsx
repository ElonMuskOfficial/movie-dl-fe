// OptionsList.jsx
export default function OptionsList({ data, onNextStep, currentEndpoint }) {
  console.log(data);
  if (!data) return null;

  // Helper to determine if a button should be enabled
  function isButtonEnabled(btn) {
    // If context is /extract or /next-options, only enable V-Cloud/Download Now
    if (currentEndpoint === '/extract' || currentEndpoint === '/next-options') {
      const text = btn.text || btn.title || '';
      return (
        typeof text === 'string' &&
        (text.includes('V-Cloud') || text.includes('Download Now'))
      );
    }
    // In all other contexts (e.g. /search), always enabled
    return true;
  }

  // 1. Extract Content Options: single object with title, image, and groups
  if (typeof data === "object" && !Array.isArray(data) && data.groups) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-6 mb-2">
          {data.image && (
            <img
              src={data.image}
              alt={data.title}
              className="w-48 h-64 object-cover rounded border border-gray-200 shadow-sm"
            />
          )}
          <div className="text-2xl font-bold text-gray-800">{data.title}</div>
        </div>
        {data.groups.map((group, i) => (
          <div key={i}>
            <div className="text-base font-semibold text-gray-600 mb-2">{group.title}</div>
            <div className="flex flex-wrap gap-2">
              {group.buttons.map((btn, j) => (
                <button
                  key={j}
                  className="px-4 py-2 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-base shadow-sm transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => onNextStep(btn.next_step)}
                  disabled={!isButtonEnabled(btn)}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Drill Down / Next Options: array of groups with buttons
  if (Array.isArray(data)) {
    // If it's a list of groups with buttons
    if (data[0]?.title && data[0]?.buttons) {
      return (
        <div className="space-y-4">
          {data.map((group, i) => (
            <div key={i}>
              <div className="text-base font-semibold text-gray-600 mb-2">{group.title}</div>
              <div className="flex flex-wrap gap-2">
                {group.buttons.map((btn, j) => (
                  <button
                    key={j}
                    className="px-4 py-2 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-base shadow-sm transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => onNextStep(btn.next_step)}
                    disabled={!isButtonEnabled(btn)}
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    // If it's a list of download links
    if (data[0]?.text && data[0]?.url) {
      return (
        <ul className="space-y-2">
          {data.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 rounded bg-green-50 hover:bg-green-100 border border-green-200 text-green-800 shadow-sm transition"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      );
    }
    // If it's a list of objects with title/url/next_step/thumbnail (search results)
    if (data[0]?.title && data[0]?.next_step) {
      return (
        <ul className="space-y-2">
          {data.map((item, idx) => (
            <li key={idx}>
              <button
                className="w-full flex items-center gap-4 text-left px-4 py-2 rounded bg-white hover:bg-gray-100 border border-gray-200 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onNextStep(item.next_step)}
                disabled={!isButtonEnabled(item)}
              >
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-28 object-cover rounded border border-gray-200"
                  />
                )}
                <span className="font-medium text-gray-800 text-lg">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      );
    }
  }

  return null;
}
