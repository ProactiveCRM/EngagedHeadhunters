const IndustryExpertise = () => {
  const industries = [
    {
      emoji: "🏥",
      name: "Healthcare",
      description: "From hospital CEOs to pharmaceutical executives, we understand the unique challenges of healthcare leadership.",
      specialties: ["Hospital Administration", "Pharmaceutical Leadership", "Medical Device", "Healthcare IT", "Biotechnology"]
    },
    {
      emoji: "💻",
      name: "Technology",
      description: "Silicon Valley to emerging tech hubs, we connect visionary leaders with transformational opportunities.",
      specialties: ["Software Engineering", "Product Leadership", "Cybersecurity", "AI/ML Leadership", "Cloud Architecture"]
    },
    {
      emoji: "💰",
      name: "Financial Services",
      description: "Wall Street to regional banks, we place executives who drive financial performance and innovation.",
      specialties: ["Investment Banking", "Private Equity", "Wealth Management", "FinTech", "Risk Management"]
    },
    {
      emoji: "🏢",
      name: "Executive Leadership",
      description: "Board-level and C-suite executives across all industries who define organizational success.",
      specialties: ["CEO/COO Placement", "Board Directors", "Chief Officers", "Division Presidents", "Succession Planning"]
    },
    {
      emoji: "💼",
      name: "Professional Services",
      description: "Consulting, legal, and advisory firms seeking partners and practice leaders who drive growth.",
      specialties: ["Management Consulting", "Legal Partners", "Accounting Leadership", "Advisory Services", "Business Development"]
    },
    {
      emoji: "🏭",
      name: "Manufacturing",
      description: "Industrial leaders who optimize operations, drive innovation, and build world-class organizations.",
      specialties: ["Operations Leadership", "Supply Chain", "Quality Management", "Plant Leadership", "Engineering Management"]
    }
  ];

  const expertiseStats = [
    { emoji: "🏆", value: "Deep", label: "Industry Expertise" },
    { emoji: "👥", value: "Multi", label: "Sector Coverage" },
    { emoji: "🏢", value: "National", label: "Client Network" },
    { emoji: "⚡", value: "AI", label: "Powered Sourcing" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Deep Industry Expertise Across Critical Sectors
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            Our headhunters don't just recruit—they understand your industry inside and out. 
            With decades of specialized experience, we deliver executive search solutions that align 
            with your sector's unique challenges, opportunities, and leadership requirements.
          </p>
          
          {/* Industry Expertise Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {expertiseStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl" role="img" aria-hidden="true">{stat.emoji}</span>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {industries.map((industry, index) => (
            <div key={index} className="bg-gradient-to-br from-muted to-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full mr-4">
                  <span className="text-3xl" role="img" aria-hidden="true">{industry.emoji}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{industry.name}</h3>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">{industry.description}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Key Specialties:</h4>
                <div className="space-y-2">
                  {industry.specialties.map((specialty, idx) => (
                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="text-primary mr-2">✓</span>
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Leadership Promise */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">
            Your Industry. Our Expertise. Exceptional Results.
          </h3>
          <p className="text-primary-foreground/80 text-lg max-w-4xl mx-auto mb-8">
            When you choose Engaged Headhunters, you're not just hiring a recruiting agency—you're 
            partnering with industry experts who understand your challenges, speak your language, 
            and deliver the transformational leadership your organization needs to thrive.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-2">15+ Years</div>
              <div className="text-primary-foreground/80">Industry Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">AI-Powered</div>
              <div className="text-primary-foreground/80">Recruiting Technology</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Build Don't Beg</div>
              <div className="text-primary-foreground/80">Proven Methodology</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryExpertise;