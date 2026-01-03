// Revenue Forecasting Calculation Utilities

import { differenceInDays, addDays, addMonths, format, isSameMonth, parseISO, startOfMonth } from 'date-fns';
import type { Placement, CandidateSubmission } from './types';

export interface ForecastMetrics {
  historicalConversionRate: number;
  avgTimeToPaymentDays: number;
  avgPlacementFee: number;
  guaranteeFalloutRate: number;
}

export interface MonthlyForecast {
  month: string;
  monthDate: Date;
  confirmedRevenue: number;
  expectedRevenue: number;
  projectedRevenue: number;
  pipelineRevenue: number;
  pessimistic: number;
  expected: number;
  optimistic: number;
}

export interface ForecastScenario {
  label: string;
  total: number;
  conversionRate: number;
  color: string;
}

export interface PipelineBreakdown {
  pendingPlacements: { count: number; total: number };
  invoicedPlacements: { count: number; total: number };
  partialPayments: { count: number; remaining: number };
  offersInProgress: { count: number; estimatedValue: number };
}

export interface ForecastResult {
  metrics: ForecastMetrics;
  monthlyForecasts: MonthlyForecast[];
  scenarios: ForecastScenario[];
  pipeline: PipelineBreakdown;
  sixMonthTotal: number;
  threeMonthTotal: number;
}

/**
 * Calculate historical metrics from paid placements
 */
export function calculateHistoricalMetrics(placements: Placement[]): ForecastMetrics {
  const paidPlacements = placements.filter(p => p.fee_status === 'paid');
  const allPlacements = placements.length;

  // Conversion rate: paid / total historical
  const conversionRate = allPlacements > 0 
    ? (paidPlacements.length / allPlacements) * 100 
    : 85; // Default assumption

  // Average time from start_date to fee_paid_date
  const paymentTimes = paidPlacements
    .filter(p => p.start_date && p.fee_paid_date)
    .map(p => differenceInDays(parseISO(p.fee_paid_date!), parseISO(p.start_date!)));

  const avgTimeToPayment = paymentTimes.length > 0
    ? paymentTimes.reduce((a, b) => a + b, 0) / paymentTimes.length
    : 45; // Default 45 days

  // Average placement fee
  const avgFee = paidPlacements.length > 0
    ? paidPlacements.reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0) / paidPlacements.length
    : 25000;

  // Guarantee fallout rate (placements that failed during guarantee)
  const guaranteeFallouts = placements.filter(p => {
    if (!p.start_date || !p.guarantee_period_days) return false;
    const guaranteeEnd = addDays(parseISO(p.start_date), p.guarantee_period_days);
    return p.fee_status === 'pending' && new Date() > guaranteeEnd;
  });
  const falloutRate = allPlacements > 0 
    ? (guaranteeFallouts.length / allPlacements) * 100 
    : 5;

  return {
    historicalConversionRate: Math.round(conversionRate),
    avgTimeToPaymentDays: Math.round(avgTimeToPayment),
    avgPlacementFee: Math.round(avgFee),
    guaranteeFalloutRate: Math.round(falloutRate)
  };
}

/**
 * Calculate scenario-based revenue total
 */
function calculateScenarioRevenue(
  placements: Placement[], 
  conversionRate: number
): number {
  const pendingTotal = placements
    .filter(p => p.fee_status === 'pending')
    .reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0);
  
  const invoicedTotal = placements
    .filter(p => p.fee_status === 'invoiced')
    .reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0);
  
  const partialTotal = placements
    .filter(p => p.fee_status === 'partial')
    .reduce((sum, p) => sum + (Number(p.fee_total) || 0) * 0.5, 0); // Assume 50% remaining

  // Apply conversion rate to pending, higher rate to invoiced
  return (
    (pendingTotal * conversionRate) +
    (invoicedTotal * Math.min(conversionRate * 1.1, 1)) +
    partialTotal
  );
}

/**
 * Project monthly revenue based on expected payment dates
 */
export function projectMonthlyRevenue(
  placements: Placement[],
  metrics: ForecastMetrics,
  months: number = 6
): MonthlyForecast[] {
  const forecasts: MonthlyForecast[] = [];
  const now = new Date();

  for (let i = 0; i < months; i++) {
    const targetMonth = addMonths(now, i);
    const monthStart = startOfMonth(targetMonth);

    // Confirmed revenue: already paid placements with payment in this month
    const confirmedRevenue = placements
      .filter(p => {
        if (p.fee_status !== 'paid' || !p.fee_paid_date) return false;
        return isSameMonth(parseISO(p.fee_paid_date), targetMonth);
      })
      .reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0);

    // Expected revenue: invoiced placements expected to be paid
    const expectedPlacements = placements.filter(p => {
      if (p.fee_status !== 'invoiced' || !p.start_date) return false;
      const expectedPayDate = addDays(parseISO(p.start_date), metrics.avgTimeToPaymentDays);
      return isSameMonth(expectedPayDate, targetMonth);
    });
    const expectedRevenue = expectedPlacements.reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0);

    // Projected revenue: pending placements projected by payment timeline
    const projectedPlacements = placements.filter(p => {
      if (p.fee_status !== 'pending' || !p.start_date) return false;
      const expectedPayDate = addDays(parseISO(p.start_date), metrics.avgTimeToPaymentDays);
      return isSameMonth(expectedPayDate, targetMonth);
    });
    const projectedRevenue = projectedPlacements.reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0);

    // Calculate scenarios for this month
    const monthTotal = confirmedRevenue + expectedRevenue + projectedRevenue;
    const pessimistic = confirmedRevenue + (expectedRevenue * 0.7) + (projectedRevenue * 0.4);
    const expected = confirmedRevenue + (expectedRevenue * 0.9) + (projectedRevenue * (metrics.historicalConversionRate / 100));
    const optimistic = confirmedRevenue + expectedRevenue + (projectedRevenue * 0.95);

    forecasts.push({
      month: format(targetMonth, 'MMM yyyy'),
      monthDate: monthStart,
      confirmedRevenue,
      expectedRevenue,
      projectedRevenue,
      pipelineRevenue: 0, // Calculated separately from submissions
      pessimistic: Math.round(pessimistic),
      expected: Math.round(expected),
      optimistic: Math.round(optimistic)
    });
  }

  return forecasts;
}

/**
 * Calculate pipeline breakdown from current placements
 */
export function calculatePipelineBreakdown(
  placements: Placement[],
  submissions?: CandidateSubmission[],
  avgFee: number = 25000
): PipelineBreakdown {
  const pendingPlacements = placements.filter(p => p.fee_status === 'pending');
  const invoicedPlacements = placements.filter(p => p.fee_status === 'invoiced');
  const partialPlacements = placements.filter(p => p.fee_status === 'partial');

  // Offers in progress from submissions
  const offersInProgress = submissions?.filter(s => s.stage === 'offer') || [];

  return {
    pendingPlacements: {
      count: pendingPlacements.length,
      total: pendingPlacements.reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0)
    },
    invoicedPlacements: {
      count: invoicedPlacements.length,
      total: invoicedPlacements.reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0)
    },
    partialPayments: {
      count: partialPlacements.length,
      remaining: partialPlacements.reduce((sum, p) => sum + (Number(p.fee_total) || 0) * 0.5, 0)
    },
    offersInProgress: {
      count: offersInProgress.length,
      estimatedValue: offersInProgress.length * avgFee
    }
  };
}

/**
 * Main forecasting function - generates complete forecast result
 */
export function generateRevenueForecast(
  placements: Placement[],
  submissions?: CandidateSubmission[],
  months: number = 6
): ForecastResult {
  const metrics = calculateHistoricalMetrics(placements);
  const monthlyForecasts = projectMonthlyRevenue(placements, metrics, months);
  const pipeline = calculatePipelineBreakdown(placements, submissions, metrics.avgPlacementFee);

  // Calculate scenario totals
  const scenarios: ForecastScenario[] = [
    {
      label: 'Pessimistic',
      total: monthlyForecasts.reduce((sum, m) => sum + m.pessimistic, 0),
      conversionRate: 60,
      color: 'hsl(var(--muted))'
    },
    {
      label: 'Expected',
      total: monthlyForecasts.reduce((sum, m) => sum + m.expected, 0),
      conversionRate: metrics.historicalConversionRate,
      color: 'hsl(var(--primary))'
    },
    {
      label: 'Optimistic',
      total: monthlyForecasts.reduce((sum, m) => sum + m.optimistic, 0),
      conversionRate: 95,
      color: 'hsl(var(--accent))'
    }
  ];

  const sixMonthTotal = monthlyForecasts.reduce((sum, m) => sum + m.expected, 0);
  const threeMonthTotal = monthlyForecasts.slice(0, 3).reduce((sum, m) => sum + m.expected, 0);

  return {
    metrics,
    monthlyForecasts,
    scenarios,
    pipeline,
    sixMonthTotal,
    threeMonthTotal
  };
}

/**
 * Format currency for display
 */
export function formatForecastCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
}
