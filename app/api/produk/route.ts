import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../lib/neondb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    let result;
    if (q) {
      result = await sql`
        SELECT id_produk, nama_produk, harga, foto, deskripsi
        FROM produk
        WHERE 
          LOWER(nama_produk) LIKE LOWER('%' || ${q} || '%') OR
          CAST(id_produk AS TEXT) LIKE '%' || ${q} || '%' OR
          LOWER(deskripsi) LIKE LOWER('%' || ${q} || '%')
        ORDER BY id_produk ASC
      `;
    } else {
      result = await sql`
        SELECT id_produk, nama_produk, harga, foto, deskripsi
        FROM produk
        ORDER BY id_produk ASC
      `;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data produk' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_produk, nama_produk, harga, foto, deskripsi } = body;

    await sql`
      INSERT INTO produk (id_produk, nama_produk, harga, foto, deskripsi)
      VALUES (${id_produk}, ${nama_produk}, ${harga}, ${foto}, ${deskripsi})
    `;
    
    return NextResponse.json({ message: 'Produk berhasil ditambahkan' }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal menambah produk' }, { status: 500 });
  }
}
