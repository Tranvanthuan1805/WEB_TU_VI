import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tử Vi Thần Toán - Tra Cứu Lịch Âm Dương",
  description: "Tra cứu tử vi, lịch âm dương, can chi, tiết khí theo phương pháp truyền thống",
  keywords: "tử vi,lịch âm,can chi,tiết khí,tứ trụ,Tử Vi Thần Toán",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen flex flex-col bg-slate-50/50">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
