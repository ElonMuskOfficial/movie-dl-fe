// SearchBar.jsx
export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <form onSubmit={onSearch} className="flex gap-2 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movie or series..."
        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none bg-white text-gray-900 shadow-sm"
        autoFocus
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow transition"
        disabled={loading}
      >
        Search
      </button>
    </form>
  );
}
