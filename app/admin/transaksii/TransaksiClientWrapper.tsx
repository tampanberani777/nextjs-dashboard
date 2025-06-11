'use client';

import { useEffect, useState } from 'react';
import TransaksiTable from './TransaksiTable';

export default function TransaksiClientWrapper() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 500); // ⏱ delay 500ms
    return () => clearTimeout(timeout);
  }, []);

  if (!show) {
    // Biarkan suspense menampilkan loading.tsx
    return null;
  }

  return <TransaksiTable />;
}
