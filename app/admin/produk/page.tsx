'use client';

import React, { useState } from 'react';

const initialProducts = [
  {
    id_produk: 'P1',
    nama_produk: 'Headset Gaming 1x',
    harga: 432100,
    foto: 'https://link-gambar-headset.jpg',
    deskripsi: 'Headset gaming berkualitas',
  },
  {
    id_produk: 'P10',
    nama_produk: 'Controller PS4',
    harga: 480000,
    foto: 'https://link-gambar-controller.jpg',
    deskripsi: 'Controller PS4 ergonomis',
  },
  {
    id_produk: 'P11',
    nama_produk: 'Keyboard Blue Switch',
    harga: 300000,
    foto: 'https://link-gambar-blue-switch.jpg',
    deskripsi: 'Keyboard tactile dan clicky',
  },
  {
    id_produk: 'P12',
    nama_produk: 'Keyboard Red Switch',
    harga: 224000,
    foto: 'https://link-gambar-red-switch.jpg',
    deskripsi: 'Keyboard linear dan smooth',
  },
  {
    id_produk: 'P13',
    nama_produk: 'Mouse Wireless Lgi',
    harga: 1100000,
    foto: 'https://link-gambar-mouse.jpg',
    deskripsi: 'Mouse wireless presisi tinggi',
  },
];

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID");
}

export default function ProdukPage() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({
    id_produk: '',
    nama_produk: '',
    harga: '',
    foto: '',
    deskripsi: '',
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Filter produk berdasarkan pencarian
  const filtered = products.filter(
    p =>
      p.id_produk.toLowerCase().includes(search.toLowerCase()) ||
      p.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
      p.deskripsi.toLowerCase().includes(search.toLowerCase())
  );

  // Handler input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id_produk || !form.nama_produk || !form.harga || !form.foto || !form.deskripsi) return;
    setProducts([...products, { ...form, harga: Number(form.harga) }]);
    setForm({ id_produk: '', nama_produk: '', harga: '', foto: '', deskripsi: '' });
  };

  // Edit
  const handleEdit = (p: any) => {
    setEditId(p.id_produk);
    setForm({ ...p, harga: p.harga.toString() });
  };

  // Update
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts(
      products.map(p => (p.id_produk === editId ? { ...form, harga: Number(form.harga) } : p))
    );
    setEditId(null);
    setForm({ id_produk: '', nama_produk: '', harga: '', foto: '', deskripsi: '' });
  };

  // Delete
  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id_produk !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Katalog Produk</h1>

      {/* Form Tambah/Edit */}
      <form onSubmit={editId ? handleUpdate : handleAdd} className="mb-4 flex gap-2 flex-wrap">
        <input className="border px-2 py-1 text-black" name="id_produk" placeholder="ID Produk" value={form.id_produk} onChange={handleChange} disabled={!!editId} />
        <input className="border px-2 py-1 text-black" name="nama_produk" placeholder="Nama Produk" value={form.nama_produk} onChange={handleChange} />
        <input className="border px-2 py-1 text-black" name="harga" placeholder="Harga" type="number" value={form.harga} onChange={handleChange} />
        <input className="border px-2 py-1 text-black" name="foto" placeholder="Link Gambar" value={form.foto} onChange={handleChange} />
        <textarea className="border px-2 py-1 text-black" name="deskripsi" placeholder="Deskripsi" value={form.deskripsi} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editId ? 'Update' : 'Tambah'}
        </button>
        {editId && (
          <button type="button" className="bg-gray-400 text-white px-4 py-1 rounded" onClick={() => { setEditId(null); setForm({ id_produk: '', nama_produk: '', harga: '', foto: '', deskripsi: '' }); }}>
            Batal
          </button>
        )}
      </form>

      {/* Search */}
      <input
        className="border px-2 py-1 mb-2 text-black"
        placeholder="Cari produk..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            ) : (
              filtered.map(p => (
                <tr key={p.id_produk}>
                  <td className="px-6 py-4">{p.id_produk}</td>
                  <td className="px-6 py-4">{p.nama_produk}</td>
                  <td className="px-6 py-4">{formatRupiah(Number(p.harga))}</td>
                  <td className="px-6 py-4">
                    <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4">{p.deskripsi}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(p.id_produk)}>Hapus</button>
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
