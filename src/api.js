// API utility for making requests to the backend
export async function callApi(endpoint, params = {}, setMessage, setError, setLoading) {
  setLoading && setLoading(true);
  setError && setError("");
  setMessage && setMessage("");
  let url = `https://movie-dl-be.vercel.app${endpoint}`;
  if (Object.keys(params).length) {
    url += "?" + new URLSearchParams(params).toString();
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json();
      setError && setError(err.detail || "API Error");
      setLoading && setLoading(false);
      return null;
    }
    const data = await res.json();
    setMessage && setMessage(data.message || "");
    setLoading && setLoading(false);
    return data;
  } catch (e) {
    setError && setError("Network error");
    setLoading && setLoading(false);
    return null;
  }
}

// TMDB live search utility
export async function tmdbLiveSearch(query) {
  if (!query) return [];
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=en-US&include_adult=false`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}
