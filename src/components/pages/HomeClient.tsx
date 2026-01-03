"use client";

import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import NichesGrid from '@/components/NichesGrid';
import FeaturedAgents from '@/components/FeaturedAgents';
import About from '@/components/About';
import Contact from '@/components/Contact';
import CTASection from '@/components/CTASection';
import WebsiteSchema from '@/components/seo/WebsiteSchema';

const HomeClient = () => {
    return (
        <PageLayout showBreadcrumbs={false}>
            <WebsiteSchema />
            <Hero />
            <ValueProps />
            <NichesGrid />
            <FeaturedAgents />
            <About />
            <CTASection variant="hybrid" showJobsLink={true} />
            <Contact />
        </PageLayout>
    );
};

export default HomeClient;
