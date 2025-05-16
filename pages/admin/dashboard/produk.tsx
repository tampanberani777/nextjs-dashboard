// pages/admin/dashboard/produk.tsx
import { prisma } from '@/lib/prisma'

export default async function ProdukPage() {
  const produkList = await prisma.produk.findMany();

  return (
    <div>
      <h1>Daftar Produk</h1>
      <ul>
        {produkList.map((produk) => (
          <li key={produk.id_produk}>{produk.nama_produk} - Rp{produk.harga}</li>
        ))}
      </ul>
    </div>
  )
}
