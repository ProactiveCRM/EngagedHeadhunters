import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Globe, Twitter, Facebook, CheckCircle2, AlertCircle, XCircle, Code, ChevronDown, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { detectSchemaType, getAllSchemaTypes } from '@/lib/schemaValidation';
import type { PageSEOData } from '@/hooks/usePageSEO';

interface SEOPreviewProps {
  seo: Partial<PageSEOData>;
  pageUrl?: string;
}

function calculateSEOScore(seo: Partial<PageSEOData>): { score: number; issues: string[]; passed: string[] } {
  const issues: string[] = [];
  const passed: string[] = [];
  let score = 0;
  const maxScore = 100;
  
  // Meta title (20 points)
  const titleLen = seo.meta_title?.length || 0;
  if (titleLen === 0) {
    issues.push('Missing meta title');
  } else if (titleLen < 30) {
    issues.push('Meta title too short (< 30 chars)');
    score += 8;
  } else if (titleLen > 60) {
    issues.push('Meta title too long (> 60 chars)');
    score += 12;
  } else {
    passed.push('Meta title length optimal');
    score += 20;
  }
  
  // Meta description (20 points)
  const descLen = seo.meta_description?.length || 0;
  if (descLen === 0) {
    issues.push('Missing meta description');
  } else if (descLen < 70) {
    issues.push('Meta description too short (< 70 chars)');
    score += 8;
  } else if (descLen > 160) {
    issues.push('Meta description too long (> 160 chars)');
    score += 12;
  } else {
    passed.push('Meta description length optimal');
    score += 20;
  }
  
  // OG Image (15 points)
  if (seo.og_image) {
    passed.push('Open Graph image set');
    score += 15;
  } else {
    issues.push('Missing Open Graph image');
  }
  
  // OG Title/Description (15 points)
  if (seo.og_title || seo.meta_title) {
    score += 7.5;
    if (seo.og_title) passed.push('OG title customized');
  }
  if (seo.og_description || seo.meta_description) {
    score += 7.5;
    if (seo.og_description) passed.push('OG description customized');
  }
  
  // Keywords (10 points)
  if (seo.keywords && seo.keywords.length > 0) {
    passed.push(`${seo.keywords.length} keywords defined`);
    score += 10;
  } else {
    issues.push('No keywords defined');
  }
  
  // Structured Data (15 points)
  if (seo.structured_data) {
    const schemaType = detectSchemaType(seo.structured_data);
    if (schemaType) {
      passed.push(`${schemaType} schema configured`);
      score += 15;
    } else {
      passed.push('Custom structured data set');
      score += 10;
    }
  } else {
    issues.push('No structured data');
  }
  
  // Canonical URL (5 points)
  if (seo.canonical_url) {
    passed.push('Canonical URL set');
    score += 5;
  }
  
  return { score: Math.min(Math.round(score), maxScore), issues, passed };
}

export function SEOPreview({ seo, pageUrl = 'https://www.engagedheadhunters.com' }: SEOPreviewProps) {
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const fullUrl = `${pageUrl}${seo.page_slug === 'home' ? '' : `/${seo.page_slug}`}`;
  const { score, issues, passed } = calculateSEOScore(seo);
  
  const schemaType = seo.structured_data ? detectSchemaType(seo.structured_data) : null;
  
  const handleCopySchema = () => {
    if (seo.structured_data) {
      navigator.clipboard.writeText(JSON.stringify(seo.structured_data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600 dark:text-green-400';
    if (s >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-destructive';
  };
  
  const getProgressColor = (s: number) => {
    if (s >= 80) return 'bg-green-500';
    if (s >= 60) return 'bg-yellow-500';
    return 'bg-destructive';
  };
  
  return (
    <div className="space-y-4">
      {/* SEO Score Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/100</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={score} className={`h-2 ${getProgressColor(score)}`} />
          
          {issues.length > 0 && (
            <div className="space-y-1">
              {issues.slice(0, 3).map((issue, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <XCircle className="h-3 w-3 text-destructive flex-shrink-0" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          )}
          
          {passed.length > 0 && issues.length === 0 && (
            <div className="space-y-1">
              {passed.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google SERP Preview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Google Search Preview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-background p-4 rounded border space-y-1">
            {/* Breadcrumb-style URL */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <img src="/favicon.ico" alt="" className="h-4 w-4 rounded" />
              <span className="truncate">{fullUrl}</span>
            </div>
            <h3 className="text-lg text-[#1a0dab] dark:text-primary hover:underline cursor-pointer truncate">
              {seo.meta_title || 'Page Title'}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {seo.meta_description || 'Meta description will appear here. Keep it under 160 characters for best results.'}
            </p>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>Title:</span>
              <Badge variant={getTitleLengthVariant(seo.meta_title?.length || 0)}>
                {seo.meta_title?.length || 0}/60
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <span>Description:</span>
              <Badge variant={getDescLengthVariant(seo.meta_description?.length || 0)}>
                {seo.meta_description?.length || 0}/160
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Previews */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Facebook/LinkedIn Preview */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Facebook className="h-4 w-4 text-[#1877f2]" />
              <CardTitle className="text-sm font-medium">Facebook / LinkedIn</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded overflow-hidden">
              {seo.og_image ? (
                <img
                  src={seo.og_image}
                  alt="OG Preview"
                  className="w-full h-32 object-cover bg-muted"
                />
              ) : (
                <div className="w-full h-32 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  No image set
                </div>
              )}
              <div className="p-3 bg-muted/50 space-y-1">
                <p className="text-xs text-muted-foreground uppercase">engagedheadhunters.com</p>
                <h4 className="font-semibold text-sm line-clamp-2">
                  {seo.og_title || seo.meta_title || 'Open Graph Title'}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {seo.og_description || seo.meta_description || 'Open Graph description'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Twitter Preview */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Twitter className="h-4 w-4 text-[#1da1f2]" />
              <CardTitle className="text-sm font-medium">Twitter / X</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-xl overflow-hidden">
              {(seo.twitter_image || seo.og_image) ? (
                <img
                  src={seo.twitter_image || seo.og_image}
                  alt="Twitter Preview"
                  className="w-full h-32 object-cover bg-muted"
                />
              ) : (
                <div className="w-full h-32 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  No image set
                </div>
              )}
              <div className="p-3 space-y-1">
                <h4 className="font-semibold text-sm line-clamp-2">
                  {seo.twitter_title || seo.og_title || seo.meta_title || 'Twitter Title'}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {seo.twitter_description || seo.og_description || seo.meta_description || 'Twitter description'}
                </p>
                <p className="text-xs text-muted-foreground">engagedheadhunters.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Structured Data Preview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Structured Data</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {seo.structured_data ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                {getAllSchemaTypes(seo.structured_data).map((type, i) => (
                  <Badge key={i} variant="outline">{type}</Badge>
                ))}
                {!schemaType && <Badge variant="outline">Custom</Badge>}
                {schemaType === 'FAQ' && (
                  <Badge variant="secondary" className="text-xs">Rich Results Eligible</Badge>
                )}
                {schemaType === 'LocalBusiness' && (
                  <Badge variant="secondary" className="text-xs">Local Pack Eligible</Badge>
                )}
                {schemaType === 'Organization' && (
                  <Badge variant="secondary" className="text-xs">Knowledge Panel Eligible</Badge>
                )}
                {schemaType === 'Service' && (
                  <Badge variant="secondary" className="text-xs">Service Rich Results</Badge>
                )}
              </div>
              
              <Collapsible open={schemaOpen} onOpenChange={setSchemaOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    <span>View JSON-LD</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${schemaOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="relative mt-2">
                    <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48 font-mono">
                      {JSON.stringify(seo.structured_data, null, 2)}
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-1 right-1"
                      onClick={handleCopySchema}
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>No structured data configured</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getTitleLengthVariant(length: number): 'default' | 'secondary' | 'destructive' {
  if (length === 0) return 'secondary';
  if (length <= 60) return 'default';
  return 'destructive';
}

function getDescLengthVariant(length: number): 'default' | 'secondary' | 'destructive' {
  if (length === 0) return 'secondary';
  if (length <= 160) return 'default';
  return 'destructive';
}

export default SEOPreview;
