import { Metadata } from 'next';
import HealthcareStaffingClient from '@/components/pages/HealthcareStaffingClient';

export const metadata: Metadata = {
    title: 'Healthcare Staffing & Medical Recruiting | Engaged Headhunters',
    description: 'Specialized healthcare staffing and medical recruiting services. From nursing leadership to hospital administration, we deliver qualified healthcare professionals.',
    keywords: 'healthcare staffing, medical recruiting, nursing recruitment, hospital administration jobs, healthcare IT staffing',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/healthcare-staffing',
    },
    openGraph: {
        title: 'Healthcare Staffing & Medical Recruiting | Engaged Headhunters',
        description: 'Specialized medical recruiting for nursing leadership and hospital administration.',
        url: 'https://www.engagedheadhunters.com/services/healthcare-staffing',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Healthcare Staffing & Medical Recruiting | Engaged Headhunters',
        description: 'Specialized medical recruiting for nursing leadership and hospital administration.',
    },
};

export default function HealthcareStaffingPage() {
    return <HealthcareStaffingClient />;
}
