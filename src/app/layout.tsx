import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cinzel = Cinzel({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cinzel'
});

export const metadata: Metadata = {
  title: "Exile Orbs - Path of Exile Crafting Tools",
  description: "Calculate probabilities, plan your crafting strategy, and optimize your currency usage in Path of Exile.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} h-full`}>
      <body className={`${inter.className} ${cinzel.className} bg-[#1a0f0f] text-white min-h-screen flex flex-col`}>
        <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        
        <nav className="bg-slate-900/80 border-b border-slate-800/50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="text-lg font-bold text-amber-500 font-cinzel tracking-wider">
                Exile Orbs
              </Link>
              <div className="flex space-x-4">
                <Link href="/divine-calculator" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel text-sm">
                  Divine Orb Calculator
                </Link>
                <Link href="/currency" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel text-sm">
                  Currency
                </Link>
                <Link href="/strategy" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel text-sm">
                  Strategy
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow py-4">
          <div className="container mx-auto px-2 sm:px-4">
            {children}
          </div>
        </main>

        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
