import type { Cart } from "../types";

export interface StockCheckResult {
  success: boolean;

  message?: string;
}

/**
 * Validasi stok saat tambah qty
 */
export function validateStockIncrease(
  cart: Cart,
  itemId: string,
  currentStock: number,
): StockCheckResult {
  const item = cart.items.find((item) => item.id === itemId);

  if (!item) {
    return {
      success: false,

      message: "Item tidak ditemukan",
    };
  }

  if (item.qty + 1 > currentStock) {
    return {
      success: false,

      message: `Stok ${item.namaBarang} tidak mencukupi`,
    };
  }

  return {
    success: true,
  };
}

/**
 * Validasi stok saat tambah barang baru
 */
export function validateNewItemStock(
  qty: number,
  stock: number,
): StockCheckResult {
  if (qty > stock) {
    return {
      success: false,

      message: "Jumlah melebihi stok tersedia",
    };
  }

  return {
    success: true,
  };
}
