'use client';

import React, { useState } from 'react';

function formatRupiah(num: number) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

export default function TransaksiTable({ transaksi }: { transaksi: any[] }) {
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

  // Tambah transaksi
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/admin/api/transaksi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...addForm, total_harga: Number(addForm.total_harga) }),
    });
    setAddForm({ id_transaksi: '', id_produk: '', nama_pembeli: '', tanggal_transaksi: '', total_harga: '' });
    setShowAdd(false);
    window.location.reload();
  };

  // Edit transaksi
  const handleEdit = (t: any) => {
    setEditId(t.id_transaksi);
    setEditForm({
      id_produk: t.id_produk,
      nama_pembeli: t.nama_pembeli,
      tanggal_transaksi: t.tanggal_transaksi,
      total_harga: t.total_harga.toString(),
    });
  };

  // Simpan edit
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/admin/api/transaksi/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, total_harga: Number(editForm.total_harga) }),
    });
    setEditId(null);
    window.location.reload();
  };

  // Hapus transaksi
  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus transaksi ini?')) return;
    await fetch(`/admin/api/transaksi/${id}`, { method: 'DELETE' });
    window.location.reload();
  };

  return (
    <div>
      {/* Tombol Tambah */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowAdd(!showAdd)}
      >
        {showAdd ? 'Tutup Form Tambah' : 'Tambah Transaksi'}
      </button>

      {/* Form Tambah Transaksi */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-4 flex flex-wrap gap-2 items-center bg-gray-50 p-4 rounded">
          <input className="border px-2 py-1" name="id_transaksi" placeholder="ID Transaksi" value={addForm.id_transaksi} onChange={e => setAddForm({ ...addForm, id_transaksi: e.target.value })} required />
          <input className="border px-2 py-1" name="id_produk" placeholder="ID Produk" value={addForm.id_produk} onChange={e => setAddForm({ ...addForm, id_produk: e.target.value })} required />
          <input className="border px-2 py-1" name="nama_pembeli" placeholder="Nama Pembeli" value={addForm.nama_pembeli} onChange={e => setAddForm({ ...addForm, nama_pembeli: e.target.value })} required />
          <input className="border px-2 py-1" name="tanggal_transaksi" type="date" placeholder="Tanggal Transaksi" value={addForm.tanggal_transaksi} onChange={e => setAddForm({ ...addForm, tanggal_transaksi: e.target.value })} required />
          <input className="border px-2 py-1" name="total_harga" placeholder="Total Harga" type="number" value={addForm.total_harga} onChange={e => setAddForm({ ...addForm, total_harga: e.target.value })} required />
          <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Simpan</button>
        </form>
      )}

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
            {transaksi.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            ) : (
              transaksi.map((t: any) =>
                editId === t.id_transaksi ? (
                  <tr key={t.id_transaksi} className="bg-yellow-50">
                    <td className="px-6 py-4">{t.id_transaksi}</td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full" name="id_produk" value={editForm.id_produk} onChange={e => setEditForm({ ...editForm, id_produk: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full" name="nama_pembeli" value={editForm.nama_pembeli} onChange={e => setEditForm({ ...editForm, nama_pembeli: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full" name="tanggal_transaksi" type="date" value={editForm.tanggal_transaksi} onChange={e => setEditForm({ ...editForm, tanggal_transaksi: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full" name="total_harga" type="number" value={editForm.total_harga} onChange={e => setEditForm({ ...editForm, total_harga: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={handleUpdate}>
                        Simpan
                      </button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>
                        Batal
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={t.id_transaksi}>
                    <td className="px-6 py-4">{t.id_transaksi}</td>
                    <td className="px-6 py-4">{t.id_produk}</td>
                    <td className="px-6 py-4">{t.nama_pembeli}</td>
                    <td className="px-6 py-4">{t.tanggal_transaksi}</td>
                    <td className="px-6 py-4">{formatRupiah(t.total_harga)}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(t)}>
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
