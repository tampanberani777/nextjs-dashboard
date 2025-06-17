'use client';

import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export default function KontakKamiPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white py-12 px-6">
            <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Kontak Kami</h1>
                <p className="text-center text-gray-300 mb-10">
                    Jika Anda memiliki pertanyaan, kritik, atau saran, silakan hubungi kami melalui informasi kontak atau formulir berikut.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Informasi Kontak */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-red-400 mt-1" />
                            <div>
                                <h2 className="text-lg font-semibold">Alamat</h2>
                                <p className="text-gray-300">Mall UAJY Jl. Babarsari, Daerah Istimewa Yogyakarta</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="text-green-400 mt-1" />
                            <div>
                                <h2 className="text-lg font-semibold">Telepon</h2>
                                <p className="text-gray-300">081989541821</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-blue-400 mt-1" />
                            <div>
                                <h2 className="text-lg font-semibold">Email</h2>
                                <p className="text-gray-300">support@ranggagamingstore.com</p>
                            </div>
                        </div>
                    </div>
                    {/* Formulir Kontak */}
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Nama</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Pesan</label>
                            <textarea
                                rows={5}
                                required
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
                        >
                            Kirim Pesan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
