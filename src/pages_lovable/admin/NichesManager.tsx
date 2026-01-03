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
  Briefcase
} from 'lucide-react';

interface Niche {
  id: string;
  display_name: string;
  description: string | null;
  icon: string | null;
  display_order: number | null;
  created_at: string | null;
}

function NichesManagerContent() {
  const [niches, setNiches] = useState<Niche[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNiche, setEditingNiche] = useState<Niche | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    display_name: '',
    description: '',
    icon: '',
    display_order: 0
  });

  const fetchNiches = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('niches')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setNiches(data || []);
    } catch (error) {
      console.error('Error fetching niches:', error);
      toast.error('Failed to load niches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNiches();
  }, []);

  const handleOpenDialog = (niche?: Niche) => {
    if (niche) {
      setEditingNiche(niche);
      setFormData({
        id: niche.id,
        display_name: niche.display_name,
        description: niche.description || '',
        icon: niche.icon || '',
        display_order: niche.display_order || 0
      });
    } else {
      setEditingNiche(null);
      setFormData({
        id: '',
        display_name: '',
        description: '',
        icon: '',
        display_order: niches.length
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
      if (editingNiche) {
        const { error } = await supabase
          .from('niches')
          .update({
            display_name: formData.display_name,
            description: formData.description || null,
            icon: formData.icon || null,
            display_order: formData.display_order
          })
          .eq('id', editingNiche.id);

        if (error) throw error;
        toast.success('Niche updated');
      } else {
        const { error } = await supabase
          .from('niches')
          .insert({
            id: formData.id.toLowerCase().replace(/\s+/g, '-'),
            display_name: formData.display_name,
            description: formData.description || null,
            icon: formData.icon || null,
            display_order: formData.display_order
          });

        if (error) throw error;
        toast.success('Niche created');
      }

      setDialogOpen(false);
      fetchNiches();
    } catch (error: any) {
      console.error('Error saving niche:', error);
      toast.error(error.message || 'Failed to save niche');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('niches')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setNiches(prev => prev.filter(n => n.id !== id));
      toast.success('Niche deleted');
    } catch (error: any) {
      console.error('Error deleting niche:', error);
      toast.error(error.message || 'Failed to delete niche');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Niches Manager</h1>
            <p className="text-muted-foreground">Manage recruiter specialty niches</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchNiches} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => handleOpenDialog()} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Niche
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading niches...</div>
          ) : niches.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No niches yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Order</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {niches.map(niche => (
                  <TableRow key={niche.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GripVertical className="h-4 w-4" />
                        {niche.display_order}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{niche.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span className="font-medium">{niche.display_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {niche.icon || '-'}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                      {niche.description || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(niche)}
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
                              <AlertDialogTitle>Delete Niche</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{niche.display_name}"? This may affect directory listings using this niche.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(niche.id)}
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
              <DialogTitle>{editingNiche ? 'Edit Niche' : 'Add Niche'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="id">ID (slug)</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="healthcare"
                  disabled={!!editingNiche}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  placeholder="Healthcare"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Lucide icon name)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Heart"
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
                  placeholder="Recruiters specializing in healthcare..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingNiche ? 'Save Changes' : 'Create Niche'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

const NichesManager = () => {
  return (
    <AdminRoute>
      <NichesManagerContent />
    </AdminRoute>
  );
};

export default NichesManager;
