const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Bagian Pencarian */}
      <div>
        <input
          type="text"
          placeholder="Cari barang..."
          className="
            w-72
            px-4
            py-2
            rounded-lg
            border
            border-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>

      {/* Bagian User */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800">Admin</p>

          <p className="text-sm text-gray-500">Administrator</p>
        </div>

        {/* Avatar */}
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
          "
        >
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;
