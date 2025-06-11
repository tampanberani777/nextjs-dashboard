import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/neondb';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nama_produk, harga, foto, deskripsi } = body;

    await sql`
      UPDATE produk
      SET nama_produk = ${nama_produk}, harga = ${harga}, foto = ${foto}, deskripsi = ${deskripsi}
      WHERE id_produk = ${id}
    `;

    return NextResponse.json({ message: 'Produk berhasil diupdate' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal mengupdate produk' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await sql`DELETE FROM produk WHERE id_produk = ${id}`;

    return NextResponse.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 });
  }
}
