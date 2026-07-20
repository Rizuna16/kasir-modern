/**
 * ============================================================
 * Inventory Analytics Service
 * ============================================================
 *
 * Responsibility:
 *
 * - Inventory Intelligence
 * - Stock Health Analysis
 * - Product Movement Analysis
 * - Inventory Score Calculation
 *
 * Data source:
 *
 * - barangService
 * - penjualanService
 *
 * ============================================================
 */

import type { Barang } from "../types/barang";

import type {
  InventorySummary,
  FastMovingProduct,
  LowStockProduct,
  SlowMovingProduct,
  InventoryHealth,
  InventoryScore,
} from "../types/inventoryAnalytics";

import { getBarang } from "./barangService";

import { getPenjualan } from "./penjualanService";

// ============================================================
// LOW STOCK ANALYSIS
// ============================================================

const calculateLowStockProducts = (barang: Barang[]): LowStockProduct[] => {
  return barang

    .filter((item) => item.stok <= item.minimalStok)

    .map((item) => ({
      barangId: item.id,

      nama: item.nama,

      stok: item.stok,

      minimalStok: item.minimalStok,
    }));
};

// ============================================================
// FAST MOVING ANALYSIS
// ============================================================

const calculateFastMovingProducts = (
  barang: Barang[],
  penjualan: ReturnType<typeof getPenjualan>,
): FastMovingProduct[] => {
  const salesMap = new Map<string, number>();

  penjualan.forEach((transaksi) => {
    transaksi.detail.forEach((item) => {
      const current = salesMap.get(item.barangId) ?? 0;

      salesMap.set(item.barangId, current + item.qty);
    });
  });

  return Array.from(salesMap.entries())

    .map(([barangId, totalTerjual]) => {
      const produk = barang.find((item) => item.id === barangId);

      return {
        barangId,

        nama: produk?.nama ?? "Produk tidak ditemukan",

        totalTerjual,
      };
    })

    .sort((a, b) => b.totalTerjual - a.totalTerjual)

    .slice(0, 10);
};

// ============================================================
// SLOW MOVING ANALYSIS
// ============================================================

const calculateSlowMovingProducts = (
  barang: Barang[],
  penjualan: ReturnType<typeof getPenjualan>,
): SlowMovingProduct[] => {
  const salesMap = new Map<string, number>();

  penjualan.forEach((transaksi) => {
    transaksi.detail.forEach((item) => {
      const current = salesMap.get(item.barangId) ?? 0;

      salesMap.set(item.barangId, current + item.qty);
    });
  });

  return barang

    .filter((item) => item.stok > 0)

    .map((item) => ({
      barangId: item.id,

      nama: item.nama,

      totalTerjual: salesMap.get(item.id) ?? 0,
    }))

    .filter((item) => item.totalTerjual <= 5)

    .sort((a, b) => a.totalTerjual - b.totalTerjual)

    .slice(0, 10);
};

// ============================================================
// INVENTORY HEALTH
// ============================================================

const calculateInventoryHealth = (barang: Barang[]): InventoryHealth => {
  let sehat = 0;

  let warning = 0;

  let kritis = 0;

  barang.forEach((item) => {
    if (item.stok === 0) {
      kritis++;
    } else if (item.stok <= item.minimalStok) {
      warning++;
    } else {
      sehat++;
    }
  });

  return {
    sehat,

    warning,

    kritis,
  };
};

// ============================================================
// INVENTORY SCORE
// ============================================================
//
// 90 - 100 Excellent
// 70 - 89  Healthy
// 40 - 69  Warning
// 0  - 39  Critical
//
// ============================================================

const calculateInventoryScore = (health: InventoryHealth): InventoryScore => {
  const total = health.sehat + health.warning + health.kritis;

  if (total === 0) {
    return {
      score: 0,

      label: "Critical",
    };
  }

  const score = Math.round((health.sehat * 100 + health.warning * 50) / total);

  let label: "Excellent" | "Healthy" | "Warning" | "Critical";

  if (score >= 90) {
    label = "Excellent";
  } else if (score >= 70) {
    label = "Healthy";
  } else if (score >= 40) {
    label = "Warning";
  } else {
    label = "Critical";
  }

  return {
    score,

    label,
  };
};

// ============================================================
// INVENTORY SUMMARY
// ============================================================

export const getInventorySummary = (): InventorySummary => {
  const barang = getBarang();

  const penjualan = getPenjualan();

  const totalProduk = barang.length;

  const totalStok = barang.reduce(
    (total, item) => total + item.stok,

    0,
  );

  const totalNilaiStok = barang.reduce(
    (total, item) => total + item.stok * item.hargaBeli,

    0,
  );

  const lowStockProducts = calculateLowStockProducts(barang);

  const fastMovingProducts = calculateFastMovingProducts(barang, penjualan);

  const slowMovingProducts = calculateSlowMovingProducts(barang, penjualan);

  const inventoryHealth = calculateInventoryHealth(barang);

  const inventoryScore = calculateInventoryScore(inventoryHealth);

  return {
    totalProduk,

    totalStok,

    totalNilaiStok,

    lowStockCount: lowStockProducts.length,

    lowStockProducts,

    fastMovingProducts,

    slowMovingProducts,

    inventoryHealth,

    inventoryScore,
  };
};
