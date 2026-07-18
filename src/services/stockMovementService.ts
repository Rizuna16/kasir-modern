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

export function getStockMovementByBarang(barangId: string): StockMovement[] {
  return getStockMovements({
    barangId,
  });
}

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

export function addStockMovement(movement: StockMovement): StockMovement {
  const data = getAll();

  data.unshift(movement);

  saveAll(data);

  return movement;
}

export function deleteStockMovement(id: string): void {
  const data = getAll().filter((item) => item.id !== id);

  saveAll(data);
}

export function clearStockMovements(): void {
  saveAll([]);
}
