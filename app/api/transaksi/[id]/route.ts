{/* app/api/transaksi/[id]/route.ts */}
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/neondb';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { product_id, buyer, date, total } = body;
    
    await sql`
      UPDATE transactions
      SET product_id = ${product_id}, buyer = ${buyer}, date = ${date}, total = ${total}
      WHERE id = ${params.id}
    `;
    
    return NextResponse.json({ message: 'Transaksi berhasil diupdate' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal mengupdate transaksi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await sql`DELETE FROM transactions WHERE id = ${params.id}`;
    return NextResponse.json({ message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal menghapus transaksi' }, { status: 500 });
  }
}
