'use client';
{/* app/admin/transaksi/TransaksiTable.tsx */}
import React, { useState, useEffect } from 'react';

function formatRupiah(num) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

export default function TransaksiTable() {
  const [searchTimer, setSearchTimer] = useState(null);
  const [transaksi, setTransaksi] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    product_id: '',
    buyer: '',
    date: '',
    total: '',
  });
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    id: '',
    product_id: '',
    buyer: '',
    date: '',
    total: '',
  });

  const fetchTransaksi = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/transaksi${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTransaksi(data);
      } else if (data && Array.isArray(data.rows)) {
        setTransaksi(data.rows);
      } else {
        setTransaksi([]);
      }
    } catch (error) {
      setTransaksi([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);

    if (searchTimer) clearTimeout(searchTimer);

    const timer = setTimeout(() => {
      fetchTransaksi(val);
    }, 300);

    setSearchTimer(timer);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/transaksi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...addForm, total: Number(addForm.total) }),
    });
    if (res.ok) {
      setAddForm({ id: '', product_id: '', buyer: '', date: '', total: '' });
      setShowAdd(false);
      fetchTransaksi(search);
    } else {
      alert('Gagal menambah transaksi');
    }
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setEditForm({
      product_id: t.product_id,
      buyer: t.buyer,
      date: t.date ? t.date.split('T')[0] : '',
      total: t.total?.toString() || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/transaksi/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, total: Number(editForm.total) }),
    });
    if (res.ok) {
      setEditId(null);
      fetchTransaksi(search);
    } else {
      alert('Gagal mengupdate transaksi');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus transaksi ini?')) return;
    const res = await fetch(`/api/transaksi/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchTransaksi(search);
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
        <form
          onSubmit={handleAdd}
          className="mb-6 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block mb-1 text-sm text-gray-700">ID Transaksi</label>
            <input
              className="border px-2 py-1 text-black rounded w-full"
              name="id"
              placeholder="ID Transaksi"
              value={addForm.id}
              onChange={e => setAddForm({ ...addForm, id: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">ID Produk</label>
            <input
              className="border px-2 py-1 text-black rounded w-full"
              name="product_id"
              placeholder="ID Produk"
              value={addForm.product_id}
              onChange={e => setAddForm({ ...addForm, product_id: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Nama Pembeli</label>
            <input
              className="border px-2 py-1 text-black rounded w-full"
              name="buyer"
              placeholder="Nama Pembeli"
              value={addForm.buyer}
              onChange={e => setAddForm({ ...addForm, buyer: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Tanggal Transaksi</label>
            <input
              className="border px-2 py-1 text-black rounded w-full"
              name="date"
              type="date"
              placeholder="Tanggal Transaksi"
              value={addForm.date}
              onChange={e => setAddForm({ ...addForm, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Total Harga</label>
            <input
              className="border px-2 py-1 text-black rounded w-full"
              name="total"
              placeholder="Total Harga"
              type="number"
              value={addForm.total}
              onChange={e => setAddForm({ ...addForm, total: e.target.value })}
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Simpan
            </button>
          </div>
        </form>
      )}

      {loading && <div className="text-center py-4">Loading...</div>}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center">ID Transaksi</th>
              <th className="px-6 py-3 text-center">ID Produk</th>
              <th className="px-6 py-3 text-left">Nama Pembeli</th>
              <th className="px-6 py-3 text-center">Tanggal Transaksi</th>
              <th className="px-6 py-3 text-center">Total Harga</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(transaksi) && transaksi.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            ) : (
              transaksi.map((t) =>
                editId === t.id ? (
                  <tr key={t.id} className="bg-yellow-50">
                    <td className="px-6 py-4 text-center">{t.id}</td>
                    <td className="px-6 py-4 text-center">
                      <input className="border px-2 py-1 w-full rounded" name="product_id" value={editForm.product_id} onChange={e => setEditForm({ ...editForm, product_id: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 text-left">
                      <input className="border px-2 py-1 w-full rounded" name="buyer" value={editForm.buyer} onChange={e => setEditForm({ ...editForm, buyer: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input className="border px-2 py-1 w-full rounded" name="date" type="date" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input className="border px-2 py-1 w-full rounded" name="total" type="number" value={editForm.total} onChange={e => setEditForm({ ...editForm, total: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={handleUpdate}>
                        Simpan
                      </button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>
                        Batal
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={t.id}>
                    <td className="px-6 py-4 text-center">{t.id}</td>
                    <td className="px-6 py-4 text-center">{t.product_id}</td>
                    <td className="px-6 py-4 text-left">{t.buyer}</td>
                    <td className="px-6 py-4 text-center">{t.date ? new Date(t.date).toLocaleDateString('id-ID') : ''}</td>
                    <td className="px-6 py-4 text-center">{formatRupiah(t.total)}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button className="bg-yellow-400 text-white px-2 py-1 rounded" onClick={() => handleEdit(t)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(t.id)}>
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
