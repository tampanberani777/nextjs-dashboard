import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/neondb';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { id_produk, nama_pembeli, tanggal_transaksi, total_harga } = body;
    
    await sql`
      UPDATE transaksi
      SET id_produk = ${id_produk}, nama_pembeli = ${nama_pembeli}, tanggal_transaksi = ${tanggal_transaksi}, total_harga = ${total_harga}
      WHERE id_transaksi = ${params.id}
    `;
    
    return NextResponse.json({ message: 'Transaksi berhasil diupdate' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal mengupdate transaksi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await sql`DELETE FROM transaksi WHERE id_transaksi = ${params.id}`;
    return NextResponse.json({ message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal menghapus transaksi' }, { status: 500 });
  }
}
