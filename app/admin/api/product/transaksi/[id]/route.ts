import { NextRequest } from 'next/server';
import { sql } from '../../../../../lib/neondb';

// PUT: Edit transaksi
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { id_produk, nama_pembeli, tanggal_transaksi, total_harga } = body;
  await sql`
    UPDATE transaksi
    SET id_produk = ${id_produk}, nama_pembeli = ${nama_pembeli}, tanggal_transaksi = ${tanggal_transaksi}, total_harga = ${total_harga}
    WHERE id_transaksi = ${params.id}
  `;
  return new Response(JSON.stringify({ message: 'Transaksi berhasil diupdate' }), { status: 200 });
}

// DELETE: Hapus transaksi
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await sql`DELETE FROM transaksi WHERE id_transaksi = ${params.id}`;
  return new Response(JSON.stringify({ message: 'Transaksi berhasil dihapus' }), { status: 200 });
}
