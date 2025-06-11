// File: app/api/transaksi/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../lib/neondb';

// GET /api/transaksi?q=...&page=...&limit=...
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '5');
    const offset = (page - 1) * limit;

    if (q === '__lastid') {
      const maxIdRes = await sql`
        SELECT MAX(CAST(SUBSTRING(id FROM 2) AS INTEGER)) AS max_id
        FROM transactions
        WHERE id ~ '^T[0-9]+'
      `;

      const maxId = maxIdRes[0]?.max_id || 0;
      const newId = `T${(Number(maxId) + 1).toString().padStart(3, '0')}`;
      return NextResponse.json({ nextId: newId });
    }

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
