import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, isPast, isToday, isTomorrow, addDays, addHours } from 'date-fns';
import { 
  Bell, Plus, Check, Clock, Trash2, CalendarIcon, 
  Loader2, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Reminder {
  id: string;
  prospect_id: string;
  created_by: string | null;
  reminder_date: string;
  note: string | null;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
}

interface ProspectRemindersProps {
  prospectId: string;
  prospectName?: string;
  onReminderAdded?: () => void;
}

export function ProspectReminders({ prospectId, prospectName, onReminderAdded }: ProspectRemindersProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('09:00');
  const [note, setNote] = useState('');

  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ['prospect-reminders', prospectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prospect_reminders')
        .select('*')
        .eq('prospect_id', prospectId)
        .order('reminder_date', { ascending: true });
      
      if (error) throw error;
      return data as Reminder[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!date || !user) throw new Error('Date and user required');
      
      const [hours, minutes] = time.split(':').map(Number);
      const reminderDate = new Date(date);
      reminderDate.setHours(hours, minutes, 0, 0);

      const { data, error } = await supabase
        .from('prospect_reminders')
        .insert({
          prospect_id: prospectId,
          created_by: user.id,
          reminder_date: reminderDate.toISOString(),
          note: note || null,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospect-reminders', prospectId] });
      queryClient.invalidateQueries({ queryKey: ['all-reminders'] });
      toast({ title: 'Reminder set', description: 'You will be notified at the scheduled time' });
      setIsAddOpen(false);
      setDate(undefined);
      setTime('09:00');
      setNote('');
      onReminderAdded?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (reminderId: string) => {
      const { error } = await supabase
        .from('prospect_reminders')
        .update({ 
          is_completed: true, 
          completed_at: new Date().toISOString() 
        })
        .eq('id', reminderId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospect-reminders', prospectId] });
      queryClient.invalidateQueries({ queryKey: ['all-reminders'] });
      toast({ title: 'Completed', description: 'Reminder marked as complete' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (reminderId: string) => {
      const { error } = await supabase
        .from('prospect_reminders')
        .delete()
        .eq('id', reminderId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospect-reminders', prospectId] });
      queryClient.invalidateQueries({ queryKey: ['all-reminders'] });
      toast({ title: 'Deleted', description: 'Reminder removed' });
    },
  });

  const quickSetDate = (option: 'today' | 'tomorrow' | 'next_week') => {
    const now = new Date();
    switch (option) {
      case 'today':
        setDate(now);
        setTime(format(addHours(now, 2), 'HH:00'));
        break;
      case 'tomorrow':
        setDate(addDays(now, 1));
        break;
      case 'next_week':
        setDate(addDays(now, 7));
        break;
    }
  };

  const getReminderStatus = (reminder: Reminder) => {
    if (reminder.is_completed) {
      return { label: 'Completed', variant: 'secondary' as const, icon: CheckCircle2 };
    }
    const reminderDate = new Date(reminder.reminder_date);
    if (isPast(reminderDate)) {
      return { label: 'Overdue', variant: 'destructive' as const, icon: AlertCircle };
    }
    if (isToday(reminderDate)) {
      return { label: 'Today', variant: 'default' as const, icon: Bell };
    }
    if (isTomorrow(reminderDate)) {
      return { label: 'Tomorrow', variant: 'outline' as const, icon: Clock };
    }
    return { label: 'Upcoming', variant: 'outline' as const, icon: Clock };
  };

  const activeReminders = reminders.filter(r => !r.is_completed);
  const completedReminders = reminders.filter(r => r.is_completed);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Follow-up Reminders
          {activeReminders.length > 0 && (
            <Badge variant="secondary">{activeReminders.length}</Badge>
          )}
        </h4>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Follow-up Reminder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => quickSetDate('today')}
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => quickSetDate('tomorrow')}
                >
                  Tomorrow
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => quickSetDate('next_week')}
                >
                  Next Week
                </Button>
              </div>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Note (optional)</Label>
                  <Textarea
                    placeholder="What do you need to follow up about?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => addMutation.mutate()}
                disabled={!date || addMutation.isPending}
              >
                {addMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Bell className="h-4 w-4 mr-2" />
                )}
                Set Reminder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : reminders.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No reminders set for this prospect
        </p>
      ) : (
        <div className="space-y-2">
          {activeReminders.map((reminder) => {
            const status = getReminderStatus(reminder);
            const StatusIcon = status.icon;
            
            return (
              <div
                key={reminder.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border",
                  status.label === 'Overdue' && "border-destructive bg-destructive/5",
                  status.label === 'Today' && "border-primary bg-primary/5"
                )}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 shrink-0"
                  onClick={() => completeMutation.mutate(reminder.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={status.variant} className="flex items-center gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(reminder.reminder_date), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                  {reminder.note && (
                    <p className="text-sm">{reminder.note}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => deleteMutation.mutate(reminder.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
          
          {completedReminders.length > 0 && (
            <details className="mt-4">
              <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                {completedReminders.length} completed reminder{completedReminders.length !== 1 ? 's' : ''}
              </summary>
              <div className="space-y-2 mt-2">
                {completedReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30 opacity-60"
                  >
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {format(new Date(reminder.reminder_date), "MMM d, yyyy")}
                        </span>
                      </div>
                      {reminder.note && (
                        <p className="text-sm text-muted-foreground line-through">{reminder.note}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteMutation.mutate(reminder.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

// Separate component for showing all due reminders in the dashboard
export function DueRemindersWidget() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: dueReminders = [], isLoading } = useQuery({
    queryKey: ['all-reminders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prospect_reminders')
        .select(`
          *,
          prospects:prospect_id (
            id,
            company_name,
            contact_name
          )
        `)
        .eq('is_completed', false)
        .lte('reminder_date', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())
        .order('reminder_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 60000, // Refetch every minute
  });

  const completeMutation = useMutation({
    mutationFn: async (reminderId: string) => {
      const { error } = await supabase
        .from('prospect_reminders')
        .update({ 
          is_completed: true, 
          completed_at: new Date().toISOString() 
        })
        .eq('id', reminderId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-reminders'] });
      toast({ title: 'Completed', description: 'Reminder marked as complete' });
    },
  });

  if (isLoading || dueReminders.length === 0) return null;

  const overdueCount = dueReminders.filter(r => isPast(new Date(r.reminder_date))).length;

  return (
    <Card className={cn(
      "mb-4",
      overdueCount > 0 ? "border-destructive bg-destructive/5" : "border-primary bg-primary/5"
    )}>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" />
          {overdueCount > 0 ? (
            <>
              <span className="text-destructive">{overdueCount} Overdue</span>
              {dueReminders.length - overdueCount > 0 && (
                <span className="text-muted-foreground">
                  • {dueReminders.length - overdueCount} Due Today
                </span>
              )}
            </>
          ) : (
            <span>{dueReminders.length} Due Today</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <div className="space-y-2">
          {dueReminders.slice(0, 5).map((reminder: any) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between gap-3 py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 shrink-0"
                  onClick={() => completeMutation.mutate(reminder.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {reminder.prospects?.company_name || reminder.prospects?.contact_name || 'Unknown'}
                  </p>
                  {reminder.note && (
                    <p className="text-xs text-muted-foreground truncate">{reminder.note}</p>
                  )}
                </div>
              </div>
              <span className={cn(
                "text-xs shrink-0",
                isPast(new Date(reminder.reminder_date)) ? "text-destructive" : "text-muted-foreground"
              )}>
                {format(new Date(reminder.reminder_date), "h:mm a")}
              </span>
            </div>
          ))}
          {dueReminders.length > 5 && (
            <p className="text-xs text-muted-foreground text-center py-1">
              +{dueReminders.length - 5} more reminders
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
