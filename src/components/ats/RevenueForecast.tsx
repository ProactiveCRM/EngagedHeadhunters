import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  Clock,
  Target,
  Download,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Line,
  Area
} from 'recharts';
import { 
  generateRevenueForecast, 
  formatForecastCurrency,
  type ForecastResult 
} from '@/lib/ats/forecasting';
import type { Placement, CandidateSubmission } from '@/lib/ats/types';
import { cn } from '@/lib/utils';

interface RevenueForecastProps {
  placements: Placement[];
  submissions?: CandidateSubmission[];
  className?: string;
}

export function RevenueForecast({ placements, submissions, className }: RevenueForecastProps) {
  const [forecastMonths] = useState(6);

  const forecast = useMemo(() => 
    generateRevenueForecast(placements, submissions, forecastMonths),
    [placements, submissions, forecastMonths]
  );

  // Prepare chart data
  const chartData = useMemo(() => 
    forecast.monthlyForecasts.map(m => ({
      month: m.month,
      confirmed: m.confirmedRevenue,
      expected: m.expectedRevenue,
      projected: m.projectedRevenue,
      pessimistic: m.pessimistic,
      expectedTotal: m.expected,
      optimistic: m.optimistic
    })),
    [forecast]
  );

  // Calculate YoY comparison (mock for now)
  const yoyChange = useMemo(() => {
    const currentYTD = placements
      .filter(p => p.fee_status === 'paid')
      .reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0);
    // Mock previous year - in real app, would query historical data
    const previousYTD = currentYTD * 0.85;
    const change = previousYTD > 0 ? ((currentYTD - previousYTD) / previousYTD) * 100 : 0;
    return { current: currentYTD, previous: previousYTD, change };
  }, [placements]);

  const handleExportCSV = () => {
    const headers = ['Month', 'Pessimistic', 'Expected', 'Optimistic'];
    const rows = forecast.monthlyForecasts.map(m => 
      [m.month, m.pessimistic, m.expected, m.optimistic].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revenue-forecast-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-medium">{formatForecastCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Revenue Forecast
          </h3>
          <p className="text-sm text-muted-foreground">
            {forecastMonths}-month projection based on historical performance
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Historical Metrics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <p className="text-lg font-bold">{forecast.metrics.historicalConversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Time to Pay</p>
                <p className="text-lg font-bold">{forecast.metrics.avgTimeToPaymentDays} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Placement Fee</p>
                <p className="text-lg font-bold">{formatForecastCurrency(forecast.metrics.avgPlacementFee)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                {yoyChange.change >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">YTD vs Last Year</p>
                <p className={cn(
                  "text-lg font-bold",
                  yoyChange.change >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {yoyChange.change >= 0 ? '+' : ''}{yoyChange.change.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{forecastMonths}-Month Revenue Projection</CardTitle>
          <CardDescription>Expected revenue by month with confidence ranges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tickFormatter={(value) => formatForecastCurrency(value)}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="pessimistic"
                  fill="hsl(var(--muted))"
                  stroke="none"
                  fillOpacity={0.3}
                  name="Pessimistic"
                />
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  fill="hsl(var(--primary))"
                  stroke="none"
                  fillOpacity={0.2}
                  name="Optimistic"
                />
                <Bar 
                  dataKey="confirmed" 
                  fill="hsl(142, 76%, 36%)" 
                  name="Confirmed"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expected" 
                  fill="hsl(217, 91%, 60%)" 
                  name="Expected"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="projected" 
                  fill="hsl(45, 93%, 47%)" 
                  name="Projected"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="expectedTotal"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                  name="Expected Total"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {forecast.scenarios.map((scenario, index) => (
          <Card 
            key={scenario.label}
            className={cn(
              index === 1 && "ring-2 ring-primary"
            )}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <Badge 
                  variant={index === 1 ? "default" : "secondary"}
                  className="mb-3"
                >
                  {scenario.label}
                </Badge>
                <p className="text-3xl font-bold mb-1">
                  {formatForecastCurrency(scenario.total)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {scenario.conversionRate}% conversion rate
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Pipeline Breakdown
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pending Placements</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  {forecast.pipeline.pendingPlacements.count}
                </Badge>
              </div>
              <p className="text-xl font-bold text-yellow-700 dark:text-yellow-400">
                {formatForecastCurrency(forecast.pipeline.pendingPlacements.total)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Potential value</p>
            </div>

            <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Invoiced</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {forecast.pipeline.invoicedPlacements.count}
                </Badge>
              </div>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                {formatForecastCurrency(forecast.pipeline.invoicedPlacements.total)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
            </div>

            <div className="p-4 rounded-lg border bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Partial Payments</span>
                <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  {forecast.pipeline.partialPayments.count}
                </Badge>
              </div>
              <p className="text-xl font-bold text-orange-700 dark:text-orange-400">
                {formatForecastCurrency(forecast.pipeline.partialPayments.remaining)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Remaining balance</p>
            </div>

            <div className="p-4 rounded-lg border bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Offers in Progress</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {forecast.pipeline.offersInProgress.count}
                </Badge>
              </div>
              <p className="text-xl font-bold text-purple-700 dark:text-purple-400">
                {formatForecastCurrency(forecast.pipeline.offersInProgress.estimatedValue)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Estimated value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-primary/20">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">3-Month Forecast</p>
                <p className="text-2xl font-bold">{formatForecastCurrency(forecast.threeMonthTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-accent/20">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">6-Month Forecast</p>
                <p className="text-2xl font-bold">{formatForecastCurrency(forecast.sixMonthTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
