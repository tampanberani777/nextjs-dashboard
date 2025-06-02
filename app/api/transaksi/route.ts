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
          LOWER(nama_pembeli) LIKE LOWER(${`%${q}%`}) OR
          CAST(id_transaksi AS TEXT) LIKE ${`%${q}%`} OR
          CAST(id_produk AS TEXT) LIKE ${`%${q}%`}
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
    return NextResponse.json({ error: 'Gagal mengambil data transaksi' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { id_produk, nama_pembeli, tanggal_transaksi, total_harga } = body;
    await sql`
      UPDATE transactions
      SET product_id = ${id_produk}, buyer = ${nama_pembeli}, date = ${tanggal_transaksi}, total = ${total_harga}
      WHERE id = ${params.id}
    `;
    return new Response(JSON.stringify({ message: 'Transaksi berhasil diupdate' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal mengupdate transaksi' }), { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await sql`DELETE FROM transactions WHERE id = ${params.id}`;
    return new Response(JSON.stringify({ message: 'Transaksi berhasil dihapus' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menghapus transaksi' }), { status: 500 });
  }
}
