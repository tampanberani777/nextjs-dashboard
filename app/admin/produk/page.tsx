'use client'
import { useState } from "react"

const initialProducts = [
  { id_produk: "P1", nama_produk: "Headset Gaming 1x", harga: 400000, foto: "/products/headset 1.jpg", deskripsi: "Headset gaming berkualitas..." },
  { id_produk: "P10", nama_produk: "Controller PS4", harga: 480000, foto: "/products/controller 2.jpg", deskripsi: "Controller PS4 ergonomis..." },
  { id_produk: "P11", nama_produk: "Keyboard Blue Switch", harga: 300000, foto: "/products/keyboard1.jpg", deskripsi: "Keyboard tactile dan clicky..." },
  { id_produk: "P12", nama_produk: "Keyboard Red Switch", harga: 224000, foto: "/products/keyboard 2.jpg", deskripsi: "Keyboard linear dan smooth..." },
  { id_produk: "P13", nama_produk: "Mouse Wireless Lgi", harga: 110000, foto: "/products/mouse 1.jpg", deskripsi: "Mouse wireless presisi..." },
  { id_produk: "P14", nama_produk: "Mouse", harga: 100000, foto: "/products/mouse 2.jpg", deskripsi: "Mouse basic untuk kebutuhan umum." },
  { id_produk: "P15", nama_produk: "Mouse Wireless", harga: 300000, foto: "/products/mouse 3.jpg", deskripsi: "Mouse wireless hemat baterai." },
  { id_produk: "P2", nama_produk: "Headset Gaming 2y", harga: 500000, foto: "/products/headset 2.jpg", deskripsi: "Headset dengan suara jernih." },
  { id_produk: "P3", nama_produk: "Headset Wireless 2r", harga: 1100000, foto: "/products/headset 3.jpg", deskripsi: "Headset wireless dengan bass mantap." },
  { id_produk: "P4", nama_produk: "Xbox xr", harga: 7000000, foto: "/products/xbox x.jpg", deskripsi: "Konsol next-gen dengan grafis tinggi." },
  { id_produk: "P5", nama_produk: "Sony Playstation 5", harga: 8500000, foto: "/products/ps5.jpg", deskripsi: "Konsol PS5 dengan performa tinggi." },
  { id_produk: "P6", nama_produk: "Xbox Series S 512GB", harga: 5700000, foto: "/products/xbox s.jpg", deskripsi: "Xbox ringkas untuk gaming modern." },
  { id_produk: "P7", nama_produk: "Virtual Reality", harga: 5000000, foto: "/products/vr.jpg", deskripsi: "Headset VR immersive dengan tracking akurat." },
  { id_produk: "P8", nama_produk: "Nitendo Switch", harga: 4000000, foto: "/products/nitendo.jpg", deskripsi: "Konsol portable dari Nintendo." },
  { id_produk: "P9", nama_produk: "Controller PS5", harga: 550000, foto: "/products/controller 1.jpg", deskripsi: "Controller original PS5." },
]

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID")
}

export default function ProdukPage() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const filtered = products.filter(p =>
    p.id_produk.toLowerCase().includes(search.toLowerCase()) ||
    p.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
    p.deskripsi.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id_produk: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      setProducts(products.filter(p => p.id_produk !== id_produk))
    }
  }

  const handleEdit = (prod: any) => {
    setEditing(prod)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const handleSave = (prod: any) => {
    if (editing) {
      setProducts(products.map(p => p.id_produk === prod.id_produk ? prod : p))
    } else {
      if (products.find(p => p.id_produk === prod.id_produk)) {
        alert("ID produk sudah ada!")
        return
      }
      setProducts([...products, prod])
    }
    setModalOpen(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Katalog Produk</h1>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <input
          type="text"
          placeholder="Cari produk (nama, deskripsi, ID)..."
          className="p-2 border border-gray-400 rounded w-full max-w-md text-gray-900"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        >
          Tambah Produk
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            )}
            {filtered.map(p => (
              <tr key={p.id_produk}>
                <td className="px-6 py-4">{p.id_produk}</td>
                <td className="px-6 py-4">{p.nama_produk}</td>
                <td className="px-6 py-4">{formatRupiah(p.harga)}</td>
                <td className="px-6 py-4">
                  <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4">{p.deskripsi}</td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => handleEdit(p)} className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white">Edit</button>
                  <button onClick={() => handleDelete(p.id_produk)} className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <ProductModal
          product={editing}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

function ProductModal({ product, onClose, onSave }: { product: any, onClose: () => void, onSave: (p: any) => void }) {
  const [id_produk, setId] = useState(product?.id_produk || "")
  const [nama_produk, setNama] = useState(product?.nama_produk || "")
  const [harga, setHarga] = useState(product?.harga || 0)
  const [foto, setFoto] = useState(product?.foto || "")
  const [deskripsi, setDeskripsi] = useState(product?.deskripsi || "")

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{product ? "Edit Produk" : "Tambah Produk"}</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">ID Produk</label>
            <input type="text" className="w-full border border-gray-300 rounded p-2" value={id_produk} onChange={e => setId(e.target.value)} disabled={!!product} />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Nama Produk</label>
            <input type="text" className="w-full border border-gray-300 rounded p-2" value={nama_produk} onChange={e => setNama(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Harga</label>
            <input type="number" className="w-full border border-gray-300 rounded p-2" value={harga} onChange={e => setHarga(Number(e.target.value))} min={0} />
          </div>
          <div>
            <label className="block mb-1 font-semibold">URL Gambar</label>
            <input type="text" className="w-full border border-gray-300 rounded p-2" value={foto} onChange={e => setFoto(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Deskripsi</label>
            <textarea className="w-full border border-gray-300 rounded p-2" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} rows={3} />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded border-gray-400 hover:bg-gray-100">Batal</button>
          <button onClick={() => onSave({ id_produk, nama_produk, harga, foto, deskripsi })} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan</button>
        </div>
      </div>
    </div>
  )
}
