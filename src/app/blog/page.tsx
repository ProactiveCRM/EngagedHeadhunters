import { Metadata } from 'next';
import BlogIndexClient from '@/components/pages/BlogIndexClient';

export const metadata: Metadata = {
    title: 'Executive Search Insights & Intelligence | Engaged Headhunters Blog',
    description: 'Stay ahead of recruiting trends with expert insights on executive search, talent acquisition strategies, and leadership development from Engaged Headhunters.',
    keywords: 'recruiting blog, executive search insights, talent acquisition trends, leadership advice, hiring strategies',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/blog',
    },
    openGraph: {
        title: 'Executive Search Insights & Intelligence | Engaged Headhunters Blog',
        description: 'Expert insights on executive search and talent acquisition strategies.',
        url: 'https://www.engagedheadhunters.com/blog',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Search Insights & Intelligence | Engaged Headhunters Blog',
        description: 'Expert insights on executive search and talent acquisition strategies.',
    },
};

export default function BlogPage() {
    return <BlogIndexClient />;
}
