export const INITIAL_USER = {
  name: 'Dimas Mahardika',
  role: 'Mahasiswa',
  email: 'dimasmahardika@mhs.unjaya.ac.id',
  avatar: '/images/avatar.png',
  password: 'password123',
};

export const INITIAL_REPORTS = [
  {
    id: '1',
    ticketId: '12345678910',
    title: 'WASTAFEL TERSUMBAT',
    category: 'Fasilitas Sanitasi',
    date: '2026-09-24',
    formattedDate: '24 September 2026',
    location: 'GEDUNG A (TOILET LT. 2)',
    description: 'Wastafel di toilet lantai 2 tersumbat air tidak bisa mengalir dan meluap ke lantai.',
    image: '/images/sink.png',
    status: 'Selesai', // Selesai, Diproses, Ditolak, Menunggu
    adminStatus: 'SELESAI'
  },
  {
    id: '2',
    ticketId: '15426578981',
    title: 'KURSI KURANG LAYAK PAKAI',
    category: 'PROYEKTOR RUSAK', // In admin view: PROYEKTOR RUSAK or Fasilitas
    date: '2026-09-20',
    formattedDate: '20 September 2026',
    location: 'GEDUNG B (RUANG LAB 2)',
    description: 'Beberapa kursi kuliah kayu dan proyektor di ruangan mengalami kerusakan.',
    image: '/images/chair.png',
    status: 'Selesai',
    adminStatus: 'SELESAI'
  },
  {
    id: '3',
    ticketId: '12345678910',
    title: 'AC RUSAK',
    category: 'AC RUSAK',
    date: '2026-09-24',
    formattedDate: '24 September 2026',
    location: 'GEDUNG A (KELAS A1)',
    description: 'AC di ruang rapat B mengeluarkan suara bising dan suhu tidak kunjung turun meskipun sudah diatur ke 16 derajat. Mohon segera diperbaiki.',
    image: '/images/ac.png',
    status: 'Diproses',
    adminStatus: 'MENUNGGU VERIFIKASI'
  },
  {
    id: '4',
    ticketId: '18937210928',
    title: 'LAMPU KURANG TERANG',
    category: 'Fasilitas Kelistrikan',
    date: '2026-09-18',
    formattedDate: '18 September 2026',
    location: 'LORONG GEDUNG C LT. 3',
    description: 'Lampu penerangan di lorong utama redup dan berkedip saat malam hari.',
    image: '/images/lamp.png',
    status: 'Ditolak',
    adminStatus: 'DITOLAK'
  }
];

export const CATEGORIES = [
  'AC RUSAK',
  'PROYEKTOR RUSAK',
  'Fasilitas Ruang Kelas',
  'Fasilitas Sanitasi / Toilet',
  'Kelistrikan & Penerangan',
  'Jaringan WiFi & Internet',
  'Kebersihan Lingkungan Kampus',
  'Lain-lain'
];
