'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

function formatRupiah(num: number) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function ProdukTableComponent() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchProducts = async (query = '', page = 1) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/produk?q=${encodeURIComponent(query)}&page=${page}`);
    const json = await res.json();

    // Sort produk berdasarkan ID produk (angka di dalamnya)
    const sorted = (json.data || []).sort((a: any, b: any) => {
      const extractIdNumber = (id: string) => parseInt(id.replace(/\D/g, '') || '0');
      return extractIdNumber(a.id_produk) - extractIdNumber(b.id_produk);
    });

    setProducts(sorted);
    setTotalPages(Math.ceil(json.total / 5));
  } catch {
    setProducts([]);
    setTotalPages(1);
  }
  setLoading(false);
};


  useEffect(() => {
    if (isClient) fetchProducts(search, currentPage);
  }, [isClient, currentPage]);

  useEffect(() => {
    if (showAdd) {
      const lastNumericId = products
        .map((p: any) => parseInt(p.id_produk?.replace(/\D/g, '') || '0'))
        .filter((n) => !isNaN(n));

      const nextNumber = lastNumericId.length > 0 ? Math.max(...lastNumericId) + 1 : 1;
      const nextId = 'P' + String(nextNumber).padStart(3, '0');

      setAddForm({
        id_produk: nextId,
        nama_produk: '',
        harga: '',
        foto: '',
        deskripsi: '',
      });
    }
  }, [showAdd]);

  const isDuplicate = () => {
    const idExists = products.some((p: any) => p.id_produk === addForm.id_produk);
    const nameExists = products.some((p: any) => p.nama_produk.toLowerCase() === addForm.nama_produk.toLowerCase());
    return { idExists, nameExists };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    setCurrentPage(1);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => fetchProducts(val, 1), 300);
    setSearchTimer(timer);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const { idExists, nameExists } = isDuplicate();
    if (idExists) {
      alert('ID Produk sudah digunakan!');
      return;
    }
    if (nameExists) {
      alert('Nama produk sudah ada. Harap gunakan nama yang berbeda.');
      return;
    }

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
    } catch (error) {
      console.error('Gagal menambahkan produk:', error);
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
        fetchProducts(search, currentPage);
      } else {
        const error = await res.json();
        console.error('Gagal update produk:', error);
      }
    } catch (error) {
      console.error('Error saat update:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`/api/produk/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts(search, currentPage);
    } catch (error) {
      console.error('Error saat menghapus:', error);
    }
  };

  return (
    <div>
      {/* Search & Add Button */}
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

      {/* Add Form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-6 max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Tambah Produk Baru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="ID Produk Otomatis"
              value={addForm.id_produk}
              readOnly
              className="border border-gray-300 bg-gray-100 text-gray-500 rounded-md px-3 py-2 w-full"
            />
            <input placeholder="Nama Produk" value={addForm.nama_produk} onChange={e => setAddForm({ ...addForm, nama_produk: e.target.value })} required className="border border-gray-300 rounded-md px-3 py-2 w-full text-black" />
            <input placeholder="Harga" type="number" value={addForm.harga} onChange={e => setAddForm({ ...addForm, harga: e.target.value })} required className="border border-gray-300 rounded-md px-3 py-2 w-full text-black" />
            <input placeholder="Link Gambar" value={addForm.foto} onChange={e => setAddForm({ ...addForm, foto: e.target.value })} required className="border border-gray-300 rounded-md px-3 py-2 w-full text-black" />
            <input placeholder="Deskripsi" value={addForm.deskripsi} onChange={e => setAddForm({ ...addForm, deskripsi: e.target.value })} required className="border border-gray-300 rounded-md px-3 py-2 w-full md:col-span-2 text-black" />
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold shadow transition">Simpan</button>
          </div>
        </form>
      )}
      {/* Table */}
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200 text-gray-900">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-black">ID Produk</th>
                <th className="px-6 py-3 text-left text-black">Nama Produk</th>
                <th className="px-6 py-3 text-center text-black">Harga</th>
                <th className="px-6 py-3 text-center text-black">Gambar</th>
                <th className="px-6 py-3 text-left text-black">Deskripsi</th>
                <th className="px-6 py-3 text-center text-black">Aksi</th>
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
                products.map((p: any) => (
                  <tr key={p.id_produk}>
                    <td className="px-6 py-4 text-center">{p.id_produk}</td>
                    <td className="px-6 py-4 text-left">
                      {editId === p.id_produk ? (
                        <input value={editForm.nama_produk} onChange={e => setEditForm({ ...editForm, nama_produk: e.target.value })} className="border px-2 py-1 w-full text-black rounded" />
                      ) : p.nama_produk}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editId === p.id_produk ? (
                        <input type="number" value={editForm.harga} onChange={e => setEditForm({ ...editForm, harga: e.target.value })} className="border px-2 py-1 w-full text-black rounded" />
                      ) : formatRupiah(p.harga)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {editId === p.id_produk ? (
                          <input value={editForm.foto} onChange={e => setEditForm({ ...editForm, foto: e.target.value })} className="border px-2 py-1 w-full text-black rounded" />
                        ) : (
                          <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-left">
                      {editId === p.id_produk ? (
                        <input value={editForm.deskripsi} onChange={e => setEditForm({ ...editForm, deskripsi: e.target.value })} className="border px-2 py-1 w-full text-black rounded" />
                      ) : p.deskripsi}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      {editId === p.id_produk ? (
                        <>
                          <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={handleUpdate}>Simpan</button>
                          <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>Batal</button>
                        </>
                      ) : (
                        <>
                          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow transition" onClick={() => handleEdit(p)}>Edit</button>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition" onClick={() => handleDelete(p.id_produk)}>Hapus</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 text-black">
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded ${i + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 text-black">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

const ProdukTable = dynamic(() => Promise.resolve(ProdukTableComponent), { ssr: false });
export default ProdukTable;
