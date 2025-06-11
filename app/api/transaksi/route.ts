import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../lib/neondb';


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '5');
    const offset = (page - 1) * limit;

    const rows = await sql`
      SELECT id, product_id, buyer, date, total
      FROM transactions
      WHERE 
        LOWER(buyer) LIKE LOWER('%' || ${q} || '%') OR
        CAST(id AS TEXT) LIKE '%' || ${q} || '%' OR
        CAST(product_id AS TEXT) LIKE '%' || ${q} || '%'
      ORDER BY id ASC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const countResult = await sql`
      SELECT COUNT(*) FROM transactions
      WHERE 
        LOWER(buyer) LIKE LOWER('%' || ${q} || '%') OR
        CAST(id AS TEXT) LIKE '%' || ${q} || '%' OR
        CAST(product_id AS TEXT) LIKE '%' || ${q} || '%'
    `;

    const total = Number((countResult[0] as any).count);

    return NextResponse.json({ rows, total });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data transaksi' }, { status: 500 });
  }
}

// GET ID TERBESAR
export async function HEAD() {
  try {
    const result = await sql`
      SELECT id FROM transactions
      ORDER BY CAST(SUBSTRING(id FROM 2) AS INTEGER) DESC
      LIMIT 1
    `;
    const lastId = result.length > 0 ? result[0].id : "T000";
    return NextResponse.json({ lastId });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal mengambil ID terakhir' }, { status: 500 });
  }
}

// POST /api/transaksi
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, product_id, buyer, date, total } = body;

    if (!id || !product_id || !buyer || !date || total == null) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

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
