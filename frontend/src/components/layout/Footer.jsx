export default function Footer() {
  return (
    <footer className="bg-green-800 py-10 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold">Sugandhika</h2>

        <p className="mt-3 text-green-100">
          Natural mosquito protection made with herbal ingredients.
        </p>

        <div className="mt-8 border-t border-green-600 pt-6 text-sm text-green-200">
          © {new Date().getFullYear()} Sugandhika. All rights reserved.
        </div>
      </div>
    </footer>
  );
}