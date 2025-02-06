import type { Metadata } from "next";
import Image from 'next/image';
import "./globals.css";

export const metadata: Metadata = {
  title: "풋살장 인조잔디 견적",
  description: "프리미엄 풋살장 인조잔디 견적 계산",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <header className="bg-white shadow">
          <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="h-6 sm:h-8 w-20 sm:w-24 relative">
                <a href="/">
                  <Image
                    src="/images/plab-logo.png"
                    alt="PLAB"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </a>
              </div>
              <div className="space-x-2 sm:space-x-4 text-sm sm:text-base">
                <a href="/" className="hover:text-green-600">홈</a>
                <a href="/estimate" className="hover:text-green-600">견적 계산 및 신청</a>
                <a href="/admin" className="hover:text-green-600">관리자</a>
              </div>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-gray-800 text-white py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <p className="text-sm sm:text-base">&copy; 2024 PLAB. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}