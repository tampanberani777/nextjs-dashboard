// app/admin/produk/page.tsx
import ProdukTable from './ProdukTable';

export default async function ProdukPage() {
  await new Promise(res => setTimeout(res, 1000)); // simulasi delay
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Katalog Produk</h1>
      <ProdukTable />
    </div>
  );
}
