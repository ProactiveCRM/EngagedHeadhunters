"use client";

interface ValueProp {
    emoji: string;
    title: string;
    description: string;
    solution: string;
    proof: string;
}

interface ValuePropGridProps {
    title?: string;
    description?: string;
    props?: ValueProp[];
}

export function ValuePropGrid({
    title = "Why Hiring Leaders Call Us First",
    description = "Top performers aren't scrolling job boards. They're busy producing results elsewhere. We go find them—and make the case that your opportunity is worth their attention.",
    props = []
}: ValuePropGridProps) {
    // Fallback props if none provided
    const displayProps = props.length > 0 ? props : [
        {
            emoji: "⏱️",
            title: "Empty Seats Cost $500/Day",
            description: "Every open role drains productivity and burns out the team covering for it. We deliver qualified candidates in days.",
            solution: "Candidates in days",
            proof: "Not months of job board noise"
        },
        {
            emoji: "🛡️",
            title: "Bad Hires Cost 5x Salary",
            description: "A wrong executive hire destroys momentum, damages culture, and wastes months of onboarding.",
            solution: "Replacement guarantee",
            proof: "Terms negotiated per engagement"
        },
        {
            emoji: "🎯",
            title: "Generalist Recruiters Waste Your Time",
            description: "They send resumes that look good on paper but bomb in interviews. Our consultants know the industry.",
            solution: "Sector-focused consultants",
            proof: "Healthcare, Tech, Finance"
        }
    ];

    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">{title}</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{description}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {displayProps.map((prop, index) => {
                        const titleText = typeof prop.title === 'string' ? prop.title : '';
                        const descText = typeof prop.description === 'string' ? prop.description : '';
                        const solutionText = typeof prop.solution === 'string' ? prop.solution : '';
                        const proofText = typeof prop.proof === 'string' ? prop.proof : '';
                        const emojiText = typeof prop.emoji === 'string' ? prop.emoji : '';

                        return (
                            <div key={index} className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-3xl" role="img" aria-hidden="true">{emojiText}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-4">{titleText}</h3>
                                <p className="text-muted-foreground mb-6">{descText}</p>
                                <div className="border-t pt-4">
                                    <div className="text-lg font-bold text-primary">{solutionText}</div>
                                    <div className="text-sm text-muted-foreground">{proofText}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
