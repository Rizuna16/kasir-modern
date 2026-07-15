const stocks = ["Minyak Goreng", "Telur Ayam", "Tepung Terigu", "Gula Pasir"];

export default function LowStock() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h2 className="font-bold text-lg mb-4">Stok Menipis</h2>

      <div className="space-y-3">
        {stocks.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>⚠️</span>

            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
