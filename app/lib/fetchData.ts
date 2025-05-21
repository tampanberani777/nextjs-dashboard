import { sql } from './neondb';

export interface Product {
  id_produk: string;
  nama_produk: string;
  harga: number;
  foto: string;
  deskripsi: string;
}

export interface Transaction {
  id: string;
  product_id: string;
  buyer: string;
  date: string;
  total: number;
}

export async function fetchProducts(limit = 5): Promise<Product[]> {
  const result = await sql`
    SELECT id_produk, nama_produk, harga, foto, deskripsi
    FROM produk
    ORDER BY id_produk ASC
    LIMIT ${limit}
  `;
  return result.map((row: any) => ({
    id_produk: row.id_produk,
    nama_produk: row.nama_produk,
    harga: Number(row.harga),
    foto: row.foto,
    deskripsi: row.deskripsi,
  }));
}

export async function fetchTransactions(limit = 5): Promise<Transaction[]> {
  const result = await sql`
    SELECT id, product_id, buyer, date, total
    FROM transactions
    ORDER BY date ASC
    LIMIT ${limit}
  `;
  return result.map((row: any) => ({
    id: row.id,
    product_id: row.product_id,
    buyer: row.buyer,
    date: row.date instanceof Date ? row.date.toISOString().split('T')[0] : row.date,
    total: Number(row.total),
  }));
}
