'use client';

import React, { useState, useEffect } from 'react';

function formatRupiah(num: number) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

export default function ProdukTable() {
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    nama_produk: '',
    harga: '',
    foto: '',
    deskripsi: '',
  });
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    id_produk: '',
    nama_produk: '',
    harga: '',
    foto: '',
    deskripsi: '',
  });

  // Fetch produk dari API (dengan search)
  const fetchProducts = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/produk${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.rows)) {
        setProducts(data.rows);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);

    if (searchTimer) clearTimeout(searchTimer);

    const timer = setTimeout(() => {
      fetchProducts(val);
    }, 300);

    setSearchTimer(timer);
  };

  // Tambah produk baru
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/produk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...addForm, harga: Number(addForm.harga) }),
    });
    setAddForm({ id_produk: '', nama_produk: '', harga: '', foto: '', deskripsi: '' });
    setShowAdd(false);
    fetchProducts(search);
  };

  // Edit produk
  const handleEdit = (p: any) => {
    setEditId(p.id_produk);
    setEditForm({
      nama_produk: p.nama_produk,
      harga: p.harga.toString(),
      foto: p.foto,
      deskripsi: p.deskripsi,
    });
  };

  // Simpan edit ke database
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/produk/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, harga: Number(editForm.harga) }),
    });
    setEditId(null);
    fetchProducts(search);
  };

  // Hapus produk
  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    await fetch(`/api/produk/${id}`, { method: 'DELETE' });
    fetchProducts(search);
  };

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Cari produk..."
        value={search}
        onChange={handleSearchChange}
        className="border px-2 py-1 mb-4 w-full max-w-sm text-black"
      />

      {/* Tombol Tambah Produk */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowAdd(!showAdd)}
      >
        {showAdd ? 'Tutup Form Tambah' : 'Tambah Produk'}
      </button>

      {/* Form Tambah Produk */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-4 flex flex-wrap gap-2 items-center bg-gray-50 p-4 rounded">
          <input className="border px-2 py-1 text-black" name="id_produk" placeholder="ID Produk" value={addForm.id_produk} onChange={e => setAddForm({ ...addForm, id_produk: e.target.value })} required />
          <input className="border px-2 py-1 text-black" name="nama_produk" placeholder="Nama Produk" value={addForm.nama_produk} onChange={e => setAddForm({ ...addForm, nama_produk: e.target.value })} required />
          <input className="border px-2 py-1 text-black" name="harga" placeholder="Harga" type="number" value={addForm.harga} onChange={e => setAddForm({ ...addForm, harga: e.target.value })} required />
          <input className="border px-2 py-1 text-black" name="foto" placeholder="Link Gambar" value={addForm.foto} onChange={e => setAddForm({ ...addForm, foto: e.target.value })} required />
          <input className="border px-2 py-1 text-black" name="deskripsi" placeholder="Deskripsi" value={addForm.deskripsi} onChange={e => setAddForm({ ...addForm, deskripsi: e.target.value })} required />
          <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Simpan</button>
        </form>
      )}

      {/* Tabel Produk */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">ID Produk</th>
              <th className="px-6 py-3">Nama Produk</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Gambar</th>
              <th className="px-6 py-3">Deskripsi</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            ) : (
              products.map((p: any) =>
                editId === p.id_produk ? (
                  <tr key={p.id_produk} className="bg-yellow-50">
                    <td className="px-6 py-4">{p.id_produk}</td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full" name="nama_produk" value={editForm.nama_produk} onChange={e => setEditForm({ ...editForm, nama_produk: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full" name="harga" type="number" value={editForm.harga} onChange={e => setEditForm({ ...editForm, harga: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full" name="foto" value={editForm.foto} onChange={e => setEditForm({ ...editForm, foto: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full" name="deskripsi" value={editForm.deskripsi} onChange={e => setEditForm({ ...editForm, deskripsi: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={handleUpdate}>Simpan</button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>Batal</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id_produk}>
                    <td className="px-6 py-4">{p.id_produk}</td>
                    <td className="px-6 py-4">{p.nama_produk}</td>
                    <td className="px-6 py-4">{formatRupiah(p.harga)}</td>
                    <td className="px-6 py-4">
                      <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4">{p.deskripsi}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(p)}>Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(p.id_produk)}>Hapus</button>
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
