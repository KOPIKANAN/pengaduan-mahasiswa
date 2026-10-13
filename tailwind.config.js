/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#14ADA1',       // 14ADA1 - Main brand / Sidebar / Header Banner
          light: '#72CEC7',      // 72CEC7 - Stat cards / Secondary containers
          dark: '#0F766E',       // 0F766E - Action buttons (Lapor sekarang, Kirim, Simpan)
          red: '#E81010',        // E81010 - Sign Out, Status Ditolak
          yellow: '#F8D50C',     // F8D50C - Status Menunggu, Diproses
          green: '#6FFF67',      // 6FFF67 - Status Selesai
          surface: '#F8FAFC',
          inputBg: '#E2E8F0',    // Clean gray input background from Figma
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'pill': '9999px',
        'xl-2': '24px',
        'xl-3': '32px',
      }
    },
  },
  plugins: [],
}
