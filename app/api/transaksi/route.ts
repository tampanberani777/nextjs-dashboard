import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../lib/neondb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const page = Number(searchParams.get('page') || '1');
    const limit = 5;
    const offset = (page - 1) * limit;
    const getAll = searchParams.get('all') === 'true';

    let result;
    let total;

    if (getAll) {
      // Ambil semua transaksi tanpa filter (khusus untuk mencari ID terbesar)
      result = await sql`SELECT * FROM transactions ORDER BY id ASC`;
      total = result.length;
    } else if (q) {
      result = await sql`
        SELECT * FROM transactions
        WHERE 
          LOWER(buyer) LIKE LOWER('%' || ${q} || '%') OR
          CAST(id AS TEXT) LIKE '%' || ${q} || '%' OR
          CAST(product_id AS TEXT) LIKE '%' || ${q} || '%'
        ORDER BY id ASC
        LIMIT ${limit} OFFSET ${offset}
      `;

      const countRes = await sql`
        SELECT COUNT(*) FROM transactions
        WHERE 
          LOWER(buyer) LIKE LOWER('%' || ${q} || '%') OR
          CAST(id AS TEXT) LIKE '%' || ${q} || '%' OR
          CAST(product_id AS TEXT) LIKE '%' || ${q} || '%'
      `;
      total = Number(countRes[0].count);
    } else {
      result = await sql`
        SELECT * FROM transactions
        ORDER BY id ASC
        LIMIT ${limit} OFFSET ${offset}
      `;

      const countRes = await sql`SELECT COUNT(*) FROM transactions`;
      total = Number(countRes[0].count);
    }

    return NextResponse.json({ rows: result, total });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data transaksi' }, { status: 500 });
  }
}
