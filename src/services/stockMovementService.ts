import type { StockMovement, StockMovementType } from "../types/stockMovement";

const STORAGE_KEY = "stock-movements";

export interface StockMovementFilter {
  barangId?: string;

  tipe?: StockMovementType;

  startDate?: string;

  endDate?: string;
}

type RecordStockMovementInput = Omit<
  StockMovement,
  "id" | "tanggal" | "createdAt"
>;

function getAll(): StockMovement[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as StockMovement[];
  } catch {
    return [];
  }
}

function saveAll(data: StockMovement[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Ambil seluruh histori pergerakan stok
 */
export function getStockMovements(
  filter?: StockMovementFilter,
): StockMovement[] {
  let data = [...getAll()];

  if (filter?.barangId) {
    data = data.filter((item) => item.barangId === filter.barangId);
  }

  if (filter?.tipe) {
    data = data.filter((item) => item.tipe === filter.tipe);
  }

  if (filter?.startDate) {
    const start = new Date(filter.startDate);

    data = data.filter((item) => new Date(item.tanggal) >= start);
  }

  if (filter?.endDate) {
    const end = new Date(filter.endDate);

    end.setHours(23, 59, 59, 999);

    data = data.filter((item) => new Date(item.tanggal) <= end);
  }

  return data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/**
 * Histori stok berdasarkan barang
 */
export function getStockMovementByBarang(barangId: string): StockMovement[] {
  return getStockMovements({
    barangId,
  });
}

/**
 * Ambil stok terakhir barang
 */
export function getLastStock(barangId: string): number {
  const movements = getStockMovementByBarang(barangId);

  if (movements.length === 0) {
    return 0;
  }

  const latest = movements[0];

  return latest.stokSesudah;
}

/**
 * Catat pergerakan stok baru
 */
export function recordStockMovement(
  movement: RecordStockMovementInput,
): StockMovement {
  const now = new Date();

  const newMovement: StockMovement = {
    id: crypto.randomUUID(),

    tanggal: now.toISOString().split("T")[0],

    createdAt: now.toISOString(),

    ...movement,
  };

  const data = getAll();

  data.unshift(newMovement);

  saveAll(data);

  return newMovement;
}

/**
 * Legacy support
 *
 * Jangan dipakai untuk transaksi baru.
 * Dipertahankan agar kode lama tidak rusak.
 */
export function addStockMovement(movement: StockMovement): StockMovement {
  const data = getAll();

  data.unshift(movement);

  saveAll(data);

  return movement;
}

/**
 * Hapus histori stok
 */
export function deleteStockMovement(id: string): void {
  const data = getAll().filter((item) => item.id !== id);

  saveAll(data);
}

/**
 * Bersihkan semua histori stok
 */
export function clearStockMovements(): void {
  saveAll([]);
}

/**
 * Statistik stok dasar
 * Persiapan dashboard
 */
export function getStockSummary() {
  const data = getAll();

  return {
    totalMovement: data.length,

    totalMasuk: data
      .filter((item) => item.qty > 0)
      .reduce((total, item) => total + item.qty, 0),

    totalKeluar: data
      .filter((item) => item.qty < 0)
      .reduce((total, item) => total + Math.abs(item.qty), 0),
  };
}
