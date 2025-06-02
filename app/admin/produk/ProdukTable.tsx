'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

function formatRupiah(num: number) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

function ProdukTableComponent() {
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
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

  // Fix hydration dengan useEffect
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchProducts = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/produk${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isClient) {
      fetchProducts();
    }
  }, [isClient]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);

    if (searchTimer) clearTimeout(searchTimer);

    const timer = setTimeout(() => {
      fetchProducts(val);
    }, 300);

    setSearchTimer(timer);
  };

  const handleAdd = async (e: React.FormEvent) => {
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
    } catch (error) {
      console.error('Add error:', error);
    }
  };

  const handleEdit = (p: any) => {
    setEditId(p.id_produk);
    setEditForm({
      nama_produk: p.nama_produk,
      harga: p.harga.toString(),
      foto: p.foto,
      deskripsi: p.deskripsi,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
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
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`/api/produk/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts(search);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Loading state selama hydration
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
      {/* Search Input */}
      <input
        type="text"
        placeholder="Cari produk..."
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
        {showAdd ? 'Tutup Form Tambah' : 'Tambah Produk'}
      </button>

      {/* Form Tambah */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-4 flex flex-wrap gap-2 items-center bg-gray-50 p-4 rounded">
          <input className="border px-2 py-1 text-black" placeholder="ID Produk" value={addForm.id_produk} onChange={e => setAddForm({ ...addForm, id_produk: e.target.value })} required />
          <input className="border px-2 py-1 text-black" placeholder="Nama Produk" value={addForm.nama_produk} onChange={e => setAddForm({ ...addForm, nama_produk: e.target.value })} required />
          <input className="border px-2 py-1 text-black" placeholder="Harga" type="number" value={addForm.harga} onChange={e => setAddForm({ ...addForm, harga: e.target.value })} required />
          <input className="border px-2 py-1 text-black" placeholder="Link Gambar" value={addForm.foto} onChange={e => setAddForm({ ...addForm, foto: e.target.value })} required />
          <input className="border px-2 py-1 text-black" placeholder="Deskripsi" value={addForm.deskripsi} onChange={e => setAddForm({ ...addForm, deskripsi: e.target.value })} required />
          <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Simpan</button>
        </form>
      )}

      {/* Loading */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Tabel */}
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
                      <input className="border px-2 py-1 w-full text-black" value={editForm.nama_produk} onChange={e => setEditForm({ ...editForm, nama_produk: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full text-black" type="number" value={editForm.harga} onChange={e => setEditForm({ ...editForm, harga: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full text-black" value={editForm.foto} onChange={e => setEditForm({ ...editForm, foto: e.target.value })} />
                    </td>
                    <td className="px-6 py-4">
                      <input className="border px-2 py-1 w-full text-black" value={editForm.deskripsi} onChange={e => setEditForm({ ...editForm, deskripsi: e.target.value })} />
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
                      <button className="bg-yellow-400 text-white px-2 py-1 rounded" onClick={() => handleEdit(p)}>Edit</button>
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

// Export dengan dynamic import untuk disable SSR
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
