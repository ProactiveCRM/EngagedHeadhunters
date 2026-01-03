const About = () => {
  const differentiators = [
    {
      emoji: "🎯",
      title: "We Hunt. We Don't Post.",
      description: "While other agencies list jobs and wait, we actively pursue the exact candidates you need—even if they're not looking."
    },
    {
      emoji: "👥",
      title: "Industry Insiders",
      description: "Our search consultants come from the sectors they serve. They speak your language, understand your challenges, and know where the talent hides."
    },
    {
      emoji: "🛡️",
      title: "Quality Over Quantity",
      description: "We don't flood your inbox with resumes. Every candidate we present has been vetted and confirmed interested. No resume dumps."
    }
  ];

  const values = [
    {
      emoji: "✅",
      title: "No Games. Straight Talk.",
      description: "We tell you what you need to hear. Not what's comfortable. No overpromising. No BS."
    },
    {
      emoji: "⭐",
      title: "Done When You've Hired",
      description: "We're not satisfied until you've hired the right person and they're producing results."
    },
    {
      emoji: "🤝",
      title: "Partnership Over Transactions",
      description: "We succeed when you succeed. That's why our clients keep coming back year after year."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            We Hunt. We Don't Post and Pray.
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Most staffing agencies throw resumes at you and hope something sticks. We work differently. Every search starts with understanding YOUR business—your culture, your challenges, your definition of success. Then we go find the exact person who fits.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {differentiators.map((item, index) => (
            <div key={index} className="text-center bg-card rounded-xl p-8 hover:shadow-lg transition-shadow border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl" role="img" aria-hidden="true">{item.emoji}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="bg-gradient-to-br from-muted/50 to-primary/5 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">How We Operate</h3>
            <p className="text-xl text-muted-foreground">
              Principles that guide every search, every conversation, every placement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl" role="img" aria-hidden="true">{value.emoji}</span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;