import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';
import { CommissionSplit } from '@/lib/ats/types';
import { cn } from '@/lib/utils';

interface FeeCalculatorProps {
  salary?: number;
  feeType?: 'percentage' | 'flat';
  feePercentage?: number;
  feeFlat?: number;
  commissionSplits?: CommissionSplit[];
  onChange?: (values: {
    salary: number;
    feeType: 'percentage' | 'flat';
    feePercentage: number;
    feeFlat: number;
    feeTotal: number;
  }) => void;
  readOnly?: boolean;
  compact?: boolean;
  className?: string;
}

export function FeeCalculator({
  salary: initialSalary = 0,
  feeType: initialFeeType = 'percentage',
  feePercentage: initialFeePercentage = 20,
  feeFlat: initialFeeFlat = 0,
  commissionSplits = [],
  onChange,
  readOnly = false,
  compact = false,
  className
}: FeeCalculatorProps) {
  const [salary, setSalary] = useState(initialSalary);
  const [feeType, setFeeType] = useState<'percentage' | 'flat'>(initialFeeType);
  const [feePercentage, setFeePercentage] = useState(initialFeePercentage);
  const [feeFlat, setFeeFlat] = useState(initialFeeFlat);

  // Calculate total fee
  const feeTotal = useMemo(() => {
    if (feeType === 'percentage') {
      return (salary * feePercentage) / 100;
    }
    return feeFlat;
  }, [salary, feeType, feePercentage, feeFlat]);

  // Calculate commission splits
  const splitAmounts = useMemo(() => {
    return commissionSplits.map(split => ({
      ...split,
      amount: (feeTotal * split.percentage) / 100
    }));
  }, [feeTotal, commissionSplits]);

  // Notify parent of changes
  useEffect(() => {
    onChange?.({
      salary,
      feeType,
      feePercentage,
      feeFlat,
      feeTotal
    });
  }, [salary, feeType, feePercentage, feeFlat, feeTotal, onChange]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (compact) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Salary</Label>
            <Input
              type="number"
              value={salary || ''}
              onChange={(e) => setSalary(Number(e.target.value))}
              placeholder="150000"
              disabled={readOnly}
              className="h-8"
            />
          </div>
          <div>
            <Label className="text-xs">
              {feeType === 'percentage' ? 'Fee %' : 'Flat Fee'}
            </Label>
            <Input
              type="number"
              value={feeType === 'percentage' ? feePercentage : feeFlat}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (feeType === 'percentage') {
                  setFeePercentage(val);
                } else {
                  setFeeFlat(val);
                }
              }}
              disabled={readOnly}
              className="h-8"
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Calculated Fee:</span>
          <span className="font-semibold text-primary">{formatCurrency(feeTotal)}</span>
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-primary" />
          Fee Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Base Salary */}
        <div className="space-y-2">
          <Label htmlFor="salary">Base Salary</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="salary"
              type="number"
              value={salary || ''}
              onChange={(e) => setSalary(Number(e.target.value))}
              placeholder="150000"
              disabled={readOnly}
              className="pl-9"
            />
          </div>
        </div>

        {/* Fee Type */}
        <div className="space-y-2">
          <Label>Fee Type</Label>
          <RadioGroup
            value={feeType}
            onValueChange={(value: 'percentage' | 'flat') => setFeeType(value)}
            disabled={readOnly}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage" className="cursor-pointer">Percentage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flat" id="flat" />
              <Label htmlFor="flat" className="cursor-pointer">Flat Fee</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Fee Rate/Amount */}
        <div className="space-y-2">
          <Label htmlFor="feeValue">
            {feeType === 'percentage' ? 'Fee Rate (%)' : 'Flat Fee Amount'}
          </Label>
          <div className="relative">
            {feeType === 'flat' && (
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              id="feeValue"
              type="number"
              value={feeType === 'percentage' ? feePercentage : feeFlat}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (feeType === 'percentage') {
                  setFeePercentage(val);
                } else {
                  setFeeFlat(val);
                }
              }}
              disabled={readOnly}
              className={feeType === 'flat' ? 'pl-9' : ''}
              placeholder={feeType === 'percentage' ? '20' : '25000'}
            />
            {feeType === 'percentage' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                %
              </span>
            )}
          </div>
        </div>

        <Separator />

        {/* Calculated Fee */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Calculated Fee:</span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(feeTotal)}
            </span>
          </div>

          {/* Commission Splits */}
          {splitAmounts.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <span className="text-sm font-medium">Commission Split:</span>
                {splitAmounts.map((split, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {split.agent_name} ({split.percentage}%)
                    </span>
                    <span className="font-medium">{formatCurrency(split.amount!)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
