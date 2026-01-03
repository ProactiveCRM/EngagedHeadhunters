import { Metadata } from 'next';
import NichePageClient from '@/components/pages/NichePageClient';

interface Props {
    params: Promise<{ niche: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { niche } = await params;

    const nicheData: Record<string, { title: string; description: string; specialties: string[] }> = {
        healthcare: {
            title: "Healthcare",
            description: "Transform patient care through exceptional leadership. Expert healthcare recruiting and executive search services.",
            specialties: ["Hospital Administration", "Pharmaceutical Leadership", "Medical Devices", "Healthcare IT"]
        },
        technology: {
            title: "Technology",
            description: "Drive digital transformation with visionary tech leaders. Elite technology recruiting and executive search.",
            specialties: ["Software Engineering", "Product Leadership", "AI/ML", "Cybersecurity"]
        },
        finance: {
            title: "Finance",
            description: "Build world-class finance and accounting leadership teams. Specialized finance recruiting specialists.",
            specialties: ["CFO Search", "Investment Banking", "Private Equity", "Corporate Finance"]
        },
        manufacturing: {
            title: "Manufacturing",
            description: "Optimize operations with proven manufacturing leaders. Operational excellence and Industry 4.0 recruitment.",
            specialties: ["Plant Management", "Supply Chain", "Quality Control", "Operations Excellence"]
        },
        sales: {
            title: "Sales",
            description: "Accelerate revenue growth with elite sales leadership. Revenue leaders and high-performing sales teams.",
            specialties: ["VP of Sales", "Chief Revenue Officer", "Sales Operations", "Business Development"]
        }
    };

    const current = nicheData[niche.toLowerCase()] || {
        title: niche.charAt(0).toUpperCase() + niche.slice(1),
        description: `Expert ${niche} recruiting and executive search services by Engaged Headhunters.`,
        specialties: []
    };

    const title = `${current.title} Recruiting & Executive Search | Engaged Headhunters`;
    const description = current.description;
    const keywords = [...current.specialties, `${current.title} recruiting`, `${current.title} headhunter`, `${current.title} executive search`].join(', ');

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: `https://www.engagedheadhunters.com/niches/${niche}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.engagedheadhunters.com/niches/${niche}`,
            siteName: 'Engaged Headhunters',
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default function NichePage() {
    return <NichePageClient />;
}
