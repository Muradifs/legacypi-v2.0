import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Shield } from "lucide-react"; // Ikona za logo

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LegacyPi",
  description: "Decentralizirani humanitarni fond na Pi Networku",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-950 text-slate-100`}>
        
        {/* 1. ZAGLAVLJE (Header & Navigation) */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-yellow-500">
              <Shield className="w-6 h-6" />
              <span>LegacyPi</span>
            </div>

            {/* Navigacija */}
            <nav className="flex gap-4 text-sm font-medium text-slate-400">
              <a href="/" className="hover:text-yellow-500 transition-colors">Početna</a>
              <a href="/about" className="hover:text-yellow-500 transition-colors">O nama</a>
              <a href="/transparency" className="hover:text-yellow-500 transition-colors">Transparentnost</a>
            </nav>
          </div>
        </header>

        {/* 2. GLAVNI SADRŽAJ (Main Content) */}
        {/* Ovdje će se učitati vaša LegacyPiPage stranica */}
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          {children} 
        </main>

        {/* 3. PODNOŽJE (Footer) */}
        <footer className="border-t border-slate-800 py-8 mt-auto bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} LegacyPi Foundation.</p>
            <div className="mt-2 flex justify-center gap-4">
               <a href="/privacy" className="hover:text-slate-300">Privatnost</a>
               <a href="/terms" className="hover:text-slate-300">Uvjeti korištenja</a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}