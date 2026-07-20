/**
 * ============================================================
 * Inventory Intelligence Types
 * ============================================================
 *
 * Contract untuk:
 *
 * - Low Stock Alert
 * - Fast Moving Product
 * - Slow Moving Product
 * - Inventory Health
 * - Inventory Score
 * - Inventory Summary
 *
 * ============================================================
 */

// ============================================================
// LOW STOCK
// ============================================================

export interface LowStockProduct {
  barangId: string;

  nama: string;

  stok: number;

  minimalStok: number;
}

// ============================================================
// FAST MOVING
// ============================================================

export interface FastMovingProduct {
  barangId: string;

  nama: string;

  totalTerjual: number;
}

// ============================================================
// SLOW MOVING
// ============================================================

export interface SlowMovingProduct {
  barangId: string;

  nama: string;

  totalTerjual: number;
}

// ============================================================
// INVENTORY HEALTH
// ============================================================
//
// Kondisi kesehatan stok
//
// sehat
// - stok aman
//
// warning
// - stok mendekati minimum
//
// kritis
// - stok habis
//
// ============================================================

export interface InventoryHealth {
  sehat: number;

  warning: number;

  kritis: number;
}

// ============================================================
// INVENTORY SCORE
// ============================================================
//
// Nilai kesehatan inventory secara keseluruhan
//
// Example:
//
// 90 Excellent
// 70 Healthy
// 40 Warning
// 10 Critical
//
// ============================================================

export interface InventoryScore {
  score: number;

  label: "Excellent" | "Healthy" | "Warning" | "Critical";
}

// ============================================================
// INVENTORY SUMMARY
// ============================================================
//
// Main contract untuk:
//
// - Dashboard
// - Analytics
// - Inventory Intelligence
//
// ============================================================

export interface InventorySummary {
  // ==========================================================
  // BASIC SUMMARY
  // ==========================================================

  totalProduk: number;

  totalStok: number;

  totalNilaiStok: number;

  // ==========================================================
  // LOW STOCK ALERT
  // ==========================================================

  lowStockCount: number;

  lowStockProducts: LowStockProduct[];

  // ==========================================================
  // PRODUCT MOVEMENT ANALYSIS
  // ==========================================================

  fastMovingProducts: FastMovingProduct[];

  slowMovingProducts: SlowMovingProduct[];

  // ==========================================================
  // STOCK CONDITION
  // ==========================================================

  inventoryHealth: InventoryHealth;

  // ==========================================================
  // INVENTORY INTELLIGENCE SCORE
  // ==========================================================

  inventoryScore: InventoryScore;
}
