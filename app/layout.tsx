import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'InRealLife (IRL) | Trung Tâm Quản Trị Vận Hành Thực Địa',
  description: 'Hệ thống quản trị điều hành ứng dụng kết nối ngoài đời thực InRealLife / Treasure IRL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-800`}
      >
        {children}
      </body>
    </html>
  );
}
