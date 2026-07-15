import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-blue-600 p-5">
      <h1 className="text-2xl font-bold text-white mb-8">Kasir Modern</h1>

      <nav className="space-y-2">
        <SidebarItem to="/" label="Dashboard" />

        <SidebarItem to="/barang" label="Barang" />

        <SidebarItem to="/kategori" label="Kategori" />

        <SidebarItem to="/satuan" label="Satuan" />

        <SidebarItem to="/supplier" label="Supplier" />

        <SidebarItem to="/pelanggan" label="Pelanggan" />

        <SidebarItem to="/user" label="User" />

        <SidebarItem to="/penjualan" label="Penjualan" />

        <SidebarItem to="/pembelian" label="Pembelian" />

        <SidebarItem to="/laporan" label="Laporan" />

        <SidebarItem to="/pengaturan" label="Pengaturan" />
      </nav>
    </aside>
  );
};

export default Sidebar;
