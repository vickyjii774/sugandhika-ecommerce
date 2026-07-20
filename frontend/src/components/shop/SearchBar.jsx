export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search Sugandhika products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-green-600 focus:outline-none"
    />
  );
}