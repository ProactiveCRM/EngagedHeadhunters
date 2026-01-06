"use client";

import { Builder } from "@builder.io/react";
import { HeroSection } from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import ValueProps from "@/components/ValueProps";
import NichesGrid from "@/components/NichesGrid";
import Industries from "@/components/Industries";
import About from "@/components/About";
import BDBSection from "@/components/BDBSection";
import Contact from "@/components/Contact";
import { LatestBlogPosts, ActiveJobsGrid } from "./SupabaseBlocks";
import IndustryExpertise from "@/components/IndustryExpertise";
import Partners from "@/components/Partners";
import AudienceValue from "@/components/AudienceValue";
import FeaturedAgents from "@/components/FeaturedAgents";
import Testimonials from "@/components/Testimonials";
import { ValuePropGrid } from "./ValuePropGrid";
import { CaseStudyCard } from "@/components/CaseStudyCard";

import React from "react";

// Helper to ensure text props are strings (prevents "Objects are not valid as a React child" errors)
const ensureString = (val: any): string => {
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    return '';
};

// Safety HOC to strip internal props and sanitize children
const withSafety = (Component: any) => {
    return (props: any) => {
        const { builderBlock, builderContext, attributes, children, ...rest } = props;

        // Sanitize all props in rest to prevent "Objects as children" errors
        const safeProps: any = { ...rest };
        for (const key in safeProps) {
            const val = safeProps[key];
            if (val && typeof val === 'object' && !React.isValidElement(val)) {
                if (Array.isArray(val)) {
                    // It's a list, keep it but ensure its items are safe
                    safeProps[key] = val.map(item => {
                        if (item && typeof item === 'object' && !React.isValidElement(item)) {
                            // If it's a Builder object, return a safe version or stringify
                            return item.item || item.text || '';
                        }
                        return item;
                    });
                } else {
                    // It's a single object, if it looks like a Builder block/ref, strip it
                    if (val.id || val.component || val['@type']) {
                        safeProps[key] = '';
                    }
                }
            }
        }

        // Only allow valid children to pass through
        const safeChildren = React.Children.map(children, (child) => {
            if (typeof child === 'string' || typeof child === 'number' || React.isValidElement(child)) {
                return child;
            }
            if (child && typeof child === 'object') {
                // Try to extract text if it's a Builder text node object
                const text = (child as any).text || (child as any).children || '';
                return typeof text === 'string' ? text : null;
            }
            return null;
        });

        return <Component {...safeProps} {...attributes}>{safeChildren}</Component>;
    };
};

// Register HeroSection (UI Component)
Builder.registerComponent(
    withSafety(HeroSection),
    {
        name: "HeroSection",
        inputs: [
            { name: "title", type: "text", defaultValue: "Everything you need to hire top talent" },
            { name: "description", type: "text", defaultValue: "Connect with the best candidates in your industry." },
            { name: "variant", type: "string", enum: ["home", "page", "service", "minimal"], defaultValue: "page" },
            { name: "badge", type: "string", defaultValue: "Premier Agency" },
            { name: "badgeColor", type: "string", enum: ["primary", "destructive", "secondary"], defaultValue: "primary" },
        ],
    }
);

// Register Main Hero (Comprehensive Component)
Builder.registerComponent(
    withSafety(Hero),
    {
        name: "MainHero",
        description: "The main animated hero section from the homepage",
    }
);

// Register CTASection
Builder.registerComponent(
    withSafety(CTASection),
    {
        name: "CTASection",
        inputs: [
            { name: "variant", type: "string", enum: ["employer", "candidate", "hybrid"], defaultValue: "hybrid" },
            { name: "title", type: "text" },
            { name: "description", type: "text" },
            { name: "primaryButtonText", type: "text" },
            { name: "secondaryButtonText", type: "text" },
            { name: "bookingUrl", type: "text" },
            { name: "showJobsLink", type: "boolean", defaultValue: false },
        ],
    }
);

// Register ValueProps
Builder.registerComponent(
    withSafety(ValueProps),
    {
        name: "ValueProps",
        description: "Three columns showing 'Empty Seats', 'Bad Hires', and 'Generalist recruiters'",
    }
);

// Register NichesGrid
Builder.registerComponent(
    withSafety(NichesGrid),
    {
        name: "NichesGrid",
        description: "The 2x2 grid of industry niches (Healthcare, Tech, Finance, Senior Care)",
    }
);

// Register Industries
Builder.registerComponent(
    withSafety(Industries),
    {
        name: "Industries",
        description: "Comprehensive industry expertise section with placement stats",
    }
);

// Register About section
Builder.registerComponent(
    withSafety(About),
    {
        name: "AboutSection",
        description: "The 'We Hunt. We Don't Post and Pray' section",
    }
);

// Register BDBSection
Builder.registerComponent(
    withSafety(BDBSection),
    {
        name: "BDBSection",
        description: "The 'BDB Authority Builders' free program section",
    }
);

// Register Contact section
Builder.registerComponent(
    withSafety(Contact),
    {
        name: "ContactSection",
        description: "The main contact form and office info section",
    }
);

// Register Supabase dynamic blocks
Builder.registerComponent(
    withSafety(LatestBlogPosts),
    {
        name: "LatestBlogPosts",
        inputs: [
            { name: "title", type: "text", defaultValue: "Latest from our Blog" },
            { name: "limit", type: "number", defaultValue: 3 },
        ],
    }
);

Builder.registerComponent(
    withSafety(ActiveJobsGrid),
    {
        name: "ActiveJobsGrid",
        inputs: [
            { name: "title", type: "text", defaultValue: "Current Job Openings" },
            { name: "limit", type: "number", defaultValue: 4 },
        ],
    }
);

// Register IndustryExpertise
Builder.registerComponent(
    withSafety(IndustryExpertise),
    {
        name: "IndustryExpertise",
        description: "Deep industry focus across critical sectors with stats",
    }
);

// Register Partners section
Builder.registerComponent(
    withSafety(Partners),
    {
        name: "Partners",
        description: "The 'Keep Your Brand. Gain Our Support' section for the Alliance",
    }
);

// Register AudienceValue
Builder.registerComponent(
    withSafety(AudienceValue),
    {
        name: "AudienceValue",
        description: "AI technology advantage, nationwide coverage, and value props for Companies/Candidates/Agents",
    }
);

// Register FeaturedAgents
Builder.registerComponent(
    withSafety(FeaturedAgents),
    {
        name: "FeaturedAgents",
        description: "Meet our founder and featured headhunters",
    }
);

// Register PartnerCTASection (from Testimonials.tsx)
Builder.registerComponent(
    withSafety(Testimonials),
    {
        name: "PartnerCTASection",
        description: "The three-column CTA section (Hiring Consultation, Find Roles, Agent Opportunity)",
    }
);

// Register ValuePropGrid
Builder.registerComponent(
    withSafety(ValuePropGrid),
    {
        name: "ValuePropGrid",
        inputs: [
            { name: "title", type: "text", defaultValue: "Why Hiring Leaders Call Us First" },
            { name: "description", type: "longText", defaultValue: "Top performers aren't scrolling job boards. They're busy producing results elsewhere." },
            {
                name: "props",
                type: "list",
                subFields: [
                    { name: "emoji", type: "text" },
                    { name: "title", type: "text" },
                    { name: "description", type: "longText" },
                    { name: "solution", type: "text" },
                    { name: "proof", type: "text" },
                ],
            },
        ],
    }
);

// Register CaseStudyCard
Builder.registerComponent(
    withSafety(CaseStudyCard),
    {
        name: "CaseStudyCard",
        inputs: [
            {
                name: "study",
                type: "object",
                subFields: [
                    { name: "title", type: "text", defaultValue: "Healthcare System Transformation" },
                    { name: "client", type: "text", defaultValue: "Regional Healthcare Network" },
                    { name: "industry", type: "text", defaultValue: "Healthcare" },
                    { name: "challenge", type: "longText", defaultValue: "450-bed hospital system needed a transformational CEO..." },
                    { name: "solution", type: "longText", defaultValue: "Identified a seasoned healthcare executive..." },
                    { name: "results", type: "list", subFields: [{ name: "item", type: "text" }], defaultValue: ["Reduced costs", "Improved satisfaction"] },
                    { name: "timeToFill", type: "text", defaultValue: "28 days" },
                    { name: "placement", type: "text", defaultValue: "CEO" },
                ],
            },
        ],
    }
);

// Register Button
Builder.registerComponent(
    withSafety(Button),
    {
        name: "Button",
        inputs: [
            { name: "children", type: "text", defaultValue: "Click me" },
            { name: "variant", type: "string", enum: ["default", "destructive", "outline", "secondary", "ghost", "link"], defaultValue: "default" },
            { name: "size", type: "string", enum: ["default", "sm", "lg", "icon"], defaultValue: "default" },
        ],
    }
);

// Register Card
Builder.registerComponent(
    withSafety(function BuilderCard({ title, description, bodyText, className }: any) {
        return (
            <Card className={className} >
                <CardHeader>
                    {title && typeof title === 'string' && <CardTitle>{title} </CardTitle>}
                    {description && typeof description === 'string' && <CardDescription>{description} </CardDescription>}
                </CardHeader>
                {bodyText && typeof bodyText === 'string' && <CardContent>{bodyText} </CardContent>}
            </Card>
        );
    }),
    {
        name: "Card",
        inputs: [
            { name: "title", type: "text", defaultValue: "Card Title" },
            { name: "description", type: "text", defaultValue: "Card description goes here." },
            { name: "bodyText", type: "text", defaultValue: "This is the main content area of the card." },
            { name: "className", type: "text" }
        ],
    }
);

