'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

function formatRupiah(num: number) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

function TransaksiTableComponent() {
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [transaksi, setTransaksi] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    id_produk: '',
    nama_pembeli: '',
    tanggal_transaksi: '',
    total_harga: '',
  });
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    id_transaksi: '',
    id_produk: '',
    nama_pembeli: '',
    tanggal_transaksi: '',
    total_harga: '',
  });

  // Fix hydration dengan useEffect
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchTransaksi = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/transaksi${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      const data = await res.json();
      
      console.log('Fetched data:', data);
      
      if (Array.isArray(data)) {
        setTransaksi(data);
      } else if (data && Array.isArray(data.rows)) {
        setTransaksi(data.rows);
      } else {
        console.error('Unexpected data format:', data);
        setTransaksi([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setTransaksi([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isClient) {
      fetchTransaksi();
    }
  }, [isClient]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);

    if (searchTimer) clearTimeout(searchTimer);

    const timer = setTimeout(() => {
      fetchTransaksi(val);
    }, 300);

    setSearchTimer(timer);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/transaksi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...addForm, total_harga: Number(addForm.total_harga) }),
      });
      if (res.ok) {
        setAddForm({ id_transaksi: '', id_produk: '', nama_pembeli: '', tanggal_transaksi: '', total_harga: '' });
        setShowAdd(false);
        fetchTransaksi(search);
      } else {
        alert('Gagal menambah transaksi');
      }
    } catch (error) {
      console.error('Add error:', error);
      alert('Gagal menambah transaksi');
    }
  };

  const handleEdit = (t: any) => {
    setEditId(t.id_transaksi);
    setEditForm({
      id_produk: t.id_produk?.toString() || '',
      nama_pembeli: t.nama_pembeli || '',
      tanggal_transaksi: t.tanggal_transaksi ? t.tanggal_transaksi.split('T')[0] : '',
      total_harga: t.total_harga?.toString() || '',
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/transaksi/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, total_harga: Number(editForm.total_harga) }),
      });
      if (res.ok) {
        setEditId(null);
        fetchTransaksi(search);
      } else {
        alert('Gagal mengupdate transaksi');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Gagal mengupdate transaksi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus transaksi ini?')) return;
    try {
      const res = await fetch(`/api/transaksi/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTransaksi(search);
      } else {
        alert('Gagal menghapus transaksi');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Gagal menghapus transaksi');
    }
  };

  // Render loading state selama hydration
  if (!isClient) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-full max-w-sm mb-4"></div>
        <div className="h-10 bg-blue-200 rounded w-40 mb-4"></div>
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="h-12 bg-gray-100"></div>
          <div className="p-4">
            <div className="text-center text-gray-400">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      {/* Search */}
      <input
        type="text"
        placeholder="Cari transaksi..."
        value={search}
        onChange={handleSearchChange}
        className="border px-2 py-1 mb-4 w-full max-w-sm text-black"
        suppressHydrationWarning
      />

      {/* Tombol Tambah */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowAdd(!showAdd)}
        suppressHydrationWarning
      >
        {showAdd ? 'Tutup Form Tambah' : 'Tambah Transaksi'}
      </button>

      {/* Form Tambah */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-4 flex flex-wrap gap-2 items-center bg-gray-50 p-4 rounded">
          <input className="border px-2 py-1 text-black" name="id_transaksi" placeholder="ID Transaksi" value={addForm.id_transaksi} onChange={e => setAddForm({ ...addForm, id_transaksi: e.target.value })} required />
          <input className="border px-2 py-1 text-black" name="id_produk" placeholder="ID Produk" value={addForm.id_produk} onChange={e => setAddForm({ ...addForm, id_produk: e.target.value })} required />
          <input className="border px-2 py-1 text-black" name="nama_pembeli" placeholder="Nama Pembeli" value={addForm.nama_pembeli} onChange={e => setAddForm({ ...addForm, nama_pembeli: e.target.value })} required />
          <input className="border px-2 py-1 text-black" name="tanggal_transaksi" type="date" placeholder="Tanggal Transaksi" value={addForm.tanggal_transaksi} onChange={e => setAddForm({ ...addForm, tanggal_transaksi: e.target.value })} required />
          <input className="border px-2 py-1 text-black" name="total_harga" placeholder="Total Harga" type="number" value={addForm.total_harga} onChange={e => setAddForm({ ...addForm, total_harga: e.target.value })} required />
          <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Simpan</button>
        </form>
      )}

      {/* Loading indicator */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Tabel */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Transaksi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pembeli</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Transaksi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(transaksi) && transaksi.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            ) : (
              Array.isArray(transaksi) && transaksi.map((t: any) =>
                editId === t.id_transaksi ? (
                  <tr key={t.id_transaksi} className="bg-yellow-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.id_transaksi}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input className="border px-2 py-1 w-full text-black" name="id_produk" value={editForm.id_produk} onChange={e => setEditForm({ ...editForm, id_produk: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input className="border px-2 py-1 w-full text-black" name="nama_pembeli" value={editForm.nama_pembeli} onChange={e => setEditForm({ ...editForm, nama_pembeli: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input className="border px-2 py-1 w-full text-black" name="tanggal_transaksi" type="date" value={editForm.tanggal_transaksi} onChange={e => setEditForm({ ...editForm, tanggal_transaksi: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input className="border px-2 py-1 w-full text-black" name="total_harga" type="number" value={editForm.total_harga} onChange={e => setEditForm({ ...editForm, total_harga: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={handleUpdate}>
                        Simpan
                      </button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>
                        Batal
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={t.id_transaksi}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.id_transaksi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.id_produk}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.nama_pembeli}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.tanggal_transaksi ? new Date(t.tanggal_transaksi).toLocaleDateString('id-ID') : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatRupiah(t.total_harga)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-yellow-400 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(t)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(t.id_transaksi)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Export dengan dynamic import untuk disable SSR
const TransaksiTable = dynamic(() => Promise.resolve(TransaksiTableComponent), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-full max-w-sm mb-4"></div>
      <div className="h-10 bg-blue-200 rounded w-40 mb-4"></div>
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="h-12 bg-gray-100"></div>
        <div className="p-4">
          <div className="text-center text-gray-400">Loading...</div>
        </div>
      </div>
    </div>
  )
});

export default TransaksiTable;
