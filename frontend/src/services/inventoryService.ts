import { applyStockMovement } from "./barangService";

import type { StockMovementType } from "../types/stockMovement";

interface InventoryMovementParams {
  barangId: string;

  qty: number;

  tipe: StockMovementType;

  referensi?: string;

  createdBy?: string;

  keterangan?: string;
}

/**
 * Menambah stok barang.
 */
export function stockIn({
  barangId,
  qty,
  tipe,
  referensi,
  createdBy,
  keterangan,
}: InventoryMovementParams) {
  return applyStockMovement({
    barangId,
    perubahan: qty,
    tipe,
    referensi,
    createdBy,
    keterangan,
  });
}

/**
 * Mengurangi stok barang.
 */
export function stockOut({
  barangId,
  qty,
  tipe,
  referensi,
  createdBy,
  keterangan,
}: InventoryMovementParams) {
  return applyStockMovement({
    barangId,
    perubahan: -qty,
    tipe,
    referensi,
    createdBy,
    keterangan,
  });
}
