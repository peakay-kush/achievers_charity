import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';


// Define the font
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary',
});

// Metadata
export const metadata: Metadata = {
  title: 'Achievers Charity Group - Compassion in Action',
  description: 'Bringing hope, dignity, and support to children and community members in need through compassionate humanitarian outreach.',
  keywords: "charity, children's homes, community support, humanitarian, less privileged, donate",
  authors: [{ name: 'Achievers Charity Group' }],
  // Theme color is better handled in viewport export in simple setups or just meta tag
  icons: {
    icon: '/assets/images/logo.png',
  },
  openGraph: {
    title: 'Achievers Charity Group - Compassion in Action',
    description: "Supporting children's homes, communities, and the less privileged with love and dignity.",
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#FF5A1F',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
