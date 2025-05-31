import { NextRequest } from 'next/server';
import { sql } from '../../../lib/neondb';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { id_produk, nama_pembeli, tanggal_transaksi, total_harga } = body;
  await sql`
    UPDATE transactions
    SET product_id = ${id_produk}, buyer = ${nama_pembeli}, date = ${tanggal_transaksi}, total = ${total_harga}
    WHERE id = ${params.id}
  `;
  return new Response(JSON.stringify({ message: 'Transaksi berhasil diupdate' }), { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await sql`DELETE FROM transactions WHERE id = ${params.id}`;
  return new Response(JSON.stringify({ message: 'Transaksi berhasil dihapus' }), { status: 200 });
}
