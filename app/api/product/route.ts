import { NextRequest } from 'next/server';
import { sql } from '../../lib/neondb';

// Ambil semua produk dari database
export async function GET() {
  try {
    const result = await sql`SELECT * FROM produk ORDER BY id_produk ASC`;
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal mengambil produk', detail: error }), { status: 500 });
  }
}

// Tambah produk ke database
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id_produk, nama_produk, harga, foto, deskripsi } = body;

  try {
    await sql`
      INSERT INTO produk (id_produk, nama_produk, harga, foto, deskripsi)
      VALUES (${id_produk}, ${nama_produk}, ${harga}, ${foto}, ${deskripsi})
    `;
    return new Response(JSON.stringify({ message: 'Produk berhasil ditambahkan' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menambah produk', detail: error }), { status: 500 });
  }
}
