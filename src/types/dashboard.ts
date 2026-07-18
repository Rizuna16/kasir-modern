/**
 * ============================================================
 * Executive Intelligence Dashboard Types
 * ============================================================
 *
 * Dashboard Operational
 * +
 * Executive Intelligence
 *
 * ============================================================
 */

/**
 * ============================================================
 * Dashboard Summary
 * ============================================================
 */

export interface DashboardSummary {
  totalRevenue: number;

  /**
   * Legacy / alias bisnis
   */
  totalPenjualan?: number;

  /**
   * Existing service field
   */
  totalTransaction: number;

  /**
   * Indonesian alias
   */
  totalTransaksi?: number;

  totalBarang?: number;

  stokMenipis?: number;

  totalCustomer: number;

  averageTransaction: number;
}

/**
 * ============================================================
 * Sales Chart
 * ============================================================
 */

export interface SalesChartData {
  date?: string;

  label?: string;

  total: number;
}

/**
 * ============================================================
 * Recent Transaction
 * ============================================================
 */

export interface RecentTransaction {
  id: string;

  invoice?: string;

  invoiceNumber?: string;

  tanggal?: string;

  date?: string;

  customer?: string;

  customerName?: string;

  cashierName?: string;

  total: number;

  status?: "LUNAS" | "BELUM LUNAS";
}

/**
 * ============================================================
 * Top Product
 * ============================================================
 */

export interface TopProduct {
  barangId?: string;

  productId?: string;

  namaBarang?: string;

  productName?: string;

  jumlahTerjual?: number;

  qty: number;

  totalPenjualan?: number;

  revenue: number;
}

/**
 * ============================================================
 * Stock Alert
 * ============================================================
 */

export interface StockAlert {
  barangId?: string;

  productId?: string;

  namaBarang?: string;

  productName?: string;

  stok?: number;

  stock?: number;

  minimumStok?: number;

  level?: string;
}

/**
 * ============================================================
 * EXECUTIVE INTELLIGENCE
 * ============================================================
 */

export interface ExecutiveSummary {
  revenueHariIni: number;

  totalTransaksiHariIni: number;

  totalCustomerHariIni: number;

  averageTransaction: number;
}

/**
 * ============================================================
 * Revenue Growth
 * ============================================================
 */

export interface RevenueGrowth {
  periode: string;

  revenueSekarang: number;

  revenueSebelumnya: number;

  growthPercentage: number;
}

/**
 * ============================================================
 * Profit Analytics
 * ============================================================
 */

export interface ProfitAnalytics {
  totalRevenue: number;

  totalModal: number;

  totalProfit: number;

  marginPercentage: number;
}

/**
 * ============================================================
 * Customer Insight
 * ============================================================
 */

export interface CustomerInsight {
  totalCustomer: number;

  customerTerbaik?: string;

  totalBelanjaTerbesar: number;

  rataRataBelanjaCustomer: number;
}

/**
 * ============================================================
 * BACKWARD COMPATIBILITY ALIAS
 * ============================================================
 */

export type SalesChartItem = SalesChartData;

export type RecentInvoiceItem = RecentTransaction;

export type TopProductItem = TopProduct;

export type StockAlertItem = StockAlert;
