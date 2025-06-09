'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

function formatRupiah(num) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

function ProdukTableComponent() {
  const [searchTimer, setSearchTimer] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [editId, setEditId] = useState(null);
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

  useEffect(() => { setIsClient(true); }, []);

  const fetchProducts = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/produk${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch { setProducts([]); }
    setLoading(false);
  };

  useEffect(() => { if (isClient) fetchProducts(); }, [isClient]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => fetchProducts(val), 300);
    setSearchTimer(timer);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/produk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...addForm, harga: Number(addForm.harga) }),
      });
      if (res.ok) {
        setAddForm({ id_produk: '', nama_produk: '', harga: '', foto: '', deskripsi: '' });
        setShowAdd(false);
        fetchProducts(search);
      }
    } catch {}
  };

  const handleEdit = (p) => {
    setEditId(p.id_produk);
    setEditForm({
      nama_produk: p.nama_produk,
      harga: p.harga.toString(),
      foto: p.foto,
      deskripsi: p.deskripsi,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/produk/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, harga: Number(editForm.harga) }),
      });
      if (res.ok) {
        setEditId(null);
        fetchProducts(search);
      }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`/api/produk/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts(search);
    } catch {}
  };

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
      {/* Search & Tombol Tambah */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-64 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow transition"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Tutup Formulir' : 'Tambah Produk'}
        </button>
      </div>

      {/* Form Tambah Produk */}
      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="mb-6 max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Tambah Produk Baru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-600">ID Produk</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ID Produk"
                value={addForm.id_produk}
                onChange={e => setAddForm({ ...addForm, id_produk: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-600">Nama Produk</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nama Produk"
                value={addForm.nama_produk}
                onChange={e => setAddForm({ ...addForm, nama_produk: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-600">Harga</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Harga"
                type="number"
                value={addForm.harga}
                onChange={e => setAddForm({ ...addForm, harga: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-600">Link Gambar</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Link Gambar"
                value={addForm.foto}
                onChange={e => setAddForm({ ...addForm, foto: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm text-gray-600">Deskripsi</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Deskripsi"
                value={addForm.deskripsi}
                onChange={e => setAddForm({ ...addForm, deskripsi: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold shadow transition"
            >
              Simpan
            </button>
          </div>
        </form>
      )}

      {/* Loading */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Tabel Produk */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center">ID Produk</th>
              <th className="px-6 py-3 text-left">Nama Produk</th>
              <th className="px-6 py-3 text-center">Harga</th>
              <th className="px-6 py-3 text-center">Gambar</th>
              <th className="px-6 py-3 text-left">Deskripsi</th>
              <th className="px-6 py-3 text-center">Aksi</th>
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
              products.map((p) =>
                editId === p.id_produk ? (
                  <tr key={p.id_produk} className="bg-yellow-50">
                    <td className="px-6 py-4 text-center">{p.id_produk}</td>
                    <td className="px-6 py-4 text-left">
                      <input className="border px-2 py-1 w-full text-black rounded" value={editForm.nama_produk} onChange={e => setEditForm({ ...editForm, nama_produk: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input className="border px-2 py-1 w-full text-black rounded" type="number" value={editForm.harga} onChange={e => setEditForm({ ...editForm, harga: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <input className="border px-2 py-1 w-full text-black rounded" value={editForm.foto} onChange={e => setEditForm({ ...editForm, foto: e.target.value })} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <input className="border px-2 py-1 w-full text-black rounded" value={editForm.deskripsi} onChange={e => setEditForm({ ...editForm, deskripsi: e.target.value })} />
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={handleUpdate}>Simpan</button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>Batal</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id_produk}>
                    <td className="px-6 py-4 text-center">{p.id_produk}</td>
                    <td className="px-6 py-4 text-left">{p.nama_produk}</td>
                    <td className="px-6 py-4 text-center">{formatRupiah(p.harga)}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-left">{p.deskripsi}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow transition" onClick={() => handleEdit(p)}>
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition" onClick={() => handleDelete(p.id_produk)}>
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

const ProdukTable = dynamic(() => Promise.resolve(ProdukTableComponent), {
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

export default ProdukTable;
