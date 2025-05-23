import { fetchProducts, Product } from '@/app/lib/fetchData';

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID");
}

export default async function ProdukPage() {
  const products: Product[] = await fetchProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Katalog Produk</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">ID Produk</th>
              <th className="px-6 py-3">Nama Produk</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Gambar</th>
              <th className="px-6 py-3">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id_produk}>
                <td className="px-6 py-4">{p.id_produk}</td>
                <td className="px-6 py-4">{p.nama_produk}</td>
                <td className="px-6 py-4">{formatRupiah(p.harga)}</td>
                <td className="px-6 py-4">
                  <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4">{p.deskripsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
