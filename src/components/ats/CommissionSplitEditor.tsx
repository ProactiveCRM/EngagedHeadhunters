import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CommissionSplit } from '@/lib/ats/types';
import { cn } from '@/lib/utils';

interface Agent {
  id: string;
  name: string;
  avatar_url?: string;
}

interface CommissionSplitEditorProps {
  splits: CommissionSplit[];
  feeTotal?: number;
  availableAgents?: Agent[];
  onChange?: (splits: CommissionSplit[]) => void;
  readOnly?: boolean;
  className?: string;
}

export function CommissionSplitEditor({
  splits: initialSplits = [],
  feeTotal = 0,
  availableAgents = [],
  onChange,
  readOnly = false,
  className
}: CommissionSplitEditorProps) {
  const [splits, setSplits] = useState<CommissionSplit[]>(initialSplits);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');

  useEffect(() => {
    setSplits(initialSplits);
  }, [initialSplits]);

  const totalPercentage = splits.reduce((sum, s) => sum + s.percentage, 0);
  const isValid = Math.abs(totalPercentage - 100) < 0.01;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleAddAgent = () => {
    if (!selectedAgentId) return;
    
    const agent = availableAgents.find(a => a.id === selectedAgentId);
    if (!agent) return;
    
    // Check if agent already in splits
    if (splits.some(s => s.agent_id === selectedAgentId)) return;
    
    // Calculate remaining percentage
    const remaining = Math.max(0, 100 - totalPercentage);
    
    const newSplits = [
      ...splits,
      {
        agent_id: agent.id,
        agent_name: agent.name,
        percentage: remaining,
        amount: (feeTotal * remaining) / 100
      }
    ];
    
    setSplits(newSplits);
    onChange?.(newSplits);
    setSelectedAgentId('');
  };

  const handleRemoveAgent = (agentId: string) => {
    const newSplits = splits.filter(s => s.agent_id !== agentId);
    setSplits(newSplits);
    onChange?.(newSplits);
  };

  const handlePercentageChange = (agentId: string, percentage: number) => {
    const newSplits = splits.map(s => 
      s.agent_id === agentId 
        ? { ...s, percentage, amount: (feeTotal * percentage) / 100 }
        : s
    );
    setSplits(newSplits);
    onChange?.(newSplits);
  };

  // Filter out already selected agents
  const availableToAdd = availableAgents.filter(
    a => !splits.some(s => s.agent_id === a.id)
  );

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Commission Split
          </CardTitle>
          {!readOnly && availableToAdd.length > 0 && (
            <div className="flex items-center gap-2">
              <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue placeholder="Select agent..." />
                </SelectTrigger>
                <SelectContent>
                  {availableToAdd.map(agent => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                size="sm" 
                onClick={handleAddAgent}
                disabled={!selectedAgentId}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {feeTotal > 0 && (
          <div className="text-sm text-muted-foreground">
            Total Fee: <span className="font-medium text-foreground">{formatCurrency(feeTotal)}</span>
          </div>
        )}

        {splits.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No commission splits defined. Add agents to split the commission.
          </p>
        ) : (
          <div className="space-y-4">
            {splits.map(split => {
              const amount = (feeTotal * split.percentage) / 100;
              
              return (
                <div 
                  key={split.agent_id} 
                  className="p-4 border rounded-lg bg-card space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={undefined} />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {getInitials(split.agent_name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{split.agent_name}</span>
                    </div>
                    {!readOnly && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveAgent(split.agent_id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {split.percentage}%
                      </span>
                      {feeTotal > 0 && (
                        <span className="font-medium text-primary">
                          {formatCurrency(amount)}
                        </span>
                      )}
                    </div>
                    {!readOnly ? (
                      <Slider
                        value={[split.percentage]}
                        onValueChange={([value]) => handlePercentageChange(split.agent_id, value)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    ) : (
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${split.percentage}%` }}
                        />
                      </div>
                    )}
                    {!readOnly && (
                      <Input
                        type="number"
                        value={split.percentage}
                        onChange={(e) => handlePercentageChange(split.agent_id, Number(e.target.value))}
                        min={0}
                        max={100}
                        className="h-8 w-24"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Validation Status */}
        {splits.length > 0 && (
          <div className={cn(
            "flex items-center gap-2 p-3 rounded-lg",
            isValid ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
          )}>
            {isValid ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300">
                  Total Allocated: {totalPercentage.toFixed(0)}% ✓
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-700 dark:text-red-300">
                  Total: {totalPercentage.toFixed(0)}% — Must equal 100%
                </span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
