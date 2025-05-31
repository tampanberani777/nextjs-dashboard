// app/admin/api/transaksi/route.ts
import { NextRequest } from 'next/server';
import { sql } from '../../../../lib/neondb';

export async function GET() {
  const result = await sql`
    SELECT id as id_transaksi, product_id as id_produk, buyer as nama_pembeli, date as tanggal_transaksi, total as total_harga
    FROM transactions
    ORDER BY id ASC
  `;
  return new Response(JSON.stringify(result), { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id_transaksi, id_produk, nama_pembeli, tanggal_transaksi, total_harga } = body;
  await sql`
    INSERT INTO transactions (id, product_id, buyer, date, total)
    VALUES (${id_transaksi}, ${id_produk}, ${nama_pembeli}, ${tanggal_transaksi}, ${total_harga})
  `;
  return new Response(JSON.stringify({ message: 'Transaksi berhasil ditambah' }), { status: 201 });
}
