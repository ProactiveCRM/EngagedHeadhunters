import { Metadata } from 'next';
import AuthClient from '@/components/pages/AuthClient';

export const metadata: Metadata = {
    title: 'Agent Portal | Engaged Headhunters',
    description: 'Sign in to your Engaged Headhunters agent account to manage your profile and blog content.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function AuthPage() {
    return <AuthClient />;
}
