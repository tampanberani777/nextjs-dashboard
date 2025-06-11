// app/admin/transaksi/page.tsx
'use client';

import { Suspense } from 'react';
import TransaksiClientWrapper from './TransaksiClientWrapper';

export default function TransaksiPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi</h1>

      <Suspense fallback={null}>
        <TransaksiClientWrapper />
      </Suspense>
    </div>
  );
}
