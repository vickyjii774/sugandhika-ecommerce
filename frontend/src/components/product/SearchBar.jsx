export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      className="w-full rounded-xl border p-4"
    />
  );
}