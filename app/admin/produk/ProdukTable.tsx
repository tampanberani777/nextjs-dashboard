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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => { setIsClient(true); }, []);

  const fetchProducts = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/produk?q=${encodeURIComponent(query)}&page=${page}&limit=${itemsPerPage}`);
      const data = await res.json();
      setProducts(Array.isArray(data.produk) ? data.produk : []);
      setTotalItems(data.total || 0);
    } catch {
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => { if (isClient) fetchProducts(search, currentPage); }, [isClient, currentPage]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => fetchProducts(val, 1), 300);
    setSearchTimer(timer);
    setCurrentPage(1);
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
        fetchProducts(search, currentPage);
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
        fetchProducts(search, currentPage);
      }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`/api/produk/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts(search, currentPage);
    } catch {}
  };

  return (
    <div suppressHydrationWarning>
      {/* Search & Tambah */}
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
              products.map((p) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-white">
          Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage((prev) =>
            prev < Math.ceil(totalItems / itemsPerPage) ? prev + 1 : prev
          )}
          className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
          disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const ProdukTable = dynamic(() => Promise.resolve(ProdukTableComponent), { ssr: false });
export default ProdukTable;
