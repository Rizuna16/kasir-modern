import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";

import { NAVIGATION } from "../../config/navigation";
import { NAVIGATION_ICONS } from "../../config/navigationIcons";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  const location = useLocation();

  const [openGroup, setOpenGroup] = useState<string | null>(null);

  /*
  =====================================
  AUTO EXPAND ACTIVE GROUP

  Contoh:

  /barang

  otomatis membuka:

  Master Data

  =====================================
  */

  useEffect(() => {
    const activeGroup = NAVIGATION.find((section) =>
      section.items.some((item) => item.path === location.pathname),
    );

    if (activeGroup && activeGroup.collapsible) {
      setOpenGroup(activeGroup.id);
    }
  }, [location.pathname]);

  if (!user) {
    return null;
  }

  function toggleGroup(id: string) {
    setOpenGroup((current) => (current === id ? null : id));
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0

          z-40

          bg-black/50

          transition-opacity
          duration-300

          lg:hidden

          ${
            isOpen
              ? "opacity-100 visible"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0

          z-50

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

          transition-transform
          duration-300

          dark:border-gray-700
          dark:from-gray-900
          dark:to-gray-800

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:static
          lg:translate-x-0
        `}
      >
        {/* Branding */}
        <SidebarHeader />

        {/* Menu Area */}
        <nav
          className="
            flex-1

            space-y-3

            overflow-y-auto

            pr-1
          "
        >
          {NAVIGATION.map((section) => {
            const menus = section.items.filter((menu) =>
              menu.permissions.includes(user.role),
            );

            if (menus.length === 0) {
              return null;
            }

            /*
              =====================================
              SINGLE MENU

              Dashboard

              =====================================
              */

            if (!section.collapsible) {
              return (
                <section key={section.id}>
                  <div
                    className="
                        space-y-1
                      "
                  >
                    {menus.map((menu) => (
                      <div key={menu.path} onClick={onClose}>
                        <SidebarItem to={menu.path} label={menu.label} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            /*
              =====================================
              COLLAPSIBLE GROUP

              Master Data
              Transaksi
              Laporan
              Pengaturan

              =====================================
              */

            return (
              <SidebarGroup
                key={section.id}
                id={section.id}
                title={section.title}
                icon={NAVIGATION_ICONS[section.icon]}
                isOpen={openGroup === section.id}
                onToggle={() => toggleGroup(section.id)}
              >
                {menus.map((menu) => (
                  <div key={menu.path} onClick={onClose}>
                    <SidebarItem to={menu.path} label={menu.label} />
                  </div>
                ))}
              </SidebarGroup>
            );
          })}
        </nav>

        {/* User Profile */}
        <SidebarFooter />
      </aside>
    </>
  );
}
