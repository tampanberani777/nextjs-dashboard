"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { createClient } from '@supabase/supabase-js'

// // Initialize Supabase client for Neon PostgreSQL
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
// const supabase = createClient(supabaseUrl, supabaseKey)

interface Product {
  id_produk_produk: string
  nama_produk: string
  harga: number
  foto: string
  deskripsi: string
  created_at: string
}

interface Transaction {
  id_produk: string
  date: string
  customer: string
  items: {
    productid_produk: string
    nama_produk: string
    quantity: number
    harga: number
  }[]
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Fetch products from Neon
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      alert('Error loading products')
    } finally {
      setLoading(false)
    }
  }

  // Fetch transactions from Neon
  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTransactions(data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
      alert('Error loading transactions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchTransactions()
  }, [])

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [transactionSearch, setTransactionSearch] = useState('')

  const filteredProducts = products.filter((p) =>
    p.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredTransactions = transactions.filter(t =>
    t.id_produk.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    t.customer.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    t.status.toLowerCase().includes(transactionSearch.toLowerCase())
  )

  const handleAddProduct = () => {
    setEditingProduct(null)
    setModalOpen(true)
  }

  const handleUpdateProduct = (product: Product) => {
    setEditingProduct(product)
    setModalOpen(true)
  }

  const handleSubmitProduct = async (newProduct: Product) => {
    try {
      setLoading(true)
      if (editingProduct) {
        // Update existing product
        const { data, error } = await supabase
          .from('products')
          .update({
            nama_produk: newProduct.nama_produk,
            harga: newProduct.harga,
            foto: newProduct.foto,
            description: newProduct.deskripsi,
          })
          .eq('id', editing.id_produk)
          .select()

        if (error) throw error
        setProducts(products.map(p => p.id_produk === editing.id_produk ? data![0] : p))
      } else {
        // Add new product
        const { data, error } = await supabase
          .from('products')
          .insert([{
            id: newProduct.id_produk,
            name: newProduct.nama_produk,
            harga: newProduct.harga,
            foto: newProduct.foto,
            description: newProduct.deskripsi,
            // created_at otomatis oleh DB, jangan diset manual
          }])
          .select()

        if (error) throw error
        setProducts([data![0], ...products])
      }
      setModalOpen(false)
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = confirm('Yakin hapus produk ini?')
    if (!confirmDelete) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      setProducts(products.filter(p => p.id_produk !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product')
    } finally {
      setLoading(false)
    }
  }

  const handleShowDetail = (product: Product) => {
    alert(
      `Detail Produk:\n\nNama: ${nama_produk}\nHarga: Rp ${product.harga.toLocaleString('id-ID')}\nDeskripsi: ${product.deskripsi}`
    )
  } 

  const handleShowTransactionDetail = (transaction: Transaction) => {
    const itemsList = transaction.items.map(item => 
      `${item.nama_produk} (${item.quantity} x Rp ${item.harga.toLocaleString('id-ID')})`
    ).join('\n')
    
    alert(
      `Detail Transaksi:\n\nID: ${transaction.id}\nTanggal: ${transaction.date}\nPelanggan: ${transaction.customer}\nStatus: ${transaction.status}\n\nItems:\n${itemsList}\n\nTotal: Rp ${transaction.total.toLocaleString('id-ID')}`
    )
  }

  const handleUpdateTransactionStatus = async (id: string, newStatus: Transaction['status']) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('transactions')
        .update({ status: newStatus })a
        .eq('id', id)
        .select()

      if (error) throw error
      setTransactions(transactions.map(t => t.id_produk === id ? data![0] : t))
    } catch (error) {
      console.error('Error updating transaction:', error)
      alert('Error updating transaction status')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToMain = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded ${activeTab === 'transactions' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Transaksi
            </button>
          </div>
          <button
            onClick={handleBackToMain}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-white">Loading...</p>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full md:w-1/2 bg-gray-800 border border-gray-700 p-2 rounded text-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleAddProduct}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
              >
                Tambah Produk
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-200">
                <thead className="bg-gray-700 text-gray-100">
                  <tr>
                    <th className="px-4 py-2">ID Barang</th>
                    <th className="px-4 py-2">Nama Barang</th>
                    <th className="px-4 py-2">Harga</th>
                    <th className="px-4 py-2">Gambar</th>
                    <th className="px-4 py-2">Pilihan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={id_produk} className="border-b border-gray-700">
                      <td className="px-4 py-2">{id_produk}</td>
                      <td className="px-4 py-2">{nama_produk}</td>
                      <td className="px-4 py-2">
                        Rp {product.harga.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={product.foto}
                          alt={nama_produk}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleShowDetail(product)}
                          className="bg-cyan-600 hover:bg-cyan-700 px-2 py-1 rounded"
                        >
                          Tampil
                        </button>
                        <button
                          onClick={() => handleUpdateProduct(product)}
                          className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(id_produk)}
                          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <p className="text-center mt-4">Tidak ada produk ditemukan.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Cari transaksi..."
              className="w-full md:w-1/3 bg-gray-800 border border-gray-700 p-2 rounded text-gray-100"
              value={transactionSearch}
              onChange={(e) => setTransactionSearch(e.target.value)}
            />

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-200">
                <thead className="bg-gray-700 text-gray-100">
                  <tr>
                    <th className="px-4 py-2">ID Transaksi</th>
                    <th className="px-4 py-2">Tanggal</th>
                    <th className="px-4 py-2">Pelanggan</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-700">
                      <td className="px-4 py-2">{transaction.id}</td>
                      <td className="px-4 py-2">{transaction.date}</td>
                      <td className="px-4 py-2">{transaction.customer}</td>
                      <td className="px-4 py-2">
                        Rp {transaction.total.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-2 capitalize">{transaction.status}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleShowTransactionDetail(transaction)}
                          className="bg-cyan-600 hover:bg-cyan-700 px-2 py-1 rounded"
                        >
                          Detail
                        </button>
                        {transaction.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateTransactionStatus(transaction.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
                          >
                            Tandai Selesai
                          </button>
                        )}
                        {transaction.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateTransactionStatus(transaction.id, 'cancelled')}
                            className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                          >
                            Batalkan
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTransactions.length === 0 && (
                <p className="text-center mt-4">Tidak ada transaksi ditemukan.</p>
              )}
            </div>
          </div>
        )}

        {/* Modal Tambah / Update Produk */}
        {modalOpen && (
          <ProductModal
            product={editingProduct}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmitProduct}
          />
        )}
      </div>
    </div>
  )
}

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onSubmit: (product: Product) => void
}

function ProductModal({ product, onClose, onSubmit }: ProductModalProps) {
  const [id, setId] = useState(product?.id_produk || '')
  const [name, setName] = useState(product?.nama_produk || '')
  const [harga, setharga] = useState(product?.harga.toString() || '0')
  const [foto, setfoto] = useState(product?.foto || '')
  const [description, setDescription] = useState(product?.deskripsi|| '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !name || !harga || !foto) {
      alert('Isi semua field yang wajib!')
      return
    }
    const hargaNumber = parseInt(harga)
    if (isNaN(hargaNumber) || hargaNumber < 0) {
      alert('Harga harus berupa angka positif')
      return
    }
    onSubmit({
      id_,
      name,
      harga: hargaNumber,
      foto,
      description,
      created_at: product?.created_at || new Date().toISOString(),
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded p-6 w-full max-w-md">
        <h2 className="text-xl mb-4">{product ? 'Update Produk' : 'Tambah Produk'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">id_produk Barang</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
              value={id_produk}
              onChange={e => setid_produk(e.target.value)}
              disabled={!!product}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Nama Barang</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Harga</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
              value={harga}
              onChange={e => setharga(e.target.value)}
              min={0}
              required
            />
          </div>
          <div>
            <label className="block mb-1">URL Gambar</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
              value={foto}
              onChange={e => setfoto(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Deskripsi</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              {product ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
