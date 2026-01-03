import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, MapPin } from 'lucide-react';
import AdminRoute from '@/components/AdminRoute';
import { Switch } from '@/components/ui/switch';

interface Location {
  id: string;
  display_name: string;
  region: string;
  population: string | null;
  description: string | null;
  industries: string[] | null;
  major_companies: string[] | null;
  geo_lat: number | null;
  geo_lng: number | null;
  market_type: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const LocationsManagerContent = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    display_name: '',
    region: '',
    population: '',
    description: '',
    industries: '',
    major_companies: '',
    geo_lat: '',
    geo_lng: '',
    market_type: 'secondary',
    display_order: '0',
    is_active: true,
  });
  const { toast } = useToast();

  const fetchLocations = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('region')
      .order('display_order');

    if (error) {
      toast({
        title: 'Error fetching locations',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setLocations(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleOpenDialog = (location?: Location) => {
    if (location) {
      setEditingLocation(location);
      setFormData({
        id: location.id,
        display_name: location.display_name,
        region: location.region,
        population: location.population || '',
        description: location.description || '',
        industries: (location.industries || []).join(', '),
        major_companies: (location.major_companies || []).join(', '),
        geo_lat: location.geo_lat?.toString() || '',
        geo_lng: location.geo_lng?.toString() || '',
        market_type: location.market_type || 'secondary',
        display_order: location.display_order?.toString() || '0',
        is_active: location.is_active ?? true,
      });
    } else {
      setEditingLocation(null);
      setFormData({
        id: '',
        display_name: '',
        region: '',
        population: '',
        description: '',
        industries: '',
        major_companies: '',
        geo_lat: '',
        geo_lng: '',
        market_type: 'secondary',
        display_order: '0',
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    const locationData = {
      id: formData.id.toLowerCase().replace(/\s+/g, '-'),
      display_name: formData.display_name,
      region: formData.region,
      population: formData.population || null,
      description: formData.description || null,
      industries: formData.industries ? formData.industries.split(',').map(s => s.trim()) : [],
      major_companies: formData.major_companies ? formData.major_companies.split(',').map(s => s.trim()) : [],
      geo_lat: formData.geo_lat ? parseFloat(formData.geo_lat) : null,
      geo_lng: formData.geo_lng ? parseFloat(formData.geo_lng) : null,
      market_type: formData.market_type,
      display_order: parseInt(formData.display_order) || 0,
      is_active: formData.is_active,
    };

    if (editingLocation) {
      const { error } = await supabase
        .from('locations')
        .update(locationData)
        .eq('id', editingLocation.id);

      if (error) {
        toast({
          title: 'Error updating location',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Location updated successfully' });
        setIsDialogOpen(false);
        fetchLocations();
      }
    } else {
      const { error } = await supabase
        .from('locations')
        .insert([locationData]);

      if (error) {
        toast({
          title: 'Error creating location',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Location created successfully' });
        setIsDialogOpen(false);
        fetchLocations();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;

    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error deleting location',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Location deleted successfully' });
      fetchLocations();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Locations Manager</h1>
            <p className="text-muted-foreground">Manage service area locations for dynamic pages</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>Market Type</TableHead>
                <TableHead>Industries</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : locations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No locations found
                  </TableCell>
                </TableRow>
              ) : (
                locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{location.display_name}</div>
                          <div className="text-xs text-muted-foreground">/{location.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{location.region}</TableCell>
                    <TableCell>{location.population || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        location.market_type === 'headquarters' ? 'bg-accent/20 text-accent' :
                        location.market_type === 'primary' ? 'bg-primary/20 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {location.market_type || 'secondary'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(location.industries || []).slice(0, 2).map((ind, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-muted text-xs rounded">
                            {ind}
                          </span>
                        ))}
                        {(location.industries || []).length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{(location.industries || []).length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        location.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {location.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(location)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(location.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLocation ? 'Edit Location' : 'Add Location'}</DialogTitle>
              <DialogDescription>
                {editingLocation ? 'Update location details' : 'Add a new service area location'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Slug (URL)</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="dallas"
                    disabled={!!editingLocation}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    placeholder="Dallas-Fort Worth, TX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="Texas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="population">Population</Label>
                  <Input
                    id="population"
                    value={formData.population}
                    onChange={(e) => setFormData({ ...formData, population: e.target.value })}
                    placeholder="7.6M"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Marketing description for this location..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industries">Industries (comma-separated)</Label>
                <Input
                  id="industries"
                  value={formData.industries}
                  onChange={(e) => setFormData({ ...formData, industries: e.target.value })}
                  placeholder="Technology, Finance, Healthcare"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="major_companies">Major Companies (comma-separated)</Label>
                <Input
                  id="major_companies"
                  value={formData.major_companies}
                  onChange={(e) => setFormData({ ...formData, major_companies: e.target.value })}
                  placeholder="AT&T, Southwest Airlines, Texas Instruments"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="geo_lat">Latitude</Label>
                  <Input
                    id="geo_lat"
                    type="number"
                    step="any"
                    value={formData.geo_lat}
                    onChange={(e) => setFormData({ ...formData, geo_lat: e.target.value })}
                    placeholder="32.7767"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="geo_lng">Longitude</Label>
                  <Input
                    id="geo_lng"
                    type="number"
                    step="any"
                    value={formData.geo_lng}
                    onChange={(e) => setFormData({ ...formData, geo_lng: e.target.value })}
                    placeholder="-96.7970"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="market_type">Market Type</Label>
                  <Select
                    value={formData.market_type}
                    onValueChange={(value) => setFormData({ ...formData, market_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="headquarters">Headquarters</SelectItem>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Active</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {formData.is_active ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingLocation ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

const LocationsManager = () => {
  return (
    <AdminRoute>
      <LocationsManagerContent />
    </AdminRoute>
  );
};

export default LocationsManager;
