import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAdminGlobalSettings } from '@/hooks/useGlobalSettings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GlobalSettings() {
  const { byCategory, loading, updateSetting, isUpdating } = useAdminGlobalSettings();
  const { toast } = useToast();
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [savedFields, setSavedFields] = useState<Set<string>>(new Set());

  const handleChange = (id: string, value: string) => {
    setEditedValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async (id: string, currentValue: string) => {
    const newValue = editedValues[id] ?? currentValue;
    try {
      await updateSetting({ id, value: newValue });
      setSavedFields(prev => new Set(prev).add(id));
      setTimeout(() => {
        setSavedFields(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 2000);
      toast({ title: 'Saved', description: `${id} updated successfully` });
    } catch {
      toast({ title: 'Error', description: 'Failed to save setting', variant: 'destructive' });
    }
  };

  const categoryLabels: Record<string, { title: string; description: string }> = {
    general: { title: 'Company Information', description: 'Basic company details used across the site' },
    contact: { title: 'Contact Details', description: 'Phone, email, and address information' },
    social: { title: 'Social Media', description: 'Links to social media profiles' },
    booking: { title: 'Booking & Calendars', description: 'Calendar booking URLs and settings' },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Global Settings</h1>
          <p className="text-muted-foreground">Site-wide settings used across all pages</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-6">
            {Object.entries(byCategory).map(([category, settings]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{categoryLabels[category]?.title || category}</CardTitle>
                  <CardDescription>{categoryLabels[category]?.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {settings.map((setting) => (
                    <div key={setting.id} className="flex items-end gap-2">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={setting.id}>{setting.label || setting.id}</Label>
                        {setting.description && (
                          <p className="text-xs text-muted-foreground">{setting.description}</p>
                        )}
                        <Input
                          id={setting.id}
                          value={editedValues[setting.id] ?? setting.value ?? ''}
                          onChange={(e) => handleChange(setting.id, e.target.value)}
                          type={setting.value_type === 'url' ? 'url' : 'text'}
                        />
                      </div>
                      <Button
                        onClick={() => handleSave(setting.id, setting.value || '')}
                        disabled={isUpdating}
                        size="sm"
                        variant={savedFields.has(setting.id) ? 'outline' : 'default'}
                      >
                        {savedFields.has(setting.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
