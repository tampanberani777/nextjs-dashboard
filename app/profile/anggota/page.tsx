import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";


const teamProfiles = [
  {
    npm: "231712534",
    name: "Daniel Suryo Putro Wicaksono",
    desc: "Seorang mahasiswa pengembara dari planet Bekasi yang siap membantai seluruh kesulitan MATKUL",
    img: "/team/profil1.jpg",
  },
  {
    npm: "231712546",
    name: "Moh. Akbar Mahardika Yunus",
    desc: "Mahasiswa andalan para Rektor, Dosen, dan Asdos (Asisten Dosen)",
    img: "/team/profil2.jpg",
  },
  {
    npm: "231712356",
    name: "Andreas Rengga Ananda",
    desc: "Mahasiswa tampan dan pemberani siap menuntas kuliah demi mimpi mamah",
    img: "/team/profil3.jpg",
  },
];

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white">
      <div className="text-center py-12 px-4">
        <h2 className="text-4xl font-bold mb-12 font-serif">Our Team Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamProfiles.map((member, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-80 rounded-xl shadow-xl p-6 flex flex-col items-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-md mb-4"
              />
              <p className="text-sm mb-1 font-mono">{member.npm}</p>
              <h3 className="text-lg font-bold mb-2 font-sans">{member.name}</h3>
              <p className="text-sm text-gray-300 font-mono text-center">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>

    
      <Link href="/profile/toko">
        <button className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-500">
          Profil Toko
        </button>
      </Link>
    </div>
  );
}
