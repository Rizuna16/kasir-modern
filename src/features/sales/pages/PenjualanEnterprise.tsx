import { useEffect, useMemo, useState } from "react";

import { Button, Card, Input } from "../../../components/ui";

import { getBarang } from "../../../services/barangService";

import type { Barang } from "../../../types/barang";

import SalesStore from "../store/salesStore";

import type { CartItem, Customer } from "../types";

import CustomerSelector from "../components/CustomerSelector";

export default function PenjualanEnterprise() {
  const [barang, setBarang] = useState<Barang[]>([]);

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState(SalesStore.getCart());

  const [customer, setCustomer] = useState<Customer | undefined>(
    SalesStore.getCart()?.customer,
  );

  useEffect(() => {
    const data = getBarang();

    setBarang(data);

    if (!SalesStore.getCart()) {
      SalesStore.startSale("USER-001", "Kasir");
    }

    const currentCart = SalesStore.getCart();

    setCart(currentCart);

    setCustomer(currentCart?.customer);
  }, []);

  const filteredBarang = useMemo(() => {
    return barang.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()),
    );
  }, [barang, search]);

  function handleCustomerChange(customer?: Customer) {
    SalesStore.setCustomer(customer);

    setCustomer(customer);

    setCart(SalesStore.getCart());
  }

  function tambahBarang(item: Barang) {
    const cartItem: CartItem = {
      id: crypto.randomUUID(),

      barangId: item.id,

      kodeBarang: item.kode,

      namaBarang: item.nama,

      harga: item.hargaEcer,

      qty: 1,

      subtotal: item.hargaEcer,

      discount: 0,

      tax: 0,

      total: item.hargaEcer,
    };

    SalesStore.addCartItem(cartItem);

    setCart(SalesStore.getCart());
  }

  const activeCart = cart;

  const total = activeCart?.grandTotal ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Penjualan Enterprise
        </h1>

        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Transaksi menggunakan Sales Engine
        </p>
      </div>

      <Card>
        <h2
          className="
            mb-4
            font-semibold
          "
        >
          Customer
        </h2>

        <CustomerSelector value={customer} onChange={handleCustomerChange} />
      </Card>

      <Card>
        <h2
          className="
            mb-4
            font-semibold
          "
        >
          Cari Barang
        </h2>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari barang..."
        />

        <div
          className="
            mt-4
            space-y-2
          "
        >
          {filteredBarang.map((item) => (
            <div
              key={item.id}
              className="
                  flex
                  items-center
                  justify-between
                  border
                  p-3
                  rounded
                "
            >
              <div>
                <div
                  className="
                      font-medium
                    "
                >
                  {item.nama}
                </div>

                <div
                  className="
                      text-sm
                      text-gray-500
                    "
                >
                  Rp {item.hargaEcer.toLocaleString()}
                </div>
              </div>

              <Button variant="primary" onClick={() => tambahBarang(item)}>
                Tambah
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2
          className="
            mb-4
            font-semibold
          "
        >
          Keranjang
        </h2>

        {activeCart?.items.length === 0 ? (
          <p>Belum ada barang</p>
        ) : (
          <div
            className="
              space-y-2
            "
          >
            {activeCart?.items.map((item) => (
              <div
                key={item.id}
                className="
                    flex
                    justify-between
                    border-b
                    py-2
                  "
              >
                <span>
                  {item.namaBarang}

                  {" x "}

                  {item.qty}
                </span>

                <span>Rp {item.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        <div
          className="
            mt-6
            text-right
            font-bold
          "
        >
          Total: Rp {total.toLocaleString()}
        </div>
      </Card>
    </div>
  );
}
