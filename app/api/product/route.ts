import { NextRequest } from 'next/server';
import { sql } from '../../lib/neondb';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id_produk, nama_produk, harga, foto, deskripsi } = body;

  try {
    // Gunakan template literal (backtick) agar sesuai dengan Neon
    await sql`
      INSERT INTO produk (id_produk, nama_produk, harga, foto, deskripsi)
      VALUES (${id_produk}, ${nama_produk}, ${harga}, ${foto}, ${deskripsi})
    `;
    return new Response(JSON.stringify({ message: 'Produk berhasil ditambahkan' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menambah produk', detail: error }), { status: 500 });
  }
}
