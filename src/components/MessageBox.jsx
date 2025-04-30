// MessageBox.jsx
export default function MessageBox({ message, error }) {
  return (
    <>
      {message && (
        <div className="mb-4 text-blue-700 bg-blue-50 border border-blue-200 rounded px-4 py-2 text-sm">{message}</div>
      )}
      {error && (
        <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded px-4 py-2 text-sm">{error}</div>
      )}
    </>
  );
}
