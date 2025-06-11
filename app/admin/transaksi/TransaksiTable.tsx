'use client';

import React, { useState, useEffect } from 'react';

function formatRupiah(num: number) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

function getNextIdFromLast(lastId: string | null): string {
  if (!lastId || !lastId.startsWith("T")) return "T001";
  const number = parseInt(lastId.slice(1)) + 1;
  return `T${number.toString().padStart(3, '0')}`;
}

export default function TransaksiTable() {
  const [search, setSearch] = useState('');
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [transaksi, setTransaksi] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;
  const [produkList, setProdukList] = useState<{ id: string; nama_produk: string }[]>([]);
  const [lastId, setLastId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    product_id: '',
    buyer: '',
    date: '',
    total: '',
  });

  const [addForm, setAddForm] = useState({
    id: '',
    product_id: '',
    buyer: '',
    date: '',
    total: '',
  });

  const [showAdd, setShowAdd] = useState(false);

  const fetchTransaksi = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/transaksi?q=${encodeURIComponent(query)}&page=${page}&limit=${itemsPerPage}`);
      const data = await res.json();
      if (Array.isArray(data.rows)) {
        setTransaksi(data.rows);
        setTotalItems(data.total);
      } else {
        setTransaksi([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error(error);
      setTransaksi([]);
    }
    setLoading(false);
  };

const fetchLastId = async () => {
  try {
    const res = await fetch(`/api/transaksi`);
    const data = await res.json();
    const rows = data?.rows || [];

    // Cari ID transaksi dengan angka terbesar
    const max = rows.reduce((acc: string, curr: any) => {
      const currNum = parseInt(curr.id.slice(1));
      const accNum = parseInt(acc.slice(1));
      return currNum > accNum ? curr.id : acc;
    }, 'T000');

    const nextId = getNextIdFromLast(max);
    setLastId(max);
    setAddForm((prev) => ({ ...prev, id: nextId }));
  } catch (err) {
    console.error('Gagal ambil ID terbesar', err);
  }
};


  useEffect(() => {
    fetchTransaksi(search, currentPage);
    fetchLastId();
  }, [search, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    setCurrentPage(1);

    if (searchTimer) clearTimeout(searchTimer);

    const timer = setTimeout(() => {
      fetchTransaksi(val, 1);
    }, 300);

    setSearchTimer(timer);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/transaksi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...addForm, total: Number(addForm.total) }),
    });
    if (res.ok) {
      const nextId = getNextIdFromLast(addForm.id);
      setAddForm({
        id: nextId,
        product_id: '',
        buyer: '',
        date: '',
        total: '',
      });
      setLastId(nextId);
      setShowAdd(false);
      fetchTransaksi(search, currentPage);
    } else {
      alert('Gagal menambah transaksi');
    }
  };

  const handleEdit = (t: any) => {
    setEditId(t.id);
    setEditForm({
      product_id: t.product_id,
      buyer: t.buyer,
      date: t.date?.split('T')[0] || '',
      total: t.total?.toString() || '',
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/transaksi/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, total: Number(editForm.total) }),
    });
    if (res.ok) {
      setEditId(null);
      fetchTransaksi(search, currentPage);
    } else {
      alert('Gagal update transaksi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus transaksi ini?')) return;
    const res = await fetch(`/api/transaksi/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchTransaksi(search, currentPage);
    } else {
      alert('Gagal menghapus transaksi');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cari transaksi..."
        value={search}
        onChange={handleSearchChange}
        className="border px-2 py-1 mb-4 w-full max-w-sm text-black"
      />

      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowAdd(!showAdd)}
      >
        {showAdd ? 'Tutup Form Tambah' : 'Tambah Transaksi'}
      </button>

      {showAdd && (
        <form onSubmit={handleAdd} className="mb-6 p-4 bg-white rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
          {['id', 'product_id', 'buyer', 'date', 'total'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-700 capitalize">{field.replace('_', ' ')}</label>
              <input
                type={field === 'date' ? 'date' : field === 'total' ? 'number' : 'text'}
                className={`border px-2 py-1 w-full text-black rounded ${field === 'id' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                value={(addForm as any)[field]}
                onChange={(e) => setAddForm({ ...addForm, [field]: e.target.value })}
                readOnly={field === 'id'}
                required
              />
            </div>
          ))}
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded col-span-full">
            Simpan Transaksi
          </button>
        </form>
      )}

      {loading && <div className="text-center py-4">Loading...</div>}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-gray-900">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center">ID</th>
              <th className="px-4 py-2 text-center">Produk</th>
              <th className="px-4 py-2 text-left">Pembeli</th>
              <th className="px-4 py-2 text-center">Tanggal</th>
              <th className="px-4 py-2 text-center">Total</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">Tidak ada data</td>
              </tr>
            ) : transaksi.map((t) =>
              editId === t.id ? (
                <tr key={t.id} className="bg-yellow-50">
                  <td className="px-4 py-2 text-center">{t.id}</td>
                  <td className="px-4 py-2 text-center">
                    <input className="border px-2 py-1 rounded w-full" value={editForm.product_id} onChange={e => setEditForm({ ...editForm, product_id: e.target.value })} />
                  </td>
                  <td className="px-4 py-2">
                    <input className="border px-2 py-1 rounded w-full" value={editForm.buyer} onChange={e => setEditForm({ ...editForm, buyer: e.target.value })} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input className="border px-2 py-1 rounded w-full" type="date" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input className="border px-2 py-1 rounded w-full" type="number" value={editForm.total} onChange={e => setEditForm({ ...editForm, total: e.target.value })} />
                  </td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={handleUpdate}>Simpan</button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>Batal</button>
                  </td>
                </tr>
              ) : (
                <tr key={t.id}>
                  <td className="px-4 py-2 text-center">{t.id}</td>
                  <td className="px-4 py-2 text-center">{t.product_id}</td>
                  <td className="px-4 py-2">{t.buyer}</td>
                  <td className="px-4 py-2 text-center">{new Date(t.date).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-2 text-center">{formatRupiah(t.total)}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <button className="bg-yellow-400 text-white px-2 py-1 rounded" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(t.id)}>Hapus</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-300 text-black disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
          className="px-3 py-1 rounded bg-gray-300 text-black disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
