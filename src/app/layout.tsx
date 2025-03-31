import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
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
    <html lang="en">
      <body className={`${inter.className} ${cinzel.className} bg-[#1a0f0f] text-white min-h-screen relative`}>
        <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        
        <nav className="bg-slate-900/80 border-b border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold text-amber-500 font-cinzel tracking-wider">
                Exile Orbs
              </Link>
              <div className="flex space-x-6">
                <Link href="/calculator" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel">
                  Calculator
                </Link>
                <Link href="/currency" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel">
                  Currency
                </Link>
                <Link href="/strategy" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel">
                  Strategy
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative">
          {children}
        </main>

        <footer className="bg-slate-900/80 border-t border-slate-800/50 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-slate-400">
              <p>© 2024 Exile Orbs. Not affiliated with Grinding Gear Games.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
