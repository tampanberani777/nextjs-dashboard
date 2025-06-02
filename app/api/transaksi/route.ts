import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../lib/neondb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    let result;
    if (q) {
      result = await sql`
        SELECT id_transaksi, id_produk, nama_pembeli, tanggal_transaksi, total_harga
        FROM transaksi
        WHERE 
          LOWER(nama_pembeli) LIKE LOWER('%' || ${q} || '%') OR
          CAST(id_transaksi AS TEXT) LIKE '%' || ${q} || '%' OR
          CAST(id_produk AS TEXT) LIKE '%' || ${q} || '%'
        ORDER BY id_transaksi ASC
      `;
    } else {
      result = await sql`
        SELECT id_transaksi, id_produk, nama_pembeli, tanggal_transaksi, total_harga
        FROM transaksi
        ORDER BY id_transaksi ASC
      `;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data transaksi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_transaksi, id_produk, nama_pembeli, tanggal_transaksi, total_harga } = body;
    
    await sql`
      INSERT INTO transaksi (id_transaksi, id_produk, nama_pembeli, tanggal_transaksi, total_harga)
      VALUES (${id_transaksi}, ${id_produk}, ${nama_pembeli}, ${tanggal_transaksi}, ${total_harga})
    `;
    
    return NextResponse.json({ message: 'Transaksi berhasil ditambahkan' }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal menambah transaksi' }, { status: 500 });
  }
}
