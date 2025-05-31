'use client';

import React, { useState, useEffect } from 'react';

// Contoh data awal
const initialTransactions = [
  { id: 'T001', product_id: 'P1', buyer: 'John Thor', date: '2025-05-19', total: 200 },
  { id: 'T002', product_id: 'P3', buyer: 'Jane Smith', date: '2025-05-20', total: 1100000 },
  { id: 'T003', product_id: 'P1', buyer: 'Alice', date: '2025-05-21', total: 400000 },
  { id: 'T004', product_id: 'P2', buyer: 'Bob', date: '2025-05-22', total: 500000 },
  { id: 'T005', product_id: 'P1', buyer: 'Charlie', date: '2025-05-23', total: 400000 },
];

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID");
}

export default function TransaksiPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [form, setForm] = useState({ id: '', product_id: '', buyer: '', date: '', total: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Filter data berdasarkan pencarian
  const filtered = transactions.filter(
    t =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.product_id.toLowerCase().includes(search.toLowerCase()) ||
      t.buyer.toLowerCase().includes(search.toLowerCase())
  );

  // Handler input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.product_id || !form.buyer || !form.date || !form.total) return;
    setTransactions([...transactions, { ...form, total: Number(form.total) }]);
    setForm({ id: '', product_id: '', buyer: '', date: '', total: '' });
  };

  // Edit
  const handleEdit = (t: any) => {
    setEditId(t.id);
    setForm({ ...t, total: t.total.toString() });
  };

  // Update
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactions(transactions.map(t => (t.id === editId ? { ...form, total: Number(form.total) } : t)));
    setEditId(null);
    setForm({ id: '', product_id: '', buyer: '', date: '', total: '' });
  };

  // Delete
  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi</h1>

      {/* Form Tambah/Edit */}
      <form onSubmit={editId ? handleUpdate : handleAdd} className="mb-4 flex gap-2 flex-wrap">
        <input className="border px-2 py-1 text-black" name="id" placeholder="ID Transaksi" value={form.id} onChange={handleChange} disabled={!!editId} />
        <input className="border px-2 py-1 text-black" name="product_id" placeholder="ID Produk" value={form.product_id} onChange={handleChange} />
        <input className="border px-2 py-1 text-black" name="buyer" placeholder="Nama Pembeli" value={form.buyer} onChange={handleChange} />
        <input className="border px-2 py-1 text-black" name="date" placeholder="Tanggal" type="date" value={form.date} onChange={handleChange} />
        <input className="border px-2 py-1 text-black" name="total" placeholder="Total Harga" type="number" value={form.total} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editId ? 'Update' : 'Tambah'}
        </button>
        {editId && (
          <button type="button" className="bg-gray-400 text-white px-4 py-1 rounded" onClick={() => { setEditId(null); setForm({ id: '', product_id: '', buyer: '', date: '', total: '' }); }}>
            Batal
          </button>
        )}
      </form>

      {/* Search */}
      <input
        className="border px-2 py-1 mb-2 text-black"
        placeholder="Cari transaksi..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Tabel Transaksi */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">ID Transaksi</th>
              <th className="px-6 py-3">ID Produk</th>
              <th className="px-6 py-3">Nama Pembeli</th>
              <th className="px-6 py-3">Tanggal Transaksi</th>
              <th className="px-6 py-3">Total Harga</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            ) : (
              filtered.map(t => (
                <tr key={t.id}>
                  <td className="px-6 py-4">{t.id}</td>
                  <td className="px-6 py-4">{t.product_id}</td>
                  <td className="px-6 py-4">{t.buyer}</td>
                  <td className="px-6 py-4">{t.date}</td>
                  <td className="px-6 py-4">{formatRupiah(Number(t.total))}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(t.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
