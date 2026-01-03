import { Metadata } from 'next';
import ExecutiveSearchClient from '@/components/pages/ExecutiveSearchClient';

export const metadata: Metadata = {
    title: 'Executive Search & C-Suite Recruiting | Engaged Headhunters',
    description: 'Board-level and C-suite executive recruitment for transformational leadership roles. Our executive search practice delivers visionary leaders who drive extraordinary results.',
    keywords: 'executive search, C-suite recruiting, CEO search, CFO recruiting, executive headhunters, board recruitment',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/executive-search',
    },
    openGraph: {
        title: 'Executive Search & C-Suite Recruiting | Engaged Headhunters',
        description: 'Transformational leadership recruitment for C-suite and board roles.',
        url: 'https://www.engagedheadhunters.com/services/executive-search',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Search & C-Suite Recruiting | Engaged Headhunters',
        description: 'Transformational leadership recruitment for C-suite and board roles.',
    },
};

export default function ExecutiveSearchPage() {
    return <ExecutiveSearchClient />;
}
