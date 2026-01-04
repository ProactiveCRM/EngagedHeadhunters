import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useInView } from '@/hooks/useInView';
import { Typewriter } from '@/components/ui/typewriter';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import heroImage from '../assets/hero-recruiting.jpg';

const Hero = () => {
  const { trackCTAClick } = useAnalytics();
  const { getParallaxStyle } = useMouseParallax({ intensity: 0.015 });
  const { ref: trustRef, inView: trustInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const handleCTAClick = (ctaName: string, destination: string) => {
    trackCTAClick(ctaName, destination);
  };

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden bg-background">
      {/* Animated Gradient Background */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30" />

      {/* Animated Mesh Pattern */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Parallax Blob Decorations */}
      <div
        aria-hidden="true"
        className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[100px] animate-blob"
        style={getParallaxStyle(1.5)}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-primary/5 dark:bg-primary/15 rounded-full blur-[80px] animate-blob"
        style={{ ...getParallaxStyle(1), animationDelay: '-5s' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-accent/10 dark:bg-accent/20 rounded-full blur-[60px] animate-blob"
        style={{ ...getParallaxStyle(0.5), animationDelay: '-10s' }}
      />

      {/* Parallax Floating Geometric Shapes */}
      <div
        aria-hidden="true"
        className="absolute top-32 left-[15%] w-16 h-16 border border-primary/20 rounded-lg rotate-12 animate-float opacity-40"
        style={getParallaxStyle(2)}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-40 right-[20%] w-20 h-20 border border-primary/15 rounded-full animate-float opacity-30"
        style={{ ...getParallaxStyle(1.8), animationDelay: '-3s' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-[8%] w-12 h-12 bg-primary/10 rounded-lg rotate-45 animate-float opacity-50"
        style={{ ...getParallaxStyle(2.2), animationDelay: '-2s' }}
      />

      {/* Sparkle Effects near CTA */}
      <div aria-hidden="true" className="absolute top-[40%] left-[35%] hidden lg:block">
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-sparkle" style={{ animationDelay: '0s' }} />
      </div>
      <div aria-hidden="true" className="absolute top-[45%] left-[38%] hidden lg:block">
        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-sparkle" style={{ animationDelay: '0.7s' }} />
      </div>
      <div aria-hidden="true" className="absolute top-[35%] left-[40%] hidden lg:block">
        <div className="w-1 h-1 bg-primary/50 rounded-full animate-sparkle" style={{ animationDelay: '1.4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {/* Animated Badge */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-md text-primary px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                <span role="img" aria-hidden="true">✨</span>
                Executive Search Specialists
              </span>
            </div>

            {/* Enhanced Headline with Typewriter Effect */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.05] mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              A-Players Don't Apply.{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift">
                  <Typewriter
                    text="They Get Recruited."
                    delay={800}
                    speed={70}
                    showCursor={true}
                  />
                </span>
              </span>
            </h1>

            {/* Enhanced Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
              Job boards attract job seekers. We identify leaders who aren't on the market—passive talent your competitors don't know exists.
            </p>

            {/* Enhanced CTAs with Glow Effect */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 shadow-brand hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group animate-pulse-glow"
                onClick={() => handleCTAClick('Request Talent', '/employers')}
              >
                <Link href="/employers">
                  Request Talent
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                onClick={() => handleCTAClick('Explore Opportunities', '/candidates')}
              >
                <Link href="/candidates">
                  Explore Opportunities
                </Link>
              </Button>
            </div>

            {/* Animated Trust Indicators with staggered reveal */}
            <div
              ref={trustRef}
              className={`transition-all duration-700 ${trustInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
                <div
                  className={`flex items-center gap-2.5 text-muted-foreground group cursor-default transition-all duration-500 ${trustInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: '100ms' }}
                >
                  <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <span className="text-xl" role="img" aria-hidden="true">🛡️</span>
                  </div>
                  <span className="text-sm font-medium">Replacement Guarantee</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-border" />
                <div
                  className={`flex items-center gap-2.5 text-muted-foreground group cursor-default transition-all duration-500 ${trustInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <span className="text-xl" role="img" aria-hidden="true">👥</span>
                  </div>
                  <span className="text-sm font-medium">Sector Specialists</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-border" />
                <div
                  className={`flex items-center gap-2.5 text-muted-foreground group cursor-default transition-all duration-500 ${trustInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <span className="text-xl" role="img" aria-hidden="true">🔒</span>
                  </div>
                  <span className="text-sm font-medium">Confidential Searches</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section with Parallax */}
          <div
            className="animate-fade-in relative hidden md:block"
            style={{ ...getParallaxStyle(0.3), animationDelay: '200ms' }}
          >
            <div className="relative group">
              {/* Animated Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 dark:from-primary/40 dark:via-primary/20 dark:to-primary/40 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift bg-[length:200%_auto]" />

              {/* Main Image Card */}
              <div className="relative bg-card border border-border/50 rounded-2xl shadow-xl p-4 hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden rounded-xl">
                  <OptimizedImage
                    src={typeof heroImage === 'string' ? heroImage : heroImage.src}
                    alt="Executive recruiters connecting senior leadership with growth-focused organizations"
                    containerClassName="w-full h-72 lg:h-[400px]"
                    rounded="xl"
                    priority={true}
                  />
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                </div>

                {/* Floating Stats Card - Top Right with Animated Counter */}
                <div
                  className="absolute -top-4 -right-4 bg-card backdrop-blur-md p-4 rounded-xl shadow-xl border border-border animate-float"
                  style={{ ...getParallaxStyle(0.8), animationDelay: '-2s' }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      <AnimatedCounter end={95} suffix="%" duration={2000} />
                    </div>
                    <div className="text-xs text-foreground/70 font-medium">Success Rate</div>
                  </div>
                </div>

                {/* Additional Floating Stat - Years Experience */}
                <div
                  className="absolute top-1/4 -left-8 bg-card backdrop-blur-md p-3 rounded-xl shadow-xl border border-border animate-float hidden lg:block"
                  style={{ ...getParallaxStyle(1.2), animationDelay: '-4s' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-hidden="true">⏱️</span>
                    <div>
                      <div className="text-lg font-bold text-foreground">
                        <AnimatedCounter end={20} suffix="+" duration={1800} delay={200} />
                      </div>
                      <div className="text-[10px] text-foreground/70 font-medium">Years</div>
                    </div>
                  </div>
                </div>

                {/* Additional Floating Stat - Placements */}
                <div
                  className="absolute top-2/3 -right-6 bg-card backdrop-blur-md p-3 rounded-xl shadow-xl border border-border animate-float hidden lg:block"
                  style={{ ...getParallaxStyle(1), animationDelay: '-1s' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-hidden="true">📈</span>
                    <div>
                      <div className="text-lg font-bold text-foreground">
                        <AnimatedCounter end={500} suffix="+" duration={2200} delay={400} />
                      </div>
                      <div className="text-[10px] text-foreground/70 font-medium">Placements</div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge - Bottom Left */}
                <div
                  className="absolute -bottom-6 -left-6 bg-card backdrop-blur-md p-5 rounded-xl shadow-xl border border-border animate-fade-in"
                  style={{ animationDelay: '500ms' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-xl">
                      <span className="text-2xl" role="img" aria-hidden="true">🛡️</span>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70 font-medium">Trusted By</div>
                      <div className="font-bold text-foreground text-lg">Fortune 500 to Startups</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <ScrollIndicator
        targetId="value-props"
        className="hidden md:flex"
      />
    </section>
  );
};

export default Hero;