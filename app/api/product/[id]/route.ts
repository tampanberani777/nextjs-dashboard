import { NextRequest } from 'next/server';
import { sql } from '../../../lib/neondb';

// Update produk (PUT)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { nama_produk, harga, foto, deskripsi } = body;
  const { id } = params;

  try {
    await sql`
      UPDATE produk
      SET nama_produk = ${nama_produk}, harga = ${harga}, foto = ${foto}, deskripsi = ${deskripsi}
      WHERE id_produk = ${id}
    `;
    return new Response(JSON.stringify({ message: 'Produk berhasil diupdate' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal mengupdate produk', detail: error }), { status: 500 });
  }
}

// Hapus produk (DELETE)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await sql`DELETE FROM produk WHERE id_produk = ${id}`;
    return new Response(JSON.stringify({ message: 'Produk berhasil dihapus' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menghapus produk', detail: error }), { status: 500 });
  }
}
