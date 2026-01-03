import {
  Target,
  FileText,
  Clock,
  Heart,
  Code,
  TrendingUp,
  Factory,
  ShoppingBag,
  MapPin,
  BookOpen,
  Users,
  Briefcase,
  Building,
  GraduationCap,
  Laptop,
  DollarSign,
  FileCheck,
  Search,
  Bot,
  Handshake,
  Library,
  Wrench,
  Lightbulb,
  Award,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export interface NavSection {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
  viewAll?: {
    text: string;
    href: string;
  };
}

export interface FeaturedContent {
  type: 'promo' | 'cta' | 'resource';
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
  badge?: string;
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export interface MegaMenuData {
  id: string;
  label: string;
  columns: NavSection[];
  featured: FeaturedContent;
}

export const megaMenuData: Record<string, MegaMenuData> = {
  employers: {
    id: 'employers',
    label: 'For Employers',
    columns: [
      {
        title: 'Services',
        icon: Briefcase,
        items: [
          {
            name: 'Executive Search',
            href: '/executive-search',
            icon: Target,
            description: 'C-suite & senior leadership',
          },
          {
            name: 'Contract Staffing',
            href: '/contract-staffing',
            icon: FileText,
            description: 'Project-based teams',
          },
          {
            name: 'Temporary Staffing',
            href: '/temporary-staffing',
            icon: Clock,
            description: 'Short-term solutions',
          },
        ],
        viewAll: { text: 'All Services', href: '/services' },
      },
      {
        title: 'Industries',
        icon: Building,
        items: [
          {
            name: 'Healthcare',
            href: '/healthcare-staffing',
            icon: Heart,
            description: 'Medical & clinical roles',
          },
          {
            name: 'Technology',
            href: '/technology-recruiting',
            icon: Code,
            description: 'Software & IT talent',
          },
          {
            name: 'Finance',
            href: '/finance-recruiting',
            icon: TrendingUp,
            description: 'Banking & finance',
          },
          {
            name: 'Manufacturing',
            href: '/manufacturing-recruiting',
            icon: Factory,
            description: 'Operations & engineering',
          },
          {
            name: 'Sales',
            href: '/sales-recruiting',
            icon: ShoppingBag,
            description: 'Revenue & growth roles',
          },
        ],
        viewAll: { text: 'All Industries', href: '/niches' },
      },
    ],
    featured: {
      type: 'promo',
      title: 'Free Consultation',
      description: 'Discuss your hiring needs with an expert recruiter. Same-day response guaranteed.',
      cta: { text: 'Book Now', href: '/book/talent' },
      badge: 'Same-day response',
      secondaryCta: { text: 'View Case Studies', href: '/case-studies' },
    },
  },
  candidates: {
    id: 'candidates',
    label: 'For Candidates',
    columns: [
      {
        title: 'Career Paths',
        icon: GraduationCap,
        items: [
          {
            name: 'Healthcare Careers',
            href: '/healthcare-careers',
            icon: Heart,
            description: 'Medical & clinical positions',
          },
          {
            name: 'Technology Jobs',
            href: '/technology-careers',
            icon: Laptop,
            description: 'Software & IT opportunities',
          },
          {
            name: 'Finance Roles',
            href: '/finance-careers',
            icon: DollarSign,
            description: 'Banking & finance careers',
          },
          {
            name: 'Executive Positions',
            href: '/executive-careers',
            icon: Target,
            description: 'Senior leadership roles',
          },
          {
            name: 'Remote Work',
            href: '/remote-careers',
            icon: Laptop,
            description: 'Work from anywhere',
          },
        ],
        viewAll: { text: 'All Career Paths', href: '/candidates' },
      },
      {
        title: 'Resources',
        icon: BookOpen,
        items: [
          {
            name: 'Salary Guide',
            href: '/salary-guide',
            icon: DollarSign,
            description: 'Market compensation data',
          },
          {
            name: 'Job Locations',
            href: '/job-locations',
            icon: MapPin,
            description: 'Opportunities by region',
          },
          {
            name: 'Submit Resume',
            href: '/submit-resume',
            icon: FileCheck,
            description: 'Start your search',
          },
          {
            name: 'Browse Jobs',
            href: '/candidates',
            icon: Search,
            description: 'View open positions',
          },
        ],
      },
    ],
    featured: {
      type: 'cta',
      title: 'Confidential Career Consultation',
      description: 'Explore new opportunities with complete discretion. Your search stays private.',
      cta: { text: 'Book Career Call', href: '/book/career' },
      badge: '100% Confidential',
      secondaryCta: { text: 'Submit Resume', href: '/submit-resume' },
    },
  },
  recruiters: {
    id: 'recruiters',
    label: 'For Recruiters',
    columns: [
      {
        title: 'Tools & Resources',
        icon: Wrench,
        items: [
          {
            name: 'AI Recruiting Tools',
            href: '/for-recruiters',
            icon: Bot,
            description: '2-4 extra placements/month',
          },
          {
            name: 'Resources Hub',
            href: '/for-recruiters/resources',
            icon: Library,
            description: 'Training & templates',
          },
          {
            name: 'Partner Services',
            href: '/for-recruiters/partners',
            icon: Wrench,
            description: 'Vetted tools & providers',
          },
        ],
      },
      {
        title: 'Alliance Network',
        icon: Users,
        items: [
          {
            name: 'Join the Alliance',
            href: '/alliance',
            icon: Handshake,
            description: 'Keep your brand, gain support',
          },
          {
            name: 'BDB Methodology',
            href: '/for-recruiters#methodology',
            icon: Lightbulb,
            description: 'Build Don\'t Beg approach',
          },
          {
            name: 'Success Stories',
            href: '/case-studies',
            icon: Award,
            description: 'See recruiter results',
          },
          {
            name: 'Meet Our Agents',
            href: '/agents',
            icon: Users,
            description: 'Network partners',
          },
        ],
      },
    ],
    featured: {
      type: 'resource',
      title: 'Join the Network',
      description: 'Make 2-4 extra placements per month with AI tools and recruiter alliance support.',
      cta: { text: 'Apply to Partner', href: '/recruiter-signup' },
      badge: 'Now Accepting Partners',
      secondaryCta: { text: 'Agent Login', href: '/auth' },
    },
  },
};

export const standaloneLinks = [
  { name: 'Contact', href: '/contact' },
  { name: 'Agent Login', href: '/auth' },
];
