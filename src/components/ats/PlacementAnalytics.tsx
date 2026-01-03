import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  TrendingUp, DollarSign, Clock, Shield, CheckCircle2, 
  AlertTriangle, Calendar, Briefcase 
} from 'lucide-react';
import { Placement } from '@/lib/ats/types';
import { format, startOfMonth, parseISO, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface PlacementAnalyticsProps {
  placements: Placement[];
  className?: string;
}

const CHART_COLORS = {
  primary: 'hsl(200, 100%, 35%)',
  secondary: 'hsl(18, 100%, 60%)',
  tertiary: 'hsl(215, 100%, 17%)',
  muted: 'hsl(210, 20%, 75%)',
  success: 'hsl(142, 76%, 36%)',
  warning: 'hsl(38, 92%, 50%)',
  danger: 'hsl(0, 84%, 60%)',
};

export function PlacementAnalytics({ placements, className }: PlacementAnalyticsProps) {
  // KPI Calculations
  const kpis = useMemo(() => {
    const now = new Date();
    const paidPlacements = placements.filter(p => p.fee_status === 'paid');
    
    // Average time to payment
    const paymentTimes = paidPlacements
      .filter(p => p.start_date && p.fee_paid_date)
      .map(p => differenceInDays(parseISO(p.fee_paid_date!), parseISO(p.start_date!)));
    const avgPaymentTime = paymentTimes.length > 0 
      ? Math.round(paymentTimes.reduce((a, b) => a + b, 0) / paymentTimes.length)
      : 0;
    
    // Guarantee clear rate
    const withGuarantee = placements.filter(p => p.guarantee_period_days);
    const clearedGuarantees = withGuarantee.filter(p => p.fee_status === 'paid');
    const guaranteeClearRate = withGuarantee.length > 0 
      ? Math.round((clearedGuarantees.length / withGuarantee.length) * 100)
      : 0;
    
    // YTD Revenue
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const ytdRevenue = placements
      .filter(p => p.fee_status === 'paid' && p.fee_paid_date && parseISO(p.fee_paid_date) >= yearStart)
      .reduce((sum, p) => sum + (p.fee_total || 0), 0);
    
    // Average placement fee
    const avgFee = paidPlacements.length > 0
      ? paidPlacements.reduce((sum, p) => sum + (p.fee_total || 0), 0) / paidPlacements.length
      : 0;
    
    return {
      avgPaymentTime,
      guaranteeClearRate,
      ytdRevenue,
      avgFee,
      totalPlacements: placements.length,
      paidCount: paidPlacements.length
    };
  }, [placements]);

  // Monthly Revenue Chart Data
  const monthlyRevenueData = useMemo(() => {
    const monthlyData: Record<string, { month: string; pending: number; paid: number }> = {};
    
    placements.forEach(p => {
      if (!p.start_date) return;
      const monthKey = format(startOfMonth(parseISO(p.start_date)), 'MMM yyyy');
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, pending: 0, paid: 0 };
      }
      
      const fee = p.fee_total || 0;
      if (p.fee_status === 'paid') {
        monthlyData[monthKey].paid += fee;
      } else {
        monthlyData[monthKey].pending += fee;
      }
    });
    
    return Object.values(monthlyData).slice(-6); // Last 6 months
  }, [placements]);

  // Placement Type Distribution
  const placementTypeData = useMemo(() => {
    const types: Record<string, number> = {};
    placements.forEach(p => {
      const type = p.placement_type || 'permanent';
      types[type] = (types[type] || 0) + 1;
    });
    
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [placements]);

  // Fee Status Distribution
  const feeStatusData = useMemo(() => {
    const statuses: Record<string, number> = {};
    placements.forEach(p => {
      const status = p.fee_status || 'pending';
      statuses[status] = (statuses[status] || 0) + 1;
    });
    
    const statusOrder = ['pending', 'invoiced', 'partial', 'paid'];
    return statusOrder
      .filter(s => statuses[s])
      .map(name => ({ 
        name: name.charAt(0).toUpperCase() + name.slice(1), 
        value: statuses[name] 
      }));
  }, [placements]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3 text-sm">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex items-center gap-2">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium">{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Time to Payment</p>
                <p className="text-2xl font-bold">{kpis.avgPaymentTime} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Guarantee Clear Rate</p>
                <p className="text-2xl font-bold">{kpis.guaranteeClearRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">YTD Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(kpis.ytdRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Placement Fee</p>
                <p className="text-2xl font-bold">{formatCurrency(kpis.avgFee)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis tickFormatter={formatCurrency} className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="paid" name="Paid" fill={CHART_COLORS.success} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="Pending" fill={CHART_COLORS.warning} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Placement Types & Fee Status */}
        <div className="grid grid-rows-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Placement Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={placementTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {placementTypeData.map((_, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={[CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.tertiary][index % 3]} 
                        />
                      ))}
                    </Pie>
                    <Legend 
                      layout="vertical" 
                      align="right" 
                      verticalAlign="middle"
                      formatter={(value) => <span className="text-sm">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Fee Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feeStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {feeStatusData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.name === 'Paid' ? CHART_COLORS.success :
                            entry.name === 'Partial' ? CHART_COLORS.warning :
                            entry.name === 'Invoiced' ? CHART_COLORS.primary :
                            CHART_COLORS.muted
                          } 
                        />
                      ))}
                    </Pie>
                    <Legend 
                      layout="vertical" 
                      align="right" 
                      verticalAlign="middle"
                      formatter={(value) => <span className="text-sm">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
