import { useEffect, useMemo, useState } from "react";

import { Card } from "../../../components/ui";

import { getBarang } from "../../../services/barangService";

import type { Barang } from "../../../types/barang";

import type { CartItem, Customer } from "../types";

import SalesStore from "../store/salesStore";

import ProductSearch from "../components/ProductSearch";
import ProductList from "../components/ProductList";
import CustomerSelector from "../components/CustomerSelector";
import CartTable from "../components/CartTable";
import CartSummary from "../components/CartSummary";
import PaymentPanel from "../components/PaymentPanel";
import CheckoutPanel from "../components/CheckoutPanel";

export default function PenjualanEnterprise() {
  const [barang, setBarang] = useState<Barang[]>([]);

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState(SalesStore.getCart());

  const [customer, setCustomer] = useState<Customer | undefined>(
    SalesStore.getCart()?.customer,
  );

  useEffect(() => {
    setBarang(getBarang());

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

    SalesStore.addCartItem(cartItem, item.stok);

    refreshCart();
  }

  function tambahQty(itemId: string) {
    const currentCart = SalesStore.getCart();

    const cartItem = currentCart?.items.find(
      (cartItem) => cartItem.id === itemId,
    );

    const barangMaster = barang.find(
      (barangItem) => barangItem.id === cartItem?.barangId,
    );

    if (!barangMaster) {
      return;
    }

    SalesStore.increaseCartItem(itemId, barangMaster.stok);

    refreshCart();
  }

  function kurangQty(itemId: string) {
    SalesStore.decreaseCartItem(itemId);

    refreshCart();
  }

  function hapusItem(itemId: string) {
    SalesStore.removeCartItem(itemId);

    refreshCart();
  }

  function handleCheckoutSuccess() {
    SalesStore.startSale("USER-001", "Kasir");

    refreshCart();

    setCustomer(undefined);
  }

  const activeCart = cart;

  return (
    <div
      className="
        space-y-6
      "
    >
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

      <div
        className="
          grid
          gap-6
          lg:grid-cols-3
        "
      >
        <div
          className="
            space-y-6
            lg:col-span-2
          "
        >
          <Card>
            <h2
              className="
                mb-4
                font-semibold
              "
            >
              Customer
            </h2>

            <CustomerSelector
              value={customer}
              onChange={handleCustomerChange}
            />
          </Card>

          <ProductSearch value={search} onChange={setSearch} />

          <ProductList products={filteredBarang} onAdd={tambahBarang} />

          <CartTable
            items={activeCart?.items ?? []}
            onIncrease={tambahQty}
            onDecrease={kurangQty}
            onRemove={hapusItem}
          />
        </div>

        <div
          className="
            space-y-6
          "
        >
          <CartSummary cart={activeCart} />

          <PaymentPanel
            total={activeCart?.grandTotal ?? 0}
            onSuccess={refreshCart}
          />

          <CheckoutPanel onSuccess={handleCheckoutSuccess} />
        </div>
      </div>
    </div>
  );
}
