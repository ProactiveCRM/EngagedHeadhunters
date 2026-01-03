// SEO Configuration and Constants
export const SEO_CONFIG = {
  siteName: 'Engaged Headhunters',
  siteUrl: 'https://www.engagedheadhunters.com',
  defaultImage: '/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png',
  twitterHandle: '@engagedheadhunters',
  locale: 'en_US',
  geoRegion: 'US-TX',
  geoPlacename: 'Houston',
  telephone: '+1-757-720-7173',
  email: 'contact@engagedheadhunters.com',
};

// Service page SEO data
export const SERVICE_SEO_DATA: Record<string, {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
}> = {
  'executive-search': {
    title: 'Executive Search & C-Suite Recruiting',
    description: 'Premier executive search firm specializing in CEO, CFO, and C-suite placements. Confidential leadership hiring with proven track record.',
    keywords: ['executive search', 'C-suite recruiting', 'CEO placement', 'CFO hiring', 'executive headhunter'],
    h1: 'Executive Search & Leadership Recruiting',
  },
  'healthcare-staffing': {
    title: 'Healthcare Staffing & Medical Recruiting',
    description: 'Expert healthcare staffing solutions for hospitals, clinics, and medical facilities. Nurses, physicians, and healthcare professionals.',
    keywords: ['healthcare staffing', 'medical recruiting', 'nurse staffing', 'physician placement', 'healthcare jobs'],
    h1: 'Healthcare Staffing & Medical Recruiting',
  },
  'technology-recruiting': {
    title: 'Technology Recruiting & IT Staffing',
    description: 'Top technology recruiting firm for software engineers, developers, and IT professionals. Expert tech talent acquisition.',
    keywords: ['technology recruiting', 'IT staffing', 'software developer jobs', 'tech talent', 'engineering recruiting'],
    h1: 'Technology Recruiting & IT Staffing',
  },
  'finance-recruiting': {
    title: 'Finance & Accounting Recruiting',
    description: 'Specialized finance recruiting for accounting, banking, and financial services. CFO, controller, and finance professional placement.',
    keywords: ['finance recruiting', 'accounting staffing', 'CFO search', 'financial services jobs', 'banking careers'],
    h1: 'Finance & Accounting Recruiting',
  },
  'manufacturing-recruiting': {
    title: 'Manufacturing & Industrial Recruiting',
    description: 'Manufacturing recruiting experts for plant managers, engineers, and operations professionals. Industrial staffing solutions.',
    keywords: ['manufacturing recruiting', 'industrial staffing', 'plant manager jobs', 'operations talent', 'supply chain'],
    h1: 'Manufacturing & Industrial Recruiting',
  },
  'sales-recruiting': {
    title: 'Sales Recruiting & Revenue Talent',
    description: 'Expert sales recruiting for account executives, sales managers, and revenue leaders. Build high-performing sales teams.',
    keywords: ['sales recruiting', 'sales staffing', 'account executive jobs', 'sales leadership', 'revenue talent'],
    h1: 'Sales Recruiting & Revenue Talent',
  },
  'contract-staffing': {
    title: 'Contract Staffing & Temporary Placement',
    description: 'Flexible contract staffing solutions for project-based needs. Skilled contractors for short and long-term assignments.',
    keywords: ['contract staffing', 'temporary placement', 'contract-to-hire', 'project staffing', 'flexible staffing'],
    h1: 'Contract Staffing & Temporary Placement',
  },
  'temporary-staffing': {
    title: 'Temporary Staffing & Temp Agency Services',
    description: 'Professional temporary staffing agency for immediate workforce needs. Quick placement of qualified temporary employees.',
    keywords: ['temporary staffing', 'temp agency', 'temp workers', 'temporary employees', 'workforce solutions'],
    h1: 'Temporary Staffing Solutions',
  },
};

// Career page SEO data
export const CAREER_SEO_DATA: Record<string, {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
}> = {
  'healthcare-careers': {
    title: 'Healthcare Careers & Medical Jobs',
    description: 'Find healthcare careers and medical jobs. Nursing, physician, and healthcare professional opportunities with top employers.',
    keywords: ['healthcare careers', 'medical jobs', 'nursing jobs', 'physician careers', 'healthcare opportunities'],
    h1: 'Healthcare Careers & Medical Jobs',
  },
  'technology-careers': {
    title: 'Technology Careers & IT Jobs',
    description: 'Explore technology careers and IT jobs. Software engineering, development, and tech professional opportunities.',
    keywords: ['technology careers', 'IT jobs', 'software jobs', 'tech careers', 'developer opportunities'],
    h1: 'Technology Careers & IT Jobs',
  },
  'finance-careers': {
    title: 'Finance & Accounting Careers',
    description: 'Discover finance careers and accounting jobs. Banking, financial services, and accounting professional opportunities.',
    keywords: ['finance careers', 'accounting jobs', 'banking careers', 'financial services jobs', 'CPA opportunities'],
    h1: 'Finance & Accounting Careers',
  },
  'executive-careers': {
    title: 'Executive Careers & Leadership Opportunities',
    description: 'Explore executive careers and C-suite opportunities. CEO, CFO, and leadership positions with premier organizations.',
    keywords: ['executive careers', 'leadership jobs', 'C-suite opportunities', 'executive positions', 'senior leadership'],
    h1: 'Executive Careers & Leadership Opportunities',
  },
  'manufacturing-careers': {
    title: 'Manufacturing Careers & Industrial Jobs',
    description: 'Find manufacturing careers and industrial jobs. Plant management, engineering, and operations opportunities.',
    keywords: ['manufacturing careers', 'industrial jobs', 'plant manager jobs', 'operations careers', 'engineering jobs'],
    h1: 'Manufacturing Careers & Industrial Jobs',
  },
  'sales-careers': {
    title: 'Sales Careers & Revenue Opportunities',
    description: 'Discover sales careers and business development opportunities. Account executive and sales leadership positions.',
    keywords: ['sales careers', 'sales jobs', 'account executive opportunities', 'business development', 'sales leadership'],
    h1: 'Sales Careers & Revenue Opportunities',
  },
  'contract-careers': {
    title: 'Contract Jobs & Freelance Opportunities',
    description: 'Find contract jobs and freelance opportunities. Flexible work arrangements for skilled professionals.',
    keywords: ['contract jobs', 'freelance opportunities', 'contract work', 'flexible jobs', 'project-based work'],
    h1: 'Contract Jobs & Freelance Opportunities',
  },
  'remote-careers': {
    title: 'Remote Jobs & Work From Home Careers',
    description: 'Explore remote jobs and work from home opportunities. Flexible remote positions across industries.',
    keywords: ['remote jobs', 'work from home', 'remote careers', 'telecommute jobs', 'virtual positions'],
    h1: 'Remote Jobs & Work From Home Careers',
  },
  'entry-level-careers': {
    title: 'Entry Level Jobs & Graduate Opportunities',
    description: 'Start your career with entry level jobs and graduate opportunities. Launch your professional journey.',
    keywords: ['entry level jobs', 'graduate jobs', 'first job', 'career starter', 'junior positions'],
    h1: 'Entry Level Jobs & Career Starters',
  },
};

// Career page FAQ data for structured data
export const CAREER_FAQ_DATA: Record<string, Array<{ question: string; answer: string }>> = {
  'healthcare-careers': [
    {
      question: 'What healthcare jobs are in highest demand?',
      answer: 'Registered nurses, nurse practitioners, physician assistants, and healthcare administrators are consistently in high demand. Specialized roles like critical care nurses and medical directors also see strong hiring activity.'
    },
    {
      question: 'What qualifications do I need for healthcare careers?',
      answer: 'Requirements vary by role. Clinical positions require relevant licenses (RN, MD, etc.) and certifications. Administrative roles typically need healthcare management degrees or equivalent experience. All roles benefit from HIPAA compliance training.'
    },
    {
      question: 'What is the average salary for healthcare professionals?',
      answer: 'Healthcare salaries range from $55,000-$90,000 for entry-level roles, $80,000-$145,000 for mid-level positions, and $120,000-$450,000+ for senior and executive positions, depending on specialty and location.'
    },
    {
      question: 'How long does the healthcare recruiting process take?',
      answer: 'The typical timeline is 2-4 weeks for initial placements. Executive and specialized physician roles may take 4-8 weeks due to credentialing and verification requirements.'
    }
  ],
  'technology-careers': [
    {
      question: 'What technology skills are most in-demand?',
      answer: 'Cloud computing (AWS, Azure), AI/ML, React/Node.js, Python, Kubernetes, and data engineering are among the most sought-after skills. DevOps and cybersecurity expertise are also in high demand.'
    },
    {
      question: 'Do I need a computer science degree for tech jobs?',
      answer: 'Not necessarily. Many tech roles value practical skills and portfolio work. Bootcamp graduates, self-taught developers, and career changers regularly land tech jobs. Certifications and demonstrable projects can substitute for formal degrees.'
    },
    {
      question: 'What is the salary range for software engineers?',
      answer: 'Software engineering salaries range from $70,000-$120,000 for entry-level, $120,000-$180,000 for mid-level, and $180,000-$350,000+ for senior and staff engineers, with variations based on location and company size.'
    },
    {
      question: 'How competitive is the tech job market?',
      answer: 'While competitive, demand for skilled tech professionals remains strong. Companies actively recruit candidates with in-demand skills. Building a strong portfolio, contributing to open source, and continuous learning help candidates stand out.'
    }
  ],
  'finance-careers': [
    {
      question: 'What are the highest-paying finance careers?',
      answer: 'Investment banking, private equity, hedge fund management, and CFO positions offer the highest compensation. Managing directors and partners can earn $500,000 to several million annually including bonuses.'
    },
    {
      question: 'What certifications are valuable in finance?',
      answer: 'CFA (Chartered Financial Analyst) is highly valued for investment roles. CPA is essential for accounting. CFP helps in wealth management. MBA from top programs enhances career prospects across finance.'
    },
    {
      question: 'How do I break into investment banking?',
      answer: 'Target top MBA programs or undergraduate finance programs at target schools. Secure internships at bulge bracket or boutique banks. Network extensively and prepare thoroughly for technical interviews and case studies.'
    },
    {
      question: 'What is the work-life balance in finance?',
      answer: 'It varies significantly. Investment banking is demanding (60-80+ hour weeks). Corporate finance offers better balance (45-55 hours). Fintech and financial planning typically have more reasonable schedules.'
    }
  ],
  'executive-careers': [
    {
      question: 'How do I transition to a C-suite role?',
      answer: 'Build a track record of P&L responsibility and strategic leadership. Develop cross-functional experience. Cultivate board relationships and executive presence. Work with executive recruiters who specialize in your industry.'
    },
    {
      question: 'What do executive search firms look for in candidates?',
      answer: 'Proven leadership results, strategic vision, cultural fit, board-ready presence, and relevant industry expertise. Track record of building teams, driving growth, and navigating complex challenges are essential.'
    },
    {
      question: 'How long does an executive search typically take?',
      answer: 'Executive searches typically take 3-6 months from engagement to offer acceptance. CEO and board searches may take longer due to confidentiality requirements and thorough vetting processes.'
    },
    {
      question: 'What is executive compensation like?',
      answer: 'C-suite compensation includes base salary, annual bonus, long-term incentives (equity/options), and benefits. Total compensation for Fortune 500 CEOs averages $15-20 million; mid-market CEOs typically earn $500K-$2M+.'
    }
  ],
  'manufacturing-careers': [
    {
      question: 'What manufacturing jobs are in high demand?',
      answer: 'Plant managers, quality engineers, maintenance managers, and supply chain professionals are highly sought after. Automation engineers and Industry 4.0 specialists are increasingly in demand.'
    },
    {
      question: 'What certifications help in manufacturing careers?',
      answer: 'Lean Six Sigma (Green/Black Belt), PMP for project management, APICS certifications for supply chain, and ISO auditor certifications enhance career prospects and earning potential.'
    },
    {
      question: 'Is manufacturing a stable career choice?',
      answer: 'Yes, manufacturing continues to grow with reshoring trends. Advanced manufacturing, automation, and sustainable production are driving demand for skilled professionals. Leadership roles offer excellent stability and compensation.'
    },
    {
      question: 'What is the salary range for plant managers?',
      answer: 'Plant manager salaries typically range from $100,000-$180,000, with bonuses adding 15-30%. Large facility directors and VP-level operations roles can earn $200,000-$350,000+.'
    }
  ],
  'sales-careers': [
    {
      question: 'What are the highest-paying sales roles?',
      answer: 'Enterprise sales, medical device sales, and SaaS sales offer the highest earning potential. Top performers in these fields regularly earn $200,000-$500,000+ with commission and bonuses.'
    },
    {
      question: 'How do I break into enterprise sales?',
      answer: 'Start in inside sales or SDR roles to learn the fundamentals. Build a track record of quota attainment. Develop consultative selling skills and industry expertise. Network with sales leaders and seek mentorship.'
    },
    {
      question: 'What skills are most important for sales success?',
      answer: 'Active listening, consultative selling, relationship building, and closing skills are fundamental. Technical knowledge of your product, CRM proficiency, and executive presence become increasingly important in senior roles.'
    },
    {
      question: 'Is sales a good career for work-life balance?',
      answer: 'It depends on the role and company. Inside sales often offers better balance than field sales. Remote sales positions provide flexibility. High-earning roles typically require significant time investment.'
    }
  ],
  'contract-careers': [
    {
      question: 'How do contract rates compare to full-time salaries?',
      answer: 'Contract rates are typically 30-50% higher than equivalent full-time hourly rates to account for benefits, taxes, and gaps between contracts. Senior consultants and interim executives command premium rates.'
    },
    {
      question: 'What are the benefits of contract work?',
      answer: 'Flexibility, variety of projects, higher hourly rates, and diverse experience. Contractors can choose projects, set schedules, and build expertise across multiple industries and companies.'
    },
    {
      question: 'How do I find contract opportunities?',
      answer: 'Work with specialized staffing agencies like Engaged Headhunters. Build a strong LinkedIn presence. Network in your industry. Develop a personal brand and portfolio showcasing your expertise.'
    },
    {
      question: 'Should I form an LLC for contract work?',
      answer: 'Often yes. An LLC provides liability protection, tax benefits, and professional credibility. Consult with a tax professional to determine the best business structure for your situation.'
    }
  ],
  'remote-careers': [
    {
      question: 'What jobs are best suited for remote work?',
      answer: 'Technology roles (software development, design), marketing and content creation, customer success, sales, and many finance roles work well remotely. Knowledge work that doesn\'t require physical presence adapts best.'
    },
    {
      question: 'Do remote jobs pay less than office jobs?',
      answer: 'Not necessarily. Many companies pay market rates regardless of location. Some adjust for cost of living. Top talent can command premium salaries for remote roles. Research specific company policies.'
    },
    {
      question: 'How do I stand out as a remote job candidate?',
      answer: 'Highlight remote work experience and self-management skills. Demonstrate strong written communication. Show results from previous remote or independent work. Be prepared to discuss your home office setup and work habits.'
    },
    {
      question: 'What are the challenges of remote work?',
      answer: 'Isolation, maintaining work-life boundaries, communication across time zones, and career visibility are common challenges. Successful remote workers develop routines, communicate proactively, and maintain professional networks.'
    }
  ],
  'entry-level-careers': [
    {
      question: 'How do I get a job with no experience?',
      answer: 'Focus on internships, volunteer work, and projects that demonstrate skills. Highlight transferable skills from education or part-time work. Network actively and consider entry-level programs designed for new graduates.'
    },
    {
      question: 'What entry-level jobs have the best career growth?',
      answer: 'Technology, healthcare, and finance offer strong career paths. Sales development roles lead to high-earning sales careers. Rotational programs at large companies provide diverse experience and advancement opportunities.'
    },
    {
      question: 'How long should I stay in my first job?',
      answer: 'Generally 1-2 years minimum to build credibility and skills. Leaving too soon can raise red flags. However, if there\'s no growth opportunity or the fit is poor, it may be worth moving on sooner.'
    },
    {
      question: 'What salary should I expect for an entry-level position?',
      answer: 'Entry-level salaries vary widely by industry and location. Technology roles start around $60,000-$85,000. Business roles range from $45,000-$65,000. Healthcare administrative roles start at $40,000-$55,000. Research specific roles in your target market.'
    }
  ],
};

// Location SEO data
export const LOCATION_SEO_DATA: Record<string, {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  geo: { lat: number; lng: number };
}> = {
  'houston': {
    title: 'Houston Recruiters & Staffing Agency',
    description: 'Top Houston recruiters and staffing agency. Local expertise in healthcare, energy, technology, and manufacturing recruiting.',
    keywords: ['Houston recruiters', 'Houston staffing', 'Houston headhunters', 'Houston jobs', 'Texas recruiting'],
    h1: 'Houston Recruiters & Staffing Services',
    geo: { lat: 29.7604, lng: -95.3698 },
  },
};

// Generate meta description from content
export const generateMetaDescription = (content: string, maxLength = 160): string => {
  const cleaned = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  if (cleaned.length <= maxLength) return cleaned;
  
  // Try to cut at sentence boundary
  const truncated = cleaned.substring(0, maxLength - 3);
  const lastSentence = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  const cutPoint = lastSentence > maxLength * 0.6 ? lastSentence + 1 : lastSpace;
  return truncated.substring(0, cutPoint).trim() + '...';
};

// Generate keywords from content
export const extractKeywords = (content: string, existingKeywords: string[] = []): string[] => {
  const text = content.toLowerCase().replace(/<[^>]*>/g, '');
  
  const industryTerms = [
    'recruiting', 'staffing', 'headhunter', 'talent', 'hiring', 'placement',
    'healthcare', 'technology', 'finance', 'manufacturing', 'sales', 'executive',
    'jobs', 'careers', 'opportunities', 'professionals', 'candidates', 'employers'
  ];
  
  const found = industryTerms.filter(term => text.includes(term));
  return [...new Set([...existingKeywords, ...found])].slice(0, 10);
};

// Generate canonical URL
export const generateCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
};

// Generate structured data script tag content
export const generateStructuredDataScript = (schema: object): string => {
  return JSON.stringify(schema);
};

// Optimized meta descriptions for all 36 pages
// Best practices applied:
// - Primary keyword in first 50 characters
// - 150-160 character total length
// - Action-oriented CTA at end
// - Unique descriptions (no duplicates)
export const PAGE_META_DESCRIPTIONS: Record<string, {
  title: string;
  description: string;
  keywords: string[];
}> = {
  // Core Pages (5)
  'home': {
    title: 'Executive Search Firm & Leadership Recruiting | Engaged Headhunters',
    description: 'Executive search specialists connecting growth-focused organizations with senior leadership talent. Request talent or find your next career opportunity today.',
    keywords: ['executive search', 'recruiting firm', 'headhunters', 'leadership recruiting', 'talent acquisition', 'staffing agency'],
  },
  'employers': {
    title: 'Hire Top Talent - Employer Recruiting Solutions | Engaged Headhunters',
    description: 'Streamline your hiring with our employer recruiting solutions. From executive search to contract staffing, find qualified candidates faster. Get started today.',
    keywords: ['employer recruiting', 'hiring solutions', 'talent acquisition', 'staffing services', 'executive search', 'contract staffing'],
  },
  'candidates': {
    title: 'Find Your Next Career - Job Opportunities | Engaged Headhunters',
    description: 'Discover career opportunities matched to your skills and goals. Connect with top employers through our recruiting network. Submit your resume now.',
    keywords: ['job opportunities', 'career search', 'job seekers', 'resume submission', 'career placement', 'professional jobs'],
  },
  'about': {
    title: 'About Engaged Headhunters - Our Story & Mission',
    description: 'Meet the team behind Engaged Headhunters. Industry-focused recruiters with proven placement track records. Learn about our mission and recruiting approach.',
    keywords: ['about us', 'recruiting team', 'company mission', 'placement track record', 'professional recruiters', 'staffing expertise'],
  },
  'contact': {
    title: 'Contact Engaged Headhunters - Get in Touch Today',
    description: 'Ready to connect? Contact our recruiting team for hiring solutions or career opportunities. Phone, email, or schedule a consultation online.',
    keywords: ['contact us', 'recruiting consultation', 'hiring help', 'career assistance', 'staffing inquiry', 'schedule meeting'],
  },

  // Service Pages (9)
  'services': {
    title: 'Recruiting Services - Full-Service Staffing Solutions | Engaged Headhunters',
    description: 'Explore our full suite of recruiting services from executive search to temporary staffing. Industry-specialized solutions for every hiring need. Request talent now.',
    keywords: ['recruiting services', 'staffing solutions', 'executive search', 'temporary staffing', 'contract hiring', 'talent acquisition'],
  },
  'executive-search': {
    title: 'Executive Search & C-Suite Recruiting | Engaged Headhunters',
    description: 'Premier executive search firm specializing in CEO, CFO, and C-suite placements. Confidential leadership hiring with placement guarantees. Schedule a consultation.',
    keywords: ['executive search', 'C-suite recruiting', 'CEO placement', 'CFO hiring', 'executive headhunter', 'leadership search'],
  },
  'contract-staffing': {
    title: 'Contract Staffing Solutions - Project-Based Hiring | Engaged Headhunters',
    description: 'Flexible contract staffing solutions for project-based hiring needs. Skilled contractors for IT, finance, engineering, and more. Request talent today.',
    keywords: ['contract staffing', 'project-based hiring', 'IT contractors', 'temp-to-hire', 'contract workers', 'flexible staffing'],
  },
  'temporary-staffing': {
    title: 'Temporary Staffing & Temp Agency Services | Engaged Headhunters',
    description: 'Professional temporary staffing for immediate workforce needs. Quick placement of qualified temp employees with flexible terms. Get started now.',
    keywords: ['temporary staffing', 'temp agency', 'temp workers', 'short-term staffing', 'workforce solutions', 'temp placement'],
  },
  'healthcare-staffing': {
    title: 'Healthcare Staffing & Medical Recruiting | Engaged Headhunters',
    description: 'Expert healthcare staffing for hospitals, clinics, and medical facilities. Nurses, physicians, and allied health professionals. Request healthcare talent.',
    keywords: ['healthcare staffing', 'medical recruiting', 'nurse staffing', 'physician placement', 'allied health', 'hospital staffing'],
  },
  'technology-recruiting': {
    title: 'Technology Recruiting & IT Staffing | Engaged Headhunters',
    description: 'Top technology recruiting firm for software engineers, developers, and IT leaders. Build your tech team with proven talent acquisition. Start hiring today.',
    keywords: ['technology recruiting', 'IT staffing', 'software engineers', 'tech talent', 'developer hiring', 'IT professionals'],
  },
  'finance-recruiting': {
    title: 'Finance & Accounting Recruiting | Engaged Headhunters',
    description: 'Specialized finance recruiting for accounting, banking, and financial services. From CFO searches to staff accountants. Connect with finance talent now.',
    keywords: ['finance recruiting', 'accounting staffing', 'CFO search', 'banking careers', 'financial services', 'CPA placement'],
  },
  'sales-recruiting': {
    title: 'Sales Recruiting & Revenue Talent | Engaged Headhunters',
    description: 'Expert sales recruiting to build high-performing revenue teams. Account executives, sales managers, and quota-crushing talent. Hire sales professionals today.',
    keywords: ['sales recruiting', 'sales staffing', 'account executives', 'sales managers', 'revenue talent', 'sales hiring'],
  },
  'manufacturing-recruiting': {
    title: 'Manufacturing & Industrial Recruiting | Engaged Headhunters',
    description: 'Manufacturing recruiting experts for plant managers, engineers, and operations leaders. Industrial staffing that drives production results. Request talent now.',
    keywords: ['manufacturing recruiting', 'industrial staffing', 'plant managers', 'operations talent', 'supply chain', 'production hiring'],
  },

  // Career Pages (10)
  'careers': {
    title: 'Find Career Opportunities - Jobs in Healthcare, Tech & More | Engaged Headhunters',
    description: 'Find your next career opportunity with Engaged Headhunters. Browse jobs in healthcare, technology, finance, and more. Submit your resume and get matched today.',
    keywords: ['career opportunities', 'job search', 'professional jobs', 'career placement', 'job matching', 'resume submission'],
  },
  'healthcare-careers': {
    title: 'Healthcare Careers & Medical Jobs | Engaged Headhunters',
    description: 'Healthcare jobs and medical careers with top employers. Nursing, physician, and healthcare professional opportunities. Browse healthcare jobs or book a career call.',
    keywords: ['healthcare careers', 'medical jobs', 'nursing jobs', 'physician careers', 'healthcare opportunities', 'hospital jobs'],
  },
  'technology-careers': {
    title: 'Technology Careers & IT Jobs | Engaged Headhunters',
    description: 'Technology jobs for software engineers, developers, and IT professionals. Remote and on-site opportunities with leading companies. Explore tech careers now.',
    keywords: ['technology careers', 'IT jobs', 'software engineering', 'developer jobs', 'tech opportunities', 'remote tech jobs'],
  },
  'finance-careers': {
    title: 'Finance & Accounting Careers | Engaged Headhunters',
    description: 'Finance and accounting jobs with premier employers. Banking, financial services, and corporate finance opportunities. Find your finance career today.',
    keywords: ['finance careers', 'accounting jobs', 'banking careers', 'financial services', 'CPA opportunities', 'finance professionals'],
  },
  'executive-careers': {
    title: 'Executive Careers & C-Suite Opportunities | Engaged Headhunters',
    description: 'Executive and C-suite career opportunities with leading organizations. CEO, CFO, and senior leadership positions. Connect with executive recruiters now.',
    keywords: ['executive careers', 'C-suite opportunities', 'CEO positions', 'CFO jobs', 'leadership careers', 'senior executive'],
  },
  'manufacturing-careers': {
    title: 'Manufacturing Careers & Industrial Jobs | Engaged Headhunters',
    description: 'Manufacturing and industrial careers with growing companies. Plant management, engineering, and operations jobs. Browse manufacturing opportunities today.',
    keywords: ['manufacturing careers', 'industrial jobs', 'plant manager jobs', 'operations careers', 'engineering jobs', 'production'],
  },
  'sales-careers': {
    title: 'Sales Careers & Business Development Jobs | Engaged Headhunters',
    description: 'Sales jobs and business development opportunities. Account executive, sales manager, and revenue leadership roles. Launch your sales career now.',
    keywords: ['sales careers', 'sales jobs', 'business development', 'account executive', 'sales manager', 'revenue roles'],
  },
  'contract-careers': {
    title: 'Contract Jobs & Consulting Opportunities | Engaged Headhunters',
    description: 'Contract, consulting, and freelance job opportunities. Flexible work arrangements for skilled professionals. Explore contract positions today.',
    keywords: ['contract jobs', 'consulting opportunities', 'freelance work', 'flexible jobs', 'project-based work', 'temp-to-hire'],
  },
  'remote-careers': {
    title: 'Remote Jobs & Work From Home Careers | Engaged Headhunters',
    description: 'Remote jobs and work-from-home career opportunities. Flexible positions across technology, sales, and business roles. Find remote work now.',
    keywords: ['remote jobs', 'work from home', 'remote careers', 'telecommute', 'flexible work', 'virtual positions'],
  },
  'entry-level-careers': {
    title: 'Entry Level Jobs & Graduate Opportunities | Engaged Headhunters',
    description: 'Entry-level jobs and graduate career opportunities. Start your professional journey with mentorship and growth potential. Apply to entry-level positions today.',
    keywords: ['entry level jobs', 'graduate jobs', 'first job', 'career starter', 'junior positions', 'new graduates'],
  },

  // Location Pages (2)
  'locations': {
    title: 'Recruiting Locations - Texas & Nationwide Coverage | Engaged Headhunters',
    description: 'Recruiting services across Texas and nationwide. Local expertise in Houston, Dallas, Austin, and major markets. Find recruiters in your area today.',
    keywords: ['recruiting locations', 'Texas recruiters', 'Houston staffing', 'Dallas recruiting', 'nationwide staffing', 'local recruiters'],
  },
  'houston': {
    title: 'Houston Recruiters & Staffing Agency | Engaged Headhunters',
    description: 'Houston recruiters and staffing agency with deep local expertise. Healthcare, energy, technology, and manufacturing recruiting. Connect with Houston talent specialists.',
    keywords: ['Houston recruiters', 'Houston staffing', 'Houston headhunters', 'Houston jobs', 'Texas recruiting', 'Houston hiring'],
  },

  // Other Pages (12)
  'blog': {
    title: 'Recruiting Blog - Industry Insights & Career Advice | Engaged Headhunters',
    description: 'Recruiting insights, career advice, and hiring trends from Engaged Headhunters. Expert perspectives on talent acquisition and career development. Read now.',
    keywords: ['recruiting blog', 'career advice', 'hiring trends', 'industry insights', 'talent acquisition', 'job search tips'],
  },
  'agents': {
    title: 'Meet Our Recruiting Agents - Industry Specialists | Engaged Headhunters',
    description: 'Meet our recruiting agents specializing in healthcare, technology, finance, and more. Connect with industry experts who understand your hiring needs. View directory.',
    keywords: ['recruiting agents', 'industry specialists', 'headhunters directory', 'talent experts', 'recruiters team', 'hiring professionals'],
  },
  'niches': {
    title: 'Industry Niches - Specialized Recruiting | Engaged Headhunters',
    description: 'Industry-specialized recruiting across healthcare, technology, finance, manufacturing, and more. Find recruiters who speak your industry language. Explore niches.',
    keywords: ['industry niches', 'specialized recruiting', 'niche staffing', 'vertical recruiting', 'industry expertise', 'sector focus'],
  },
  'alliance': {
    title: 'Join The Alliance - Recruiter Network | Engaged Headhunters',
    description: 'Join The Alliance - our network of elite recruiters. Collaborate, share resources, and grow your recruiting business. Apply to become an Alliance member.',
    keywords: ['recruiter alliance', 'recruiting network', 'recruiter partnership', 'staffing collaboration', 'recruiter community', 'alliance membership'],
  },
  'for-recruiters': {
    title: 'For Recruiters - Partnership & Resources | Engaged Headhunters',
    description: 'Resources and partnership opportunities for independent recruiters. Join our Alliance, access tools, and expand your network. Learn more today.',
    keywords: ['for recruiters', 'recruiter resources', 'staffing partnerships', 'recruiting tools', 'recruiter network', 'business growth'],
  },
  'book-talent': {
    title: 'Book a Talent Consultation - Hire Top Candidates | Engaged Headhunters',
    description: 'Schedule a consultation to discuss your hiring needs. Connect with recruiting specialists who understand your industry. Book your talent strategy call now.',
    keywords: ['book consultation', 'talent strategy', 'hiring consultation', 'recruiting call', 'staffing meeting', 'talent acquisition'],
  },
  'book-career': {
    title: 'Book a Career Consultation - Job Search Help | Engaged Headhunters',
    description: 'Book a career consultation with experienced recruiters. Get personalized job search guidance and access to hidden opportunities. Schedule your call today.',
    keywords: ['career consultation', 'job search help', 'career guidance', 'recruiter meeting', 'career coaching', 'job placement'],
  },
  'submit-resume': {
    title: 'Submit Your Resume - Join Our Talent Network | Engaged Headhunters',
    description: 'Submit your resume to our talent network. Get matched with opportunities aligned to your skills and career goals. Start your job search journey now.',
    keywords: ['submit resume', 'talent network', 'job application', 'resume upload', 'career matching', 'job seekers'],
  },
  'salary-guide': {
    title: 'Salary Guide - Compensation Insights by Role | Engaged Headhunters',
    description: 'Free salary guide and compensation insights by role and industry. Benchmark salaries for healthcare, technology, finance, and more. Access your guide now.',
    keywords: ['salary guide', 'compensation insights', 'salary benchmarks', 'pay rates', 'industry salaries', 'wage data'],
  },
  'resources': {
    title: 'Career Resources - Hiring Guides & Tools | Engaged Headhunters',
    description: 'Career resources, hiring guides, and recruiting insights. Tools and content to help employers hire and candidates succeed. Explore our resource library.',
    keywords: ['career resources', 'hiring guides', 'recruiting tools', 'job search resources', 'employer guides', 'candidate resources'],
  },
  'partners': {
    title: 'Partner Services - Solutions for HR Professionals | Engaged Headhunters',
    description: 'Partner services and solutions for recruiters and HR professionals. Tools, technology, and resources to enhance your recruiting. View partner offerings.',
    keywords: ['partner services', 'HR solutions', 'recruiting tools', 'staffing technology', 'HR resources', 'recruitment partners'],
  },
  'case-studies': {
    title: 'Case Studies - Recruiting Success Stories | Engaged Headhunters',
    description: 'Recruiting success stories and client case studies. See how we have helped companies build winning teams. Read our placement success stories.',
    keywords: ['case studies', 'success stories', 'client testimonials', 'placement results', 'recruiting wins', 'hiring success'],
  },
  'privacy-policy': {
    title: 'Privacy Policy | Engaged Headhunters',
    description: 'Privacy policy for Engaged Headhunters. Learn how we protect your personal information and data. Your privacy and security matter to us.',
    keywords: ['privacy policy', 'data protection', 'personal information', 'security', 'privacy rights', 'data handling'],
  },
  'terms-of-service': {
    title: 'Terms of Service | Engaged Headhunters',
    description: 'Terms of service for Engaged Headhunters recruiting services. Understand our agreements, policies, and service commitments.',
    keywords: ['terms of service', 'service agreement', 'legal terms', 'policies', 'user agreement', 'service terms'],
  },
};
