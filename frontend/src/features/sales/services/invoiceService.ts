import type { Invoice } from "../types";

const STORAGE_KEY = "enterprise-invoices";

function getStorage(): Invoice[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(data) as Invoice[];
  } catch {
    return [];
  }
}

function saveStorage(data: Invoice[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getInvoices(): Invoice[] {
  return getStorage();
}

export function getInvoiceById(id: string): Invoice | undefined {
  return getStorage().find((invoice) => invoice.id === id);
}

export function addInvoice(invoice: Invoice): Invoice {
  const invoices = getStorage();

  invoices.push(invoice);

  saveStorage(invoices);

  return invoice;
}

export function deleteInvoice(id: string) {
  const invoices = getStorage().filter((item) => item.id !== id);

  saveStorage(invoices);
}

export default {
  getInvoices,
  getInvoiceById,
  addInvoice,
  deleteInvoice,
};
