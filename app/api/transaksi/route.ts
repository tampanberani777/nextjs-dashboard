{/* app/api/transaksi/route.ts */}
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../lib/neondb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    let result;
    if (q) {
      result = await sql`
        SELECT id, product_id, buyer, date, total
        FROM transactions
        WHERE 
          LOWER(buyer) LIKE LOWER('%' || ${q} || '%') OR
          CAST(id AS TEXT) LIKE '%' || ${q} || '%' OR
          CAST(product_id AS TEXT) LIKE '%' || ${q} || '%'
        ORDER BY id ASC
      `;
    } else {
      result = await sql`
        SELECT id, product_id, buyer, date, total
        FROM transactions
        ORDER BY id ASC
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
    const { id, product_id, buyer, date, total } = body;
    
    await sql`
      INSERT INTO transactions (id, product_id, buyer, date, total)
      VALUES (${id}, ${product_id}, ${buyer}, ${date}, ${total})
    `;
    
    return NextResponse.json({ message: 'Transaksi berhasil ditambahkan' }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal menambah transaksi' }, { status: 500 });
  }
}
