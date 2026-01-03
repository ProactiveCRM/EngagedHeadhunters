const Industries = () => {
  const industries = [
    {
      emoji: "💻",
      title: "Technology & Software",
      description: "From Silicon Valley startups to Fortune 500 tech giants, we place visionary leaders who drive digital transformation.",
      specialties: ["Software Engineering", "Product Management", "Cybersecurity", "AI/ML Leadership", "DevOps", "Data Science"],
      placements: "5,000+",
      avgSalary: "$285K"
    },
    {
      emoji: "💰",
      title: "Financial Services",
      description: "Investment banking, private equity, hedge funds, and fintech companies trust us with their most critical leadership roles.",
      specialties: ["Investment Banking", "Private Equity", "Risk Management", "Fintech", "Wealth Management", "Compliance"],
      placements: "3,500+",
      avgSalary: "$350K"
    },
    {
      emoji: "🏥",
      title: "Healthcare & Life Sciences",
      description: "Connecting healthcare organizations with leaders who advance patient care and medical innovation.",
      specialties: ["Hospital Administration", "Pharmaceutical", "Medical Devices", "Biotech", "Digital Health", "Clinical Research"],
      placements: "2,800+",
      avgSalary: "$295K"
    },
    {
      emoji: "🏭",
      title: "Manufacturing & Industrial",
      description: "From automotive to aerospace, we place executives who optimize operations and drive manufacturing excellence.",
      specialties: ["Operations Management", "Supply Chain", "Quality Assurance", "Lean Manufacturing", "Safety", "Engineering"],
      placements: "2,200+",
      avgSalary: "$265K"
    },
    {
      emoji: "💼",
      title: "Professional Services",
      description: "Consulting firms, law firms, and accounting practices rely on us for partners and senior leadership.",
      specialties: ["Management Consulting", "Legal", "Accounting", "Tax Advisory", "Strategy", "Business Development"],
      placements: "1,900+",
      avgSalary: "$275K"
    },
    {
      emoji: "⚡",
      title: "Energy & Utilities",
      description: "Renewable energy, oil & gas, and utility companies depend on our expertise in this rapidly evolving sector.",
      specialties: ["Renewable Energy", "Oil & Gas", "Utilities", "Energy Trading", "Environmental", "Regulatory Affairs"],
      placements: "1,200+",
      avgSalary: "$310K"
    }
  ];

  return (
    <section id="industries" className="py-20 bg-gradient-to-br from-muted to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industry Expertise That Drives Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Two decades of specialized recruiting across the world's most demanding industries. 
            We don't just understand your business—we live it.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {industries.map((industry, index) => (
            <div key={index} className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-8 border">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl" role="img" aria-hidden="true">{industry.emoji}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{industry.title}</h3>
              <p className="text-muted-foreground mb-6">{industry.description}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Key Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {industry.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-primary/10 text-foreground px-3 py-1 rounded-full text-sm font-medium border border-primary/30">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-border pt-4 flex justify-between">
                <div>
                  <div className="text-2xl font-bold text-primary">{industry.placements}</div>
                  <div className="text-sm text-muted-foreground">Placements</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{industry.avgSalary}</div>
                  <div className="text-sm text-muted-foreground">Avg. Salary</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-primary-foreground">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Don't See Your Industry?</h3>
              <p className="text-[hsl(var(--text-on-primary-muted))] text-lg mb-6">
                Our network spans every major industry. From emerging sectors to traditional businesses, 
                we have the expertise and connections to find your next executive leader.
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
                Explore Custom Solutions
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-[hsl(var(--text-on-primary-muted))]">Industries Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-[hsl(var(--text-on-primary-muted))]">Client Retention</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">30</div>
                <div className="text-[hsl(var(--text-on-primary-muted))]">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-[hsl(var(--text-on-primary-muted))]">Dedicated Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;