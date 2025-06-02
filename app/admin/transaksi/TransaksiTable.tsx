'use client';

import React, { useState, useEffect } from 'react';

function formatRupiah(num: number) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

export default function TransaksiTable() {
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [transaksi, setTransaksi] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
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

  const fetchTransaksi = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/transaksi${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      const data = await res.json();
      
      console.log('Fetched data:', data); // Debug log
      
      // Handle different response formats
      if (Array.isArray(data)) {
        setTransaksi(data);
      } else if (data && Array.isArray(data.rows)) {
        setTransaksi(data.rows);
      } else if (data && data.error) {
        console.error('API Error:', data.error);
        setTransaksi([]);
      } else {
        console.error('Unexpected data format:', data);
        setTransaksi([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setTransaksi([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);

    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    const timer = setTimeout(() => {
      fetchTransaksi(val);
    }, 300);

    setSearchTimer(timer);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/transaksi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...addForm, total_harga: Number(addForm.total_harga) }),
      });
      
      if (res.ok) {
        setAddForm({ id_transaksi: '', id_produk: '', nama_pembeli: '', tanggal_transaksi: '', total_harga: '' });
        setShowAdd(false);
        fetchTransaksi(search);
        alert('Transaksi berhasil ditambahkan');
      } else {
        const errorData = await res.json();
        console.error('Add error:', errorData);
        alert('Gagal menambah transaksi: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Add error:', error);
      alert('Gagal menambah transaksi');
    }
  };

  const handleEdit = (t: any) => {
    setEditId(t.id_transaksi);
    setEditForm({
      id_produk: t.id_produk?.toString() || '',
      nama_pembeli: t.nama_pembeli || '',
      tanggal_transaksi: t.tanggal_transaksi ? t.tanggal_transaksi.split('T')[0] : '',
      total_harga: t.total_harga?.toString() || '',
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/transaksi/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, total_harga: Number(editForm.total_harga) }),
      });
      
      if (res.ok) {
        setEditId(null);
        fetchTransaksi(search);
        alert('Transaksi berhasil diupdate');
      } else {
        const errorData = await res.json();
        console.error('Update error:', errorData);
        alert('Gagal mengupdate transaksi: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Gagal mengupdate transaksi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus transaksi ini?')) return;
    try {
      const res = await fetch(`/api/transaksi/${id}`, { method: 'DELETE' });
      
      if (res.ok) {
        fetchTransaksi(search);
        alert('Transaksi berhasil dihapus');
      } else {
        const errorData = await res.json();
        console.error('Delete error:', errorData);
        alert('Gagal menghapus transaksi: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Gagal menghapus transaksi');
    }
  };

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Cari transaksi..."
        value={search}
        onChange={handleSearchChange}
        className="border px-2 py-1 mb-4 w-full max-w-sm text-black"
      />

      {/* Tombol Tambah */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowAdd(!showAdd)}
      >
        {showAdd ? 'Tutup Form Tambah' : 'Tambah Transaksi'}
      </button>

      {/* Form Tambah */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-4 flex flex-wrap gap-2 items-center bg-gray-50 p-4 rounded">
          <input 
            className="border px-2 py-1 text-black" 
            name="id_transaksi" 
            placeholder="ID Transaksi" 
            value={addForm.id_transaksi} 
            onChange={e => setAddForm({ ...addForm, id_transaksi: e.target.value })} 
            required 
          />
          <input 
            className="border px-2 py-1 text-black" 
            name="id_produk" 
            placeholder="ID Produk" 
            value={addForm.id_produk} 
            onChange={e => setAddForm({ ...addForm, id_produk: e.target.value })} 
            required 
          />
          <input 
            className="border px-2 py-1 text-black" 
            name="nama_pembeli" 
            placeholder="Nama Pembeli" 
            value={addForm.nama_pembeli} 
            onChange={e => setAddForm({ ...addForm, nama_pembeli: e.target.value })} 
            required 
          />
          <input 
            className="border px-2 py-1 text-black" 
            name="tanggal_transaksi" 
            type="date" 
            placeholder="Tanggal Transaksi" 
            value={addForm.tanggal_transaksi} 
            onChange={e => setAddForm({ ...addForm, tanggal_transaksi: e.target.value })} 
            required 
          />
          <input 
            className="border px-2 py-1 text-black" 
            name="total_harga" 
            placeholder="Total Harga" 
            type="number" 
            value={addForm.total_harga} 
            onChange={e => setAddForm({ ...addForm, total_harga: e.target.value })} 
            required 
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Simpan</button>
        </form>
      )}

      {/* Loading indicator */}
      {loading && <div className="text-center py-4 text-white">Loading...</div>}

      {/* Tabel */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Transaksi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pembeli</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Transaksi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(transaksi) && transaksi.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  {loading ? 'Loading...' : 'Tidak ada transaksi ditemukan.'}
                </td>
              </tr>
            ) : (
              Array.isArray(transaksi) && transaksi.map((t: any) =>
                editId === t.id_transaksi ? (
                  <tr key={t.id_transaksi} className="bg-yellow-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.id_transaksi}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        className="border px-2 py-1 w-full text-black" 
                        name="id_produk" 
                        value={editForm.id_produk} 
                        onChange={e => setEditForm({ ...editForm, id_produk: e.target.value })} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        className="border px-2 py-1 w-full text-black" 
                        name="nama_pembeli" 
                        value={editForm.nama_pembeli} 
                        onChange={e => setEditForm({ ...editForm, nama_pembeli: e.target.value })} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        className="border px-2 py-1 w-full text-black" 
                        name="tanggal_transaksi" 
                        type="date" 
                        value={editForm.tanggal_transaksi} 
                        onChange={e => setEditForm({ ...editForm, tanggal_transaksi: e.target.value })} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        className="border px-2 py-1 w-full text-black" 
                        name="total_harga" 
                        type="number" 
                        value={editForm.total_harga} 
                        onChange={e => setEditForm({ ...editForm, total_harga: e.target.value })} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={handleUpdate}>
                        Simpan
                      </button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>
                        Batal
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={t.id_transaksi}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.id_transaksi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.id_produk}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.nama_pembeli}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {t.tanggal_transaksi ? new Date(t.tanggal_transaksi).toLocaleDateString('id-ID') : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatRupiah(t.total_harga)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-yellow-400 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(t)}>
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
