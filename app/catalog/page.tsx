















































































// 'use client';

// import { useState } from 'react';

// export default function CatalogPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [detailMessage, setDetailMessage] = useState<{ name: string; price: number; description: string; image: string } | null>(null);

//   const products = [
//     { id: 'P1', name: 'Headset Gaming 1x', price: 400000, image: '/products/headset 1.jpg', description: 'Headset gaming berkualitas' },
//     { id: 'P2', name: 'Headset Gaming 2y', price: 500000, image: '/products/headset 2.jpg', description: 'Headset dengan suara jernih' },
//     { id: 'P3', name: 'Headset Wireless 2r', price: 1100000, image: '/products/headset 3.jpg', description: 'Headset wireless dengan baterai tahan lama' },
//     { id: 'P4', name: 'Xbox Series X 1TB', price: 7000000, image: '/products/xbox x.jpg', description: 'Konsol next-gen dengan penyimpanan besar' },
//     { id: 'P5', name: 'Sony Playstation 5', price: 8500000, image: '/products/ps5.jpg', description: 'Konsol PS5 dengan performa tinggi' },
//     { id: 'P6', name: 'Xbox Series S 512GB', price: 5700000, image: '/products/xbox s.jpg', description: 'Xbox ringkas untuk gaming' },
//     { id: 'P7', name: 'Virtual Reality', price: 5000000, image: '/products/vr.jpg', description: 'Headset VR immersive dan tajam' },
//     { id: 'P8', name: 'Nitendo Switch', price: 4000000, image: '/products/nitendo.jpg', description: 'Konsol portable dari Nintendo' },
//     { id: 'P9', name: 'Controller PS5', price: 550000, image: '/products/controller 1.jpg', description: 'Controller original PS5' },
//     { id: 'P10', name: 'Controller PS4', price: 480000, image: '/products/controller 2.jpg', description: 'Controller PS4 ergonomis' },
//     { id: 'P11', name: 'Keyboard Blue Switch', price: 300000, image: '/products/keyboard1.jpg', description: 'Keyboard tactile dan clicky' },
//     { id: 'P12', name: 'Keyboard Red Switch', price: 224000, image: '/products/keyboard 2.jpg', description: 'Keyboard linear dan smooth' },
//     { id: 'P13', name: 'Mouse Wireless Lgi', price: 1100000, image: '/products/mouse 1.jpg', description: 'Mouse wireless presisi tinggi' },
//     { id: 'P14', name: 'Mouse', price: 100000, image: '/products/mouse 2.jpg', description: 'Mouse basic untuk kebutuhan harian' },
//     { id: 'P15', name: 'Mouse Wireless', price: 300000, image: '/products/mouse 3.jpg', description: 'Mouse wireless hemat baterai' },
//   ];

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleDetailClick = (product: { name: string; price: number; description: string; image: string }) => {
//     setDetailMessage(product); // Update to include image data
//   };

//   return (
//     <div className="p-4 min-h-screen bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white"> {/* Updated background gradient */}
//       <div className="flex justify-end mb-4">
//         <input
//           type="text"
//           placeholder="Cari"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-black bg-opacity-50 rounded-xl shadow-xl p-6 flex flex-col items-center"
//           >
//             <div className="w-full h-40 flex items-center justify-center mb-2">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="object-contain max-h-full rounded"
//               />
//             </div>

//             <h2 className="text-lg font-bold text-center">{product.name}</h2>
//             <p className="text-gray-300 mb-2">Rp {product.price.toLocaleString('id-ID')}</p>

//             <button
//               onClick={() => handleDetailClick(product)}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//             >
//               Detail
//             </button>
//           </div>
//         ))}
//       </div>

//       {detailMessage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="p-4 w-1/3 bg-gradient-to-b from-[#1e1f29] to-[#312c49] text-white rounded-xl shadow-xl">
//             <div className="w-full h-40 flex items-center justify-center mb-4">
//               <img
//                 src={detailMessage.image}
//                 alt={detailMessage.name}
//                 className="object-contain max-h-full rounded"
//               />
//             </div>
//             <p className="whitespace-pre-line text-sm mb-6">{detailMessage.name} merupakan {detailMessage.description} dengan harga Rp {detailMessage.price.toLocaleString('id-ID')}</p>
//             <div className="flex justify-center">
//               <button
//                 onClick={() => setDetailMessage(null)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//               >
//                 Tutup
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
