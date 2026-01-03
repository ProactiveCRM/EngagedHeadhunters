import { useRouter } from 'next/navigation';
import { AlertCircle, AlertTriangle, CheckCircle2, FileText, TrendingUp, Code, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SEOScoreGauge } from '@/components/admin/SEOScoreGauge';
import { SEOPageTable } from '@/components/admin/SEOPageTable';
import { SEOIssuesList } from '@/components/admin/SEOIssuesList';
import { BulkSEOActions } from '@/components/admin/BulkSEOActions';
import { useSEOAudit } from '@/hooks/useSEOAudit';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function SEOAuditDashboard() {
  const navigate = useRouter();
  const { 
    audit, 
    loading, 
    refetch, 
    seedMissingPages, 
    bulkUpdateFromConfig, 
    exportReport,
    isUpdating 
  } = useSEOAudit();
  
  const handleEditPage = (slug: string) => {
    router.push(`/admin/seo?page=${slug}`);
  };
  
  const handleSeedMissing = async () => {
    try {
      await seedMissingPages();
      toast.success('Missing pages seeded successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to seed pages');
    }
  };
  
  const handleBulkUpdate = async () => {
    try {
      await bulkUpdateFromConfig();
      toast.success('SEO data updated from config');
      refetch();
    } catch (error) {
      toast.error('Failed to update SEO data');
    }
  };
  
  const issueCategories = [
    { 
      title: 'Missing Meta Titles', 
      type: 'critical' as const, 
      pages: audit.issues.missingTitles,
      fixLabel: 'Generate Titles',
    },
    { 
      title: 'Missing Meta Descriptions', 
      type: 'critical' as const, 
      pages: audit.issues.missingDescriptions,
      fixLabel: 'Generate Descriptions',
    },
    { 
      title: 'Missing OG Images', 
      type: 'warning' as const, 
      pages: audit.issues.missingOGImages,
      fixLabel: 'Set Default',
    },
    { 
      title: 'No Keywords', 
      type: 'warning' as const, 
      pages: audit.issues.missingKeywords,
    },
    { 
      title: 'Missing Structured Data', 
      type: 'info' as const, 
      pages: audit.issues.missingStructuredData,
      fixLabel: 'Add Schema',
    },
    { 
      title: 'Title Too Long (>60 chars)', 
      type: 'warning' as const, 
      pages: audit.issues.titleTooLong,
    },
    { 
      title: 'Title Too Short (<30 chars)', 
      type: 'info' as const, 
      pages: audit.issues.titleTooShort,
    },
    { 
      title: 'Description Too Long (>160 chars)', 
      type: 'warning' as const, 
      pages: audit.issues.descriptionTooLong,
    },
    { 
      title: 'Description Too Short (<120 chars)', 
      type: 'info' as const, 
      pages: audit.issues.descriptionTooShort,
    },
  ];
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">SEO Audit Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and optimize SEO across all {audit.totalPages} pages
            </p>
          </div>
          <BulkSEOActions
            onSeedMissing={handleSeedMissing}
            onBulkUpdate={handleBulkUpdate}
            onExport={exportReport}
            onRefresh={refetch}
            isUpdating={isUpdating}
            missingCount={audit.totalPages - audit.auditedPages}
            configuredCount={audit.auditedPages}
          />
        </div>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="md:col-span-1">
            <CardContent className="pt-6 flex justify-center">
              <SEOScoreGauge score={audit.overallScore} size="lg" label="Overall Score" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Pages</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-muted-foreground" />
                {audit.totalPages}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {audit.auditedPages} with SEO data
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Critical Issues</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2 text-destructive">
                <AlertCircle className="h-6 w-6" />
                {audit.criticalIssues}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pages scoring below 50
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Warnings</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2 text-yellow-500">
                <AlertTriangle className="h-6 w-6" />
                {audit.warnings}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pages scoring 50-79
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Optimized</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2 text-green-500">
                <CheckCircle2 className="h-6 w-6" />
                {audit.optimized}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pages scoring 80+
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="pages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pages" className="gap-2">
              <FileText className="h-4 w-4" />
              All Pages
            </TabsTrigger>
            <TabsTrigger value="issues" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Issues by Category
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Page-by-Page SEO Scores</CardTitle>
                <CardDescription>
                  View and manage SEO settings for all pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SEOPageTable pages={audit.pages} onEditPage={handleEditPage} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Issues by Category</CardTitle>
                <CardDescription>
                  Grouped view of all SEO issues across your site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SEOIssuesList 
                  categories={issueCategories} 
                  onEditPage={handleEditPage}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Wins</CardTitle>
                  <CardDescription>
                    Easy fixes that will improve your SEO score
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {audit.issues.missingTitles.length > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10">
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium">Add meta titles</p>
                        <p className="text-sm text-muted-foreground">
                          {audit.issues.missingTitles.length} pages are missing titles. Each could gain 30 points.
                        </p>
                      </div>
                    </div>
                  )}
                  {audit.issues.missingDescriptions.length > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10">
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium">Add meta descriptions</p>
                        <p className="text-sm text-muted-foreground">
                          {audit.issues.missingDescriptions.length} pages are missing descriptions. Each could gain 30 points.
                        </p>
                      </div>
                    </div>
                  )}
                  {audit.issues.missingKeywords.length > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Add keywords</p>
                        <p className="text-sm text-muted-foreground">
                          {audit.issues.missingKeywords.length} pages have no keywords. Add 3-5 relevant terms.
                        </p>
                      </div>
                    </div>
                  )}
                  {audit.issues.missingOGImages.length > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Add Open Graph images</p>
                        <p className="text-sm text-muted-foreground">
                          {audit.issues.missingOGImages.length} pages will look plain when shared on social media.
                        </p>
                      </div>
                    </div>
                  )}
                  {audit.issues.missingStructuredData.length > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Add structured data</p>
                        <p className="text-sm text-muted-foreground">
                          {audit.issues.missingStructuredData.length} key pages could benefit from JSON-LD schema for rich results.
                        </p>
                      </div>
                    </div>
                  )}
                  {audit.criticalIssues === 0 && audit.warnings === 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Great job!</p>
                        <p className="text-sm text-muted-foreground">
                          All pages have essential SEO elements configured.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SEO Score Breakdown</CardTitle>
                  <CardDescription>
                    How your pages are distributed by score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-green-600">Excellent (80-100)</span>
                        <span className="text-sm text-muted-foreground">{audit.optimized} pages</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ width: `${(audit.optimized / audit.totalPages) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-yellow-600">Needs Work (50-79)</span>
                        <span className="text-sm text-muted-foreground">{audit.warnings} pages</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 transition-all duration-500"
                          style={{ width: `${(audit.warnings / audit.totalPages) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-destructive">Critical (0-49)</span>
                        <span className="text-sm text-muted-foreground">{audit.criticalIssues} pages</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-destructive transition-all duration-500"
                          style={{ width: `${(audit.criticalIssues / audit.totalPages) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
