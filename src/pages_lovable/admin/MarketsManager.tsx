import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import AdminRoute from '@/components/AdminRoute';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  RefreshCw, 
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Target
} from 'lucide-react';

interface TargetMarket {
  id: string;
  display_name: string;
  description: string | null;
  display_order: number | null;
  created_at: string | null;
}

function MarketsManagerContent() {
  const [markets, setMarkets] = useState<TargetMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMarket, setEditingMarket] = useState<TargetMarket | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    display_name: '',
    description: '',
    display_order: 0
  });

  const fetchMarkets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('target_markets')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMarkets(data || []);
    } catch (error) {
      console.error('Error fetching markets:', error);
      toast.error('Failed to load target markets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  const handleOpenDialog = (market?: TargetMarket) => {
    if (market) {
      setEditingMarket(market);
      setFormData({
        id: market.id,
        display_name: market.display_name,
        description: market.description || '',
        display_order: market.display_order || 0
      });
    } else {
      setEditingMarket(null);
      setFormData({
        id: '',
        display_name: '',
        description: '',
        display_order: markets.length
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.id || !formData.display_name) {
      toast.error('ID and Display Name are required');
      return;
    }

    try {
      if (editingMarket) {
        const { error } = await supabase
          .from('target_markets')
          .update({
            display_name: formData.display_name,
            description: formData.description || null,
            display_order: formData.display_order
          })
          .eq('id', editingMarket.id);

        if (error) throw error;
        toast.success('Target market updated');
      } else {
        const { error } = await supabase
          .from('target_markets')
          .insert({
            id: formData.id.toLowerCase().replace(/\s+/g, '-'),
            display_name: formData.display_name,
            description: formData.description || null,
            display_order: formData.display_order
          });

        if (error) throw error;
        toast.success('Target market created');
      }

      setDialogOpen(false);
      fetchMarkets();
    } catch (error: any) {
      console.error('Error saving market:', error);
      toast.error(error.message || 'Failed to save target market');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('target_markets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMarkets(prev => prev.filter(m => m.id !== id));
      toast.success('Target market deleted');
    } catch (error: any) {
      console.error('Error deleting market:', error);
      toast.error(error.message || 'Failed to delete target market');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Target Markets Manager</h1>
            <p className="text-muted-foreground">Manage directory target markets (Employers, Candidates)</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchMarkets} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => handleOpenDialog()} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Market
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading target markets...</div>
          ) : markets.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No target markets yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Order</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {markets.map(market => (
                  <TableRow key={market.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GripVertical className="h-4 w-4" />
                        {market.display_order}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{market.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="font-medium">{market.display_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate text-muted-foreground">
                      {market.description || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(market)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Target Market</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{market.display_name}"? This may affect directory listings using this market.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(market.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMarket ? 'Edit Target Market' : 'Add Target Market'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="id">ID (slug)</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="employers"
                  disabled={!!editingMarket}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  placeholder="Employers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Services for employers looking to hire..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingMarket ? 'Save Changes' : 'Create Market'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

const MarketsManager = () => {
  return (
    <AdminRoute>
      <MarketsManagerContent />
    </AdminRoute>
  );
};

export default MarketsManager;
