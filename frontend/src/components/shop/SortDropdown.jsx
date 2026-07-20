export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-gray-300 bg-white px-4 py-3"
    >
      <option value="default">Featured</option>
      <option value="low">Price: Low → High</option>
      <option value="high">Price: High → Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
}