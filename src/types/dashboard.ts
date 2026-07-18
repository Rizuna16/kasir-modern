/**
 * ============================================================
 * Enterprise Dashboard Domain
 * ============================================================
 *
 * Dashboard bukan tempat menghitung data.
 *
 * Dashboard hanya membaca hasil analitik
 * dari dashboardService.
 *
 * ============================================================
 */

export interface DashboardSummary {
  totalRevenue: number;

  totalTransaction: number;

  averageTransaction: number;

  totalCustomer: number;
}

export interface SalesChartItem {
  date: string;

  total: number;
}

export interface RecentInvoiceItem {
  id: string;

  invoiceNumber: string;

  customerName: string;

  cashierName: string;

  total: number;

  status: string;

  date: string;
}

export interface TopProductItem {
  productId: string;

  productName: string;

  qty: number;

  revenue: number;
}

export interface StockAlertItem {
  productId: string;

  productName: string;

  stock: number;

  level: "critical" | "warning";
}
