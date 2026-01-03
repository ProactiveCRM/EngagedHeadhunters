import { Metadata } from 'next';
import HomeClient from '@/components/pages/HomeClient';

export const metadata: Metadata = {
  title: 'Executive Search Firm & Leadership Recruiting | Engaged Headhunters',
  description: 'Executive search specialists connecting growth-focused organizations with senior leadership talent. Industry-focused recruiters with placement guarantees and confidential search capabilities.',
  alternates: {
    canonical: 'https://www.engagedheadhunters.com/',
  },
  openGraph: {
    title: 'Executive Search Firm & Leadership Recruiting | Engaged Headhunters',
    description: 'Executive search specialists connecting growth-focused organizations with senior leadership talent. Healthcare, technology, finance, and manufacturing expertise.',
    url: 'https://www.engagedheadhunters.com/',
    type: 'website',
    images: [
      {
        url: 'https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png',
      }
    ],
    siteName: 'Engaged Headhunters',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Search Firm & Leadership Recruiting | Engaged Headhunters',
    description: 'Executive search specialists connecting growth-focused organizations with senior leadership talent. Healthcare, technology, finance, and manufacturing expertise.',
    images: ['https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Engaged Headhunters' }],
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Houston',
  }
};

export default function Page() {
  return <HomeClient />;
}
