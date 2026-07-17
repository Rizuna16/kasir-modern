import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">403</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Access Denied
        </h2>

        <p className="mt-3 text-gray-600">
          Maaf, Anda tidak memiliki hak akses untuk membuka halaman ini.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
