import SidebarItem from "./SidebarItem";

import { useAuth } from "../../context/AuthContext";
import { NAVIGATION } from "../../config/navigation";

interface MenuSection {
  title: string;
  menus: string[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    title: "Dashboard",
    menus: ["Dashboard"],
  },
  {
    title: "Master Data",
    menus: [
      "Produk",
      "Kategori",
      "Satuan",
      "Supplier",
      "Pelanggan",
      "Pengguna",
    ],
  },
  {
    title: "Transaksi",
    menus: ["Penjualan", "Pembelian"],
  },
  {
    title: "Laporan",
    menus: ["Laporan Penjualan", "Kartu Stok"],
  },
  {
    title: "Pengaturan",
    menus: ["Pengaturan"],
  },
];

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const menus = NAVIGATION.filter((menu) =>
    menu.permissions.includes(user.role),
  );

  return (
    <aside
      className="
        flex
        h-screen
        w-64
        flex-col

        border-r
        border-blue-500/20

        bg-gradient-to-b
        from-blue-600
        to-blue-700

        p-5

        shadow-xl

        transition-colors
        duration-300

        dark:border-gray-700
        dark:from-gray-900
        dark:to-gray-800
      "
    >
      <nav
        className="
          flex-1
          space-y-6
          overflow-y-auto
        "
      >
        {MENU_SECTIONS.map((section) => {
          const sectionMenus = menus.filter((menu) =>
            section.menus.includes(menu.label),
          );

          if (sectionMenus.length === 0) {
            return null;
          }

          return (
            <div key={section.title}>
              <div
                className="
                  mb-2
                  px-3

                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]

                  text-blue-100/70

                  dark:text-gray-400
                "
              >
                {section.title}
              </div>

              <div className="space-y-1">
                {sectionMenus.map((menu) => (
                  <SidebarItem
                    key={menu.path}
                    to={menu.path}
                    label={menu.label}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
