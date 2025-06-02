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
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/produk${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON! Server returned: " + await response.text());
      }
      
      const data = await response.json();
      console.log('Fetched products:', data);
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && data.error) {
        setError(`API Error: ${data.error}`);
        setProducts([]);
      } else {
        console.error('Unexpected data format:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(`Fetch failed: ${error}`);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);

    if (searchTimer) clearTimeout(searchTimer);

    const timer = setTimeout(() => {
      fetchProducts(val);
    }, 300);

    setSearchTimer(timer);
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

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading indicator */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Tabel Produk */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            ) : (
              products.map((p: any) => (
                <tr key={p.id_produk}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.id_produk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.nama_produk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatRupiah(p.harga)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.deskripsi}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
