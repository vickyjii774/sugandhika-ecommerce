export default function SortDropdown({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border p-4"
    >
      <option value="default">Default</option>
      <option value="priceLow">Price: Low → High</option>
      <option value="priceHigh">Price: High → Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
}