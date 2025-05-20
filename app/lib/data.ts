// app/lib/data.ts
export interface Invoice {
  id: string;
  name: string;
  email: string;
  image_url: string;
  amount: number;
  date: string;
  status: string;
}

export async function fetchFilteredInvoices(query: string, currentPage: number): Promise<Invoice[]> {
  // Contoh dummy data, ganti dengan query ke database atau API kamu
  return [
    {
      id: "INV001",
      name: "John Doe",
      email: "john@example.com",
      image_url: "/profile.jpg",
      amount: 1000000,
      date: "2025-05-20",
      status: "paid",
    },
    // data lainnya...
  ];
}
