import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function StoreProfilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Container hitam transparan */}
      <div className="bg-black/50 rounded-lg p-6 text-center space-y-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold">Store Profile</h1>

        {/* Bagian gambar & logo */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Halaman Depan */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Halaman Depan</h2>
            <div className="relative w-64 h-40 mx-auto">
              <Image
                src="/toko/luartoko.jpg"
                alt="Halaman Depan"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>

          {/* Logo Toko */}
          <div>
            <div className="relative w-40 h-40 mx-auto">
              <Image
                src="/toko/logotokorangga.jpg"
                alt="Store Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Halaman Tengah */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Halaman Tengah</h2>
            <div className="relative w-64 h-40 mx-auto">
              <Image
                src="/toko/dalemtoko.jpg"
                alt="Halaman Tengah"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Deskripsi Toko */}
        <p className="mx-auto max-w-3xl">
          Rangga Gaming Store adalah toko perlengkapan gaming yang menyediakan
          berbagai jenis konsol, keperluan gaming, dan berbagai game terbaru
          dengan harga terjangkau dan dijami Original. Rangga Gaming Store juga menyediakan tempat
          untuk pelanggan mencoba game sebelum dibeli.
        </p>

        {/* Alamat & Kontak */}
        <div className="space-y-1">
          <p className="flex items-center justify-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <span>Mall UAJY Jl. Babarsari, Daerah Istimewa Yogyakarta</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Image
              src="/toko/whatsapp.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className="inline-block"
            />
            <span>081989541821</span>
          </p>
        </div>
      </div>

      <Link href="/profile/anggota">
        <button className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-500">
          Profil Anggota
        </button>
      </Link>
    </div>
  );
}
