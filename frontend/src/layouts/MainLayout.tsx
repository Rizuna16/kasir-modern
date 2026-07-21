import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Breadcrumb from "../components/layout/Breadcrumb";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /*
  =====================================
  DESKTOP SIDEBAR COLLAPSE

  false:
  w-64

  true:
  w-20

  =====================================
  */

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div
      className="
        flex
        h-screen

        bg-gray-100

        dark:bg-gray-900
      "
    >
      {/* Sidebar */}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        collapsed={isSidebarCollapsed}
      />

      {/* Main Area */}

      <div
        className="
          flex
          flex-1
          flex-col

          overflow-hidden
        "
      >
        {/* Header */}

        <Header
          onToggleSidebar={toggleSidebar}
          onToggleCollapse={toggleSidebarCollapse}
        />

        {/* Content */}

        <main
          className="
            flex-1

            overflow-y-auto

            p-6
          "
        >
          <Breadcrumb />

          <div
            className="
              mt-4
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
