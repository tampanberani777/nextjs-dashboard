import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../lib/neondb';

export async function GET(request: NextRequest) {
  try {
    console.log('API /api/produk called'); // Debug log
    
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    let result;
    if (q && q.trim() !== '') {
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

    console.log('Data fetched:', result.length || 0, 'items'); // Debug log
    return NextResponse.json(result);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch products', details: error }, { status: 500 });
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
    
    return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Insert error:', error);
    return NextResponse.json({ error: 'Failed to add product', details: error }, { status: 500 });
  }
}
