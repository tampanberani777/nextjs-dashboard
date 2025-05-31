'use client';

import React, { useState } from 'react';

function formatRupiah(num: number) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

export default function ProdukTable({ products }: { products: any[] }) {
  // Tambahkan fitur edit & hapus di sini sesuai kebutuhan
  return (
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
            products.map((p: any) => (
              <tr key={p.id_produk}>
                <td className="px-6 py-4">{p.id_produk}</td>
                <td className="px-6 py-4">{p.nama_produk}</td>
                <td className="px-6 py-4">{formatRupiah(p.harga)}</td>
                <td className="px-6 py-4">
                  <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4">{p.deskripsi}</td>
                <td className="px-6 py-4 flex gap-2">
                  {/* Tambahkan tombol Edit & Hapus di sini */}
                  <button className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
