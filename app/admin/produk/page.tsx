{/* app/admin/page.tsx */}
import ProdukTable from './ProdukTable';

export default function ProdukPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Katalog Produk</h1>
      <ProdukTable />
    </div>
  );
}
