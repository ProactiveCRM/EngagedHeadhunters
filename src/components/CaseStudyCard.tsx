"use client";

import { ArrowRight } from "lucide-react";

interface CaseStudyCardProps {
    study: {
        title: string;
        client: string;
        industry: string;
        challenge: string;
        solution: string;
        results: string[];
        timeToFill: string;
        placement: string;
    };
    className?: string;
}

export function CaseStudyCard({ study, className = "" }: CaseStudyCardProps) {
    if (!study) return null;

    return (
        <div className={`bg-card rounded-xl shadow-lg border border-border overflow-hidden ${className}`}>
            <div className="grid lg:grid-cols-3 gap-8 p-8">
                <div className="lg:col-span-2">
                    <div className="flex items-center mb-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mr-3">
                            {study.industry}
                        </span>
                        <span className="text-muted-foreground">{study.placement} Placement</span>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3">{study.title}</h3>
                    <p className="text-muted-foreground mb-2">{study.client}</p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <h4 className="font-semibold text-foreground mb-3 text-red-600">Challenge</h4>
                            <p className="text-muted-foreground text-sm">{study.challenge}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-3 text-blue-600">Solution</h4>
                            <p className="text-muted-foreground text-sm">{study.solution}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="font-semibold text-foreground mb-4 text-green-600">Results</h4>
                    <ul className="space-y-2 mb-6 text-left">
                        {study.results.map((result: any, idx: number) => {
                            const text = typeof result === 'string' ? result : result?.item;
                            if (!text) return null;
                            return (
                                <li key={idx} className="flex items-start text-sm">
                                    <ArrowRight className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                                    <span className="text-muted-foreground">{text}</span>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="border-t border-border pt-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{study.timeToFill}</div>
                            <div className="text-sm text-muted-foreground">Time to Fill</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
