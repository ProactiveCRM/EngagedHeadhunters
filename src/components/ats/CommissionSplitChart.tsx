import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChartIcon } from 'lucide-react';
import { CommissionSplit } from '@/lib/ats/types';
import { cn } from '@/lib/utils';

interface CommissionSplitChartProps {
  splits: CommissionSplit[];
  feeTotal?: number;
  className?: string;
  showCard?: boolean;
}

// Brand-aligned colors
const COLORS = [
  'hsl(200, 100%, 35%)', // Honolulu Blue
  'hsl(18, 100%, 60%)',  // Bright Orange
  'hsl(215, 100%, 17%)', // Dark Navy
  'hsl(210, 20%, 50%)',  // Cool Gray variant
  'hsl(200, 80%, 50%)',  // Lighter Blue
  'hsl(18, 80%, 50%)',   // Lighter Orange
];

export function CommissionSplitChart({
  splits,
  feeTotal = 0,
  className,
  showCard = true
}: CommissionSplitChartProps) {
  const chartData = useMemo(() => {
    return splits.map((split, index) => ({
      name: split.agent_name,
      value: split.percentage,
      amount: feeTotal > 0 ? (feeTotal * split.percentage) / 100 : 0,
      color: COLORS[index % COLORS.length]
    }));
  }, [splits, feeTotal]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3 text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-muted-foreground">{data.value}%</p>
          {data.amount > 0 && (
            <p className="font-semibold text-primary">{formatCurrency(data.amount)}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center gap-2 text-sm">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.value}</span>
            <span className="font-medium">{chartData[index]?.value}%</span>
          </li>
        ))}
      </ul>
    );
  };

  if (splits.length === 0) {
    return null;
  }

  const chartContent = (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      {feeTotal > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: '-40px' }}>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Total Fee</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(feeTotal)}</p>
          </div>
        </div>
      )}
    </div>
  );

  if (!showCard) {
    return <div className={cn("relative", className)}>{chartContent}</div>;
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <PieChartIcon className="h-5 w-5 text-primary" />
          Commission Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {chartContent}
      </CardContent>
    </Card>
  );
}
