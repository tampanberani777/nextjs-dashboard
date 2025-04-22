import Image from 'next/image';

export default function TestimoniPage() {
  const testimonials = [
    {
      name: 'Harga Gacor!',
      review: 'Toko ini memiliki koleksi game dan aksesoris terlengkap dengan harga bersaing.',
      rating: 5,
      image: '/testimoni/profilganteng.jpg',
    },
    {
      name: 'Mantappp!',
      review: 'Rangga Gaming Store adalah tempat favorit saya untuk beli aksesoris gaming.',
      rating: 5,
      image: '/testimoni/aplh.jpg',
    },
    {
      name: 'Pelayanan Ramah!',
      review: 'Pelayanan sangat ramah, fast respon, pengiriman juga cepat!',
      rating: 5,
      image: '/testimoni/bapailang.jpg',
    },
  ];

  return (
    <div className="text-center py-12 px-4">
      <h2 className="text-4xl font-bold mb-12 font-serif">Testimoni Pelanggan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((item, idx) => (
          <div key={idx} className="bg-black bg-opacity-80 rounded-xl shadow-xl p-6 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <div className="mb-2 text-gray-300">{Array(item.rating).fill('⭐').join(' ')}</div>
            <h3 className="text-lg font-bold mb-2">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}