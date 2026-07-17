import { useLocation } from "react-router-dom";

const labels: Record<string, string> = {
  "/": "Dashboard",
  "/barang": "Barang",
  "/kategori": "Kategori",
  "/satuan": "Satuan",
  "/supplier": "Supplier",
  "/pelanggan": "Pelanggan",
  "/user": "User",
  "/penjualan": "Penjualan",
  "/pembelian": "Pembelian",
  "/laporan": "Laporan",
  "/pengaturan": "Pengaturan",
};

export default function Breadcrumb() {
  const location = useLocation();

  return (
    <div
      className="
        text-sm

        text-gray-500

        dark:text-gray-400
      "
    >
      Dashboard
      {location.pathname !== "/" && (
        <>
          {" / "}

          {labels[location.pathname] ?? location.pathname}
        </>
      )}
    </div>
  );
}
