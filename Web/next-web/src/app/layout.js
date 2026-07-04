import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tử Vi Số Mệnh | Lập Lá Số Tử Vi Chính Xác",
  description: "Nền tảng luận giải tử vi số mệnh kết hợp cổ thuật phương đông cùng thuật toán số hiện đại. Giúp bạn định vị bản thân và khai phá tài lộc hanh thông.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FDFCF7]">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
