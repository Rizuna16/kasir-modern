import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Breadcrumb from "../components/layout/Breadcrumb";

export default function MainLayout() {
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
      <Sidebar />

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
        <Header />

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
