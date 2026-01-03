import { Metadata } from 'next';
import TemporaryStaffingClient from '@/components/pages/TemporaryStaffingClient';

export const metadata: Metadata = {
    title: 'Temporary Staffing & Seasonal Workforce Solutions | Engaged Headhunters',
    description: 'Flexible temporary staffing solutions for peak demand and seasonal needs. Quick access to qualified professionals for short-term assignments.',
    keywords: 'temporary staffing, seasonal staffing, short-term hiring, temp workforce solutions',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/temporary-staffing',
    },
    openGraph: {
        title: 'Temporary Staffing & Seasonal Workforce Solutions | Engaged Headhunters',
        description: 'Flexible temporary staffing solutions for short-term needs.',
        url: 'https://www.engagedheadhunters.com/services/temporary-staffing',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Temporary Staffing & Seasonal Workforce Solutions | Engaged Headhunters',
        description: 'Flexible temporary staffing solutions for short-term needs.',
    },
};

export default function TemporaryStaffingPage() {
    return <TemporaryStaffingClient />;
}
