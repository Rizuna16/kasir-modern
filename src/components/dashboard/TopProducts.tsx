const products = [
  {
    nama: "Beras Premium",
    terjual: 120,
  },
  {
    nama: "Minyak Goreng",
    terjual: 95,
  },
  {
    nama: "Gula Pasir",
    terjual: 80,
  },
  {
    nama: "Kopi Sachet",
    terjual: 65,
  },
];

export default function TopProducts() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h2 className="font-bold text-lg mb-4">Produk Terlaris</h2>

      <div className="space-y-4">
        {products.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>
              {index + 1}. {item.nama}
            </span>

            <span className="font-semibold">{item.terjual} pcs</span>
          </div>
        ))}
      </div>
    </div>
  );
}
