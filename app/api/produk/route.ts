{/* app/api/produk/route.ts */}

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/lib/neondb'; // pastikan path ini benar

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const page = Number(searchParams.get('page') || '1');
    const limit = 5;
    const offset = (page - 1) * limit;

    let result;
    let totalCount;

    if (q) {
      result = await sql`
        SELECT * FROM produk
        WHERE 
          LOWER(nama_produk) LIKE LOWER('%' || ${q} || '%') OR
          CAST(id_produk AS TEXT) LIKE '%' || ${q} || '%' OR
          LOWER(deskripsi) LIKE LOWER('%' || ${q} || '%')
        ORDER BY CAST(REGEXP_REPLACE(id_produk, '[^0-9]', '', 'g') AS INT) ASC
        LIMIT ${limit} OFFSET ${offset}
      `;

      const countRes = await sql`
        SELECT COUNT(*) FROM produk
        WHERE 
          LOWER(nama_produk) LIKE LOWER('%' || ${q} || '%') OR
          CAST(id_produk AS TEXT) LIKE '%' || ${q} || '%' OR
          LOWER(deskripsi) LIKE LOWER('%' || ${q} || '%')
      `;
      totalCount = Number(countRes[0].count);
    } else {
      result = await sql`
        SELECT * FROM produk
        ORDER BY CAST(REGEXP_REPLACE(id_produk, '[^0-9]', '', 'g') AS INT) ASC
        LIMIT ${limit} OFFSET ${offset}
      `;
      const countRes = await sql`SELECT COUNT(*) FROM produk`;
      totalCount = Number(countRes[0].count);
    }

    return NextResponse.json({ data: result, total: totalCount });
  } catch (error) {
    console.error('Database error (GET):', error);
    return NextResponse.json({ error: 'Gagal mengambil data produk' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_produk, nama_produk, harga, foto, deskripsi } = body;

    if (!id_produk || !nama_produk || !harga || !foto || !deskripsi) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    await sql`
      INSERT INTO produk (id_produk, nama_produk, harga, foto, deskripsi)
      VALUES (${id_produk}, ${nama_produk}, ${harga}, ${foto}, ${deskripsi})
    `;

    return NextResponse.json({ message: 'Produk berhasil ditambahkan' }, { status: 201 });
  } catch (error) {
    console.error('Database error (POST):', error);
    return NextResponse.json({ error: 'Gagal menambah produk' }, { status: 500 });
  }
}
