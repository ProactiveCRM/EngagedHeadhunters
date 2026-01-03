import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NichesGrid = () => {
  const niches = [
    {
      emoji: "🏥",
      title: "Healthcare Executive Search",
      slug: "healthcare-staffing",
      description: "From hospital CEOs to clinical directors, we place healthcare leaders who understand patient care and business operations. Medical staffing that prioritizes quality of care.",
      roles: ["Hospital CEOs & COOs", "Clinical Directors", "Healthcare IT Leaders", "VP of Operations"],
      specialty: "Healthcare & Senior Living"
    },
    {
      emoji: "💻",
      title: "Technology Talent Acquisition",
      slug: "technology-recruiting",
      description: "Technical leaders who build products AND build teams. We find CTOs and engineering leaders with proven track records of scaling organizations.",
      roles: ["CTOs & VPs Engineering", "Product Leaders", "Data & AI Executives", "Security Leaders"],
      specialty: "Tech & SaaS"
    },
    {
      emoji: "💰",
      title: "Finance & Accounting Leadership",
      slug: "finance-recruiting",
      description: "CFOs and financial executives who protect the bottom line while driving growth. Strategic thinkers who deliver results, not just reports.",
      roles: ["CFOs & Controllers", "VP of Finance", "Investment Directors", "Treasury Leaders"],
      specialty: "Finance & Banking"
    },
    {
      emoji: "👥",
      title: "Senior Care & Living",
      slug: "senior-care",
      description: "Leadership placement for senior living communities. Executives who improve quality of life for residents while managing complex operations and regulatory requirements.",
      roles: ["Executive Directors", "Regional VPs", "Director of Nursing", "Operations Leaders"],
      specialty: "Senior Living & Assisted Care"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Industry-Focused Search Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Generalist recruiters send generic candidates. Our sector specialists live and breathe these industries—they know who's available, who's moveable, and who you should be talking to.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {niches.map((niche, index) => (
            <Link 
              key={index} 
              href={`/${niche.slug}`}
              className="group bg-card rounded-xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border hover:border-primary/30"
            >
              <div className="flex flex-col sm:flex-row items-start sm:space-x-6 space-y-4 sm:space-y-0">
                <div className="bg-primary/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl sm:text-3xl" role="img" aria-hidden="true">{niche.emoji}</span>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {niche.title}
                    </h3>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {niche.specialty}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{niche.description}</p>
                  
                  <div className="border-t pt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Common Roles:</p>
                    <div className="flex flex-wrap gap-1">
                      {niche.roles.slice(0, 3).map((role, rIndex) => (
                        <span 
                          key={rIndex}
                          className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="default" size="lg">
            <Link href="/niches">Explore All Industries</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NichesGrid;