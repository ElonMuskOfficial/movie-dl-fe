import { useState } from "react";
import { callApi } from "./api";
import SearchBar from "./components/SearchBar";
import MessageBox from "./components/MessageBox";
import OptionsList from "./components/OptionsList";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [listLoading, setListLoading] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState(null);

  // Initial search
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setSteps([]);
    setResults(null);
    setLoading(true);
    setListLoading(false);
    const searchValue = query;
    setQuery(""); // Clear input after search
    const data = await callApi(
      "/search",
      { query: searchValue },
      setMessage,
      setError,
      setLoading
    );
    setLoading(false);
    if (data) {
      setResults(data);
      setSteps([{ endpoint: "/search", params: { query: searchValue }, data }]);
      setCurrentEndpoint("/search");
    }
  }

  // Handle next step (button click)
  async function handleNextStep(next_step) {
    if (!next_step) return;
    setListLoading(true);
    const { endpoint, params } = next_step;
    const data = await callApi(
      endpoint,
      params,
      setMessage,
      setError,
      () => {} // Don't set global loading, just local
    );
    setListLoading(false);
    if (data) {
      setResults(data);
      setSteps((prev) => [...prev, { endpoint, params, data }]);
      setCurrentEndpoint(endpoint);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-md">
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded text-sm text-center font-medium">
          Only <b>V-Cloud</b> and <b>Download Now</b> buttons are enabled. Other buttons will be available in a future update.
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center tracking-tight">
          Movie/Series Downloader
        </h1>
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          loading={loading}
        />
        <MessageBox message={message} error={error} />
        <div className="space-y-6 min-h-[120px]">
          {loading && (
            <div className="text-center text-gray-500 text-sm py-6">Loading...</div>
          )}
          {!loading && listLoading && (
            <div className="text-center text-gray-500 text-sm py-6">Loading...</div>
          )}
          {!loading && !listLoading && results && (
            <OptionsList data={results.data} onNextStep={handleNextStep} currentEndpoint={currentEndpoint} />
          )}
        </div>
      </div>
      {/* <footer className="mt-10 text-xs text-gray-400">
        Minimalist UI &copy; 2025
      </footer> */}
    </div>
  );
}

export default App;
