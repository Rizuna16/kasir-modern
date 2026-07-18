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

  const [message, setMessage] = useState("");

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

  function refreshCart() {
    setCart(SalesStore.getCart());
  }

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function handleCustomerChange(customer?: Customer) {
    SalesStore.setCustomer(customer);

    setCustomer(customer);

    refreshCart();
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

    const result = SalesStore.addCartItem(cartItem, item.stok);

    if (result?.items.length === SalesStore.getCart()?.items.length) {
      refreshCart();

      return;
    }

    refreshCart();
  }

  function tambahQty(itemId: string) {
    const item = activeCart?.items.find((item) => item.id === itemId);

    const barangMaster = barang.find((b) => b.id === item?.barangId);

    if (!barangMaster) return;

    const before = item?.qty ?? 0;

    SalesStore.increaseCartItem(itemId, barangMaster.stok);

    const after =
      SalesStore.getCart()?.items.find((i) => i.id === itemId)?.qty ?? 0;

    if (before === after) {
      showMessage("Stok barang tidak mencukupi");
    }

    refreshCart();
  }

  function kurangQty(id: string) {
    SalesStore.decreaseCartItem(id);

    refreshCart();
  }

  function hapusItem(id: string) {
    SalesStore.removeCartItem(id);

    refreshCart();
  }

  const activeCart = cart;

  const total = activeCart?.grandTotal ?? 0;

  return (
    <div className="space-y-6">
      {message && (
        <div
          className="
            rounded
            border
            p-3
            text-sm
          "
        >
          {message}
        </div>
      )}

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
                justify-between
                border
                p-3
                rounded
              "
            >
              <div>
                <div className="font-medium">{item.nama}</div>

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
          <div className="space-y-3">
            {activeCart?.items.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  justify-between
                  items-center
                  border-b
                  pb-3
                "
              >
                <div>
                  <div className="font-medium">{item.namaBarang}</div>

                  <div
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Rp {item.total.toLocaleString()}
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Button
                    variant="secondary"
                    onClick={() => kurangQty(item.id)}
                  >
                    -
                  </Button>

                  <span>{item.qty}</span>

                  <Button variant="primary" onClick={() => tambahQty(item.id)}>
                    +
                  </Button>

                  <Button variant="danger" onClick={() => hapusItem(item.id)}>
                    Hapus
                  </Button>
                </div>
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
