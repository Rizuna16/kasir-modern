/**
 * ============================================================
 * Enterprise Dashboard Intelligence Service
 * ============================================================
 *
 * Responsibility:
 *
 * - Business Insight
 * - Recommendation
 * - Dashboard Intelligence
 *
 * Tidak mengambil data.
 * Tidak menghitung analytics.
 * Hanya menghasilkan insight dari data yang diberikan.
 *
 * ============================================================
 */

export interface DashboardInsight {
  id: string;
  title: string;
  description: string;
  type: "success" | "warning" | "info";
}

export interface DashboardIntelligenceInput {
  totalRevenue: number;
  totalTransactions: number;
  lowStockCount: number;
  topProductName?: string;
}

export interface DashboardIntelligence {
  insights: DashboardInsight[];
}

class DashboardIntelligenceService {
  generate(input: DashboardIntelligenceInput): DashboardIntelligence {
    const insights: DashboardInsight[] = [];

    if (input.totalRevenue > 10_000_000) {
      insights.push({
        id: "high-revenue",
        title: "Pendapatan Sangat Baik",
        description: "Pendapatan telah melewati Rp10.000.000.",
        type: "success",
      });
    }

    if (input.totalTransactions === 0) {
      insights.push({
        id: "no-transaction",
        title: "Belum Ada Transaksi",
        description: "Belum ada transaksi yang dapat dianalisis.",
        type: "warning",
      });
    }

    if (input.lowStockCount > 0) {
      insights.push({
        id: "low-stock",
        title: "Perhatian Stok",
        description: `${input.lowStockCount} produk memiliki stok rendah.`,
        type: "warning",
      });
    }

    if (input.topProductName) {
      insights.push({
        id: "top-product",
        title: "Produk Terlaris",
        description: `${input.topProductName} merupakan produk dengan penjualan tertinggi.`,
        type: "info",
      });
    }

    return {
      insights,
    };
  }
}

export const dashboardIntelligenceService = new DashboardIntelligenceService();
