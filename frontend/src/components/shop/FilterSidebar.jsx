export default function FilterSidebar() {
  return (
    <aside className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Filters</h2>

      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Herbal Spray
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Mosquito Coil
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Incense Stick
        </label>
      </div>
    </aside>
  );
}