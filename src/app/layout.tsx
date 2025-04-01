import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
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
        
        <Header />

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
