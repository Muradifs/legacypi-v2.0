import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Shield } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LegacyPi",
  description: "Decentralized humanitarian fund on Pi Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-950 text-slate-100`}>
        
        {/* 1. HEADER (Navigation) */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-yellow-500">
              <Shield className="w-6 h-6" />
              <span>LegacyPi</span>
            </div>

            {/* Navigation Links - Translated to English */}
            <nav className="flex gap-4 text-sm font-medium text-slate-400">
              <a href="/" className="hover:text-yellow-500 transition-colors">Home</a>
              <a href="/about" className="hover:text-yellow-500 transition-colors">About Us</a>
              <a href="/transparency" className="hover:text-yellow-500 transition-colors">Transparency</a>
            </nav>
          </div>
        </header>

        {/* 2. MAIN CONTENT */}
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          {children} 
        </main>

        {/* 3. FOOTER */}
        <footer className="border-t border-slate-800 py-8 mt-auto bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} LegacyPi Foundation.</p>
            <div className="mt-2 flex justify-center gap-4">
               <a href="/privacy" className="hover:text-slate-300">Privacy Policy</a>
               <a href="/terms" className="hover:text-slate-300">Terms of Service</a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}