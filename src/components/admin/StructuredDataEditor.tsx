import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Copy, RotateCcw, CheckCircle2, AlertCircle, ChevronDown, Link2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  SchemaType,
  FAQItem,
  OrganizationSchema,
  validateOrganizationSchema,
  validateLocalBusinessSchema,
  validateFAQSchema,
  validateServiceSchema,
  generateDefaultOrganizationSchema,
  generateDefaultLocalBusinessSchema,
  generateDefaultFAQSchema,
  generateDefaultServiceSchema,
  buildOrganizationSchema,
  buildLocalBusinessSchema,
  buildFAQSchema,
  buildServiceSchema,
  detectSchemaType,
} from '@/lib/schemaValidation';

interface StructuredDataEditorProps {
  initialData?: unknown;
  pageSlug: string;
  onChange: (data: unknown) => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function StructuredDataEditor({ initialData, pageSlug, onChange }: StructuredDataEditorProps) {
  const [schemaType, setSchemaType] = useState<SchemaType>(null);
  const [orgForm, setOrgForm] = useState<Record<string, unknown>>({});
  const [localForm, setLocalForm] = useState<Record<string, unknown>>({});
  const [serviceForm, setServiceForm] = useState<Record<string, unknown>>({});
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [validation, setValidation] = useState<{ valid: boolean; errors: string[]; warnings: string[] }>({ valid: true, errors: [], warnings: [] });

  // Inheritance state
  const [inheritOrganization, setInheritOrganization] = useState(false);
  const [homePageSchema, setHomePageSchema] = useState<OrganizationSchema | null>(null);
  const [loadingHomeSchema, setLoadingHomeSchema] = useState(false);

  // Fetch home page's Organization schema for inheritance
  useEffect(() => {
    const fetchHomeSchema = async () => {
      if (pageSlug === 'home') return;

      setLoadingHomeSchema(true);
      try {
        const { data } = await supabase
          .from('page_seo')
          .select('structured_data')
          .eq('page_slug', 'home')
          .single();

        if (data?.structured_data) {
          const schemaData = data.structured_data as unknown;
          // Handle both single schema and array
          let orgSchema: OrganizationSchema | null = null;

          if (Array.isArray(schemaData)) {
            const orgItem = schemaData.find((s) => typeof s === 'object' && s !== null && (s as Record<string, unknown>)['@type'] === 'Organization');
            if (orgItem) orgSchema = orgItem as unknown as OrganizationSchema;
          } else if (detectSchemaType(schemaData) === 'Organization') {
            orgSchema = schemaData as unknown as OrganizationSchema;
          }

          if (orgSchema) {
            setHomePageSchema(orgSchema);
          }
        }
      } catch (error) {
        console.error('Failed to fetch home page schema:', error);
      } finally {
        setLoadingHomeSchema(false);
      }
    };

    fetchHomeSchema();
  }, [pageSlug]);

  // Initialize from existing data
  useEffect(() => {
    if (initialData) {
      // Handle array of schemas (inherited)
      let mainData = initialData;
      if (Array.isArray(initialData)) {
        // Check if first is Organization (inherited)
        const orgIndex = initialData.findIndex((s: Record<string, unknown>) => s['@type'] === 'Organization');
        const otherIndex = initialData.findIndex((s: Record<string, unknown>) => s['@type'] !== 'Organization');

        if (orgIndex !== -1 && otherIndex !== -1) {
          setInheritOrganization(true);
          mainData = initialData[otherIndex];
        } else if (initialData.length > 0) {
          mainData = initialData[0];
        }
      }

      const detected = detectSchemaType(mainData);
      setSchemaType(detected);

      if (detected === 'Organization') {
        const data = mainData as Record<string, unknown>;
        setOrgForm({
          name: data.name || '',
          alternateName: data.alternateName || '',
          url: data.url || '',
          logo: data.logo || '',
          description: data.description || '',
          foundingDate: data.foundingDate || '',
          founderName: (data.founder as Record<string, unknown>)?.name || '',
          founderTitle: (data.founder as Record<string, unknown>)?.jobTitle || '',
          streetAddress: (data.address as Record<string, unknown>)?.streetAddress || '',
          city: (data.address as Record<string, unknown>)?.addressLocality || '',
          state: (data.address as Record<string, unknown>)?.addressRegion || '',
          postalCode: (data.address as Record<string, unknown>)?.postalCode || '',
          country: (data.address as Record<string, unknown>)?.addressCountry || 'US',
          telephone: (data.contactPoint as Record<string, unknown>)?.telephone || '',
          contactType: (data.contactPoint as Record<string, unknown>)?.contactType || 'customer service',
          socialProfiles: data.sameAs || [],
          includeRating: !!data.aggregateRating,
          ratingValue: (data.aggregateRating as Record<string, unknown>)?.ratingValue || '',
          reviewCount: (data.aggregateRating as Record<string, unknown>)?.reviewCount || '',
        });
      } else if (detected === 'LocalBusiness') {
        const data = mainData as Record<string, unknown>;
        const hours = (data.openingHoursSpecification as Record<string, unknown>[])?.[0];
        setLocalForm({
          name: data.name || '',
          image: data.image || '',
          telephone: data.telephone || '',
          priceRange: data.priceRange || '',
          streetAddress: (data.address as Record<string, unknown>)?.streetAddress || '',
          city: (data.address as Record<string, unknown>)?.addressLocality || '',
          state: (data.address as Record<string, unknown>)?.addressRegion || '',
          postalCode: (data.address as Record<string, unknown>)?.postalCode || '',
          country: (data.address as Record<string, unknown>)?.addressCountry || 'US',
          latitude: (data.geo as Record<string, unknown>)?.latitude || '',
          longitude: (data.geo as Record<string, unknown>)?.longitude || '',
          openDays: hours?.dayOfWeek || [],
          opens: hours?.opens || '09:00',
          closes: hours?.closes || '17:00',
          areaServed: data.areaServed || [],
        });
      } else if (detected === 'FAQ') {
        const data = mainData as { mainEntity?: Array<{ name: string; acceptedAnswer?: { text: string } }> };
        setFaqItems(
          data.mainEntity?.map(q => ({
            question: q.name || '',
            answer: q.acceptedAnswer?.text || '',
          })) || []
        );
      } else if (detected === 'Service') {
        const data = mainData as Record<string, unknown>;
        const areas = data.areaServed as Array<{ name?: string }> | string[] | undefined;
        const areaNames = areas
          ? (areas as Array<{ name?: string } | string>).map(a => typeof a === 'string' ? a : a.name || '')
          : [];
        const offerings = (data.hasOfferCatalog as Record<string, unknown>)?.itemListElement as Array<{ name: string }> | undefined;

        setServiceForm({
          name: data.name || '',
          description: data.description || '',
          url: data.url || '',
          serviceType: data.serviceType || '',
          category: data.category || '',
          providerName: (data.provider as Record<string, unknown>)?.name || 'Engaged Headhunters',
          providerUrl: (data.provider as Record<string, unknown>)?.url || '',
          areaServed: areaNames,
          includePricing: !!data.offers,
          priceRange: ((data.offers as Record<string, unknown>)?.priceSpecification as Record<string, unknown>)?.priceRange || '',
          currency: ((data.offers as Record<string, unknown>)?.priceSpecification as Record<string, unknown>)?.priceCurrency || 'USD',
          availability: (data.offers as Record<string, unknown>)?.availability || '',
          offerings: offerings?.map(o => o.name) || [],
        });
      }
    }
  }, [initialData]);

  // Build and validate schema when form changes
  const buildSchema = useCallback(() => {
    if (!schemaType) return null;

    if (schemaType === 'Organization') {
      const schema = buildOrganizationSchema(orgForm);
      setValidation(validateOrganizationSchema(schema));
      return schema;
    } else if (schemaType === 'LocalBusiness') {
      const schema = buildLocalBusinessSchema(localForm);
      setValidation(validateLocalBusinessSchema(schema));
      return schema;
    } else if (schemaType === 'FAQ') {
      const schema = buildFAQSchema(faqItems);
      setValidation(validateFAQSchema(faqItems));
      return schema;
    } else if (schemaType === 'Service') {
      const schema = buildServiceSchema(serviceForm);
      setValidation(validateServiceSchema(schema));
      return schema;
    }
    return null;
  }, [schemaType, orgForm, localForm, faqItems, serviceForm]);

  // Build final schema with inheritance
  const buildFinalSchema = useCallback(() => {
    const pageSchema = buildSchema();

    // If inheritance is enabled and we have home schema, combine them
    if (inheritOrganization && homePageSchema && pageSchema && schemaType !== 'Organization') {
      return [homePageSchema, pageSchema];
    }

    return pageSchema;
  }, [buildSchema, inheritOrganization, homePageSchema, schemaType]);

  // Update parent when schema changes
  useEffect(() => {
    const schema = buildFinalSchema();
    onChange(schema);
  }, [buildFinalSchema, onChange]);

  const handleSchemaTypeChange = (type: string) => {
    if (type === 'none') {
      setSchemaType(null);
      setInheritOrganization(false);
      onChange(null);
    } else {
      setSchemaType(type as SchemaType);
    }
  };

  const handleResetToDefault = () => {
    if (schemaType === 'Organization') {
      const defaults = generateDefaultOrganizationSchema();
      setOrgForm({
        name: defaults.name,
        alternateName: defaults.alternateName,
        url: defaults.url,
        logo: defaults.logo,
        description: defaults.description,
        foundingDate: defaults.foundingDate,
        founderName: defaults.founder?.name,
        founderTitle: defaults.founder?.jobTitle,
        streetAddress: defaults.address?.streetAddress,
        city: defaults.address?.addressLocality,
        state: defaults.address?.addressRegion,
        postalCode: defaults.address?.postalCode,
        country: defaults.address?.addressCountry,
        telephone: defaults.contactPoint?.telephone,
        contactType: defaults.contactPoint?.contactType,
        socialProfiles: defaults.sameAs || [],
        includeRating: false,
        ratingValue: '',
        reviewCount: '',
      });
    } else if (schemaType === 'LocalBusiness') {
      const defaults = generateDefaultLocalBusinessSchema();
      setLocalForm({
        name: defaults.name,
        image: defaults.image,
        telephone: defaults.telephone,
        priceRange: defaults.priceRange,
        streetAddress: defaults.address?.streetAddress,
        city: defaults.address?.addressLocality,
        state: defaults.address?.addressRegion,
        postalCode: defaults.address?.postalCode,
        country: defaults.address?.addressCountry,
        latitude: defaults.geo?.latitude,
        longitude: defaults.geo?.longitude,
        openDays: defaults.openingHoursSpecification?.[0]?.dayOfWeek || [],
        opens: defaults.openingHoursSpecification?.[0]?.opens,
        closes: defaults.openingHoursSpecification?.[0]?.closes,
        areaServed: defaults.areaServed || [],
      });
    } else if (schemaType === 'FAQ') {
      const defaults = generateDefaultFAQSchema();
      setFaqItems(
        defaults.mainEntity.map(q => ({
          question: q.name,
          answer: q.acceptedAnswer.text,
        }))
      );
    } else if (schemaType === 'Service') {
      const defaults = generateDefaultServiceSchema(pageSlug);
      const areas = defaults.areaServed as Array<{ name: string }> | undefined;
      setServiceForm({
        name: defaults.name,
        description: defaults.description,
        url: defaults.url,
        serviceType: defaults.serviceType,
        category: defaults.category,
        providerName: defaults.provider?.name,
        providerUrl: defaults.provider?.url,
        areaServed: areas?.map(a => a.name) || [],
        includePricing: !!defaults.offers,
        priceRange: (defaults.offers?.priceSpecification as Record<string, unknown>)?.priceRange || '',
        currency: defaults.offers?.priceSpecification?.priceCurrency || 'USD',
        availability: defaults.offers?.availability || '',
        offerings: [],
      });
    }
    toast.success('Reset to defaults');
  };

  const copyJson = () => {
    const schema = buildFinalSchema();
    if (schema) {
      navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
      toast.success('JSON copied to clipboard');
    }
  };

  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: '', answer: '' }]);
  };

  const removeFaqItem = (index: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== index));
  };

  const updateFaqItem = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqItems];
    updated[index] = { ...updated[index], [field]: value };
    setFaqItems(updated);
  };

  const addSocialProfile = () => {
    const profiles = (orgForm.socialProfiles as string[]) || [];
    setOrgForm({ ...orgForm, socialProfiles: [...profiles, ''] });
  };

  const removeSocialProfile = (index: number) => {
    const profiles = (orgForm.socialProfiles as string[]) || [];
    setOrgForm({ ...orgForm, socialProfiles: profiles.filter((_, i) => i !== index) });
  };

  const updateSocialProfile = (index: number, value: string) => {
    const profiles = [...((orgForm.socialProfiles as string[]) || [])];
    profiles[index] = value;
    setOrgForm({ ...orgForm, socialProfiles: profiles });
  };

  const addAreaServed = (formType: 'local' | 'service') => {
    if (formType === 'local') {
      const areas = (localForm.areaServed as string[]) || [];
      setLocalForm({ ...localForm, areaServed: [...areas, ''] });
    } else {
      const areas = (serviceForm.areaServed as string[]) || [];
      setServiceForm({ ...serviceForm, areaServed: [...areas, ''] });
    }
  };

  const removeAreaServed = (index: number, formType: 'local' | 'service') => {
    if (formType === 'local') {
      const areas = (localForm.areaServed as string[]) || [];
      setLocalForm({ ...localForm, areaServed: areas.filter((_, i) => i !== index) });
    } else {
      const areas = (serviceForm.areaServed as string[]) || [];
      setServiceForm({ ...serviceForm, areaServed: areas.filter((_, i) => i !== index) });
    }
  };

  const updateAreaServed = (index: number, value: string, formType: 'local' | 'service') => {
    if (formType === 'local') {
      const areas = [...((localForm.areaServed as string[]) || [])];
      areas[index] = value;
      setLocalForm({ ...localForm, areaServed: areas });
    } else {
      const areas = [...((serviceForm.areaServed as string[]) || [])];
      areas[index] = value;
      setServiceForm({ ...serviceForm, areaServed: areas });
    }
  };

  const addOffering = () => {
    const offerings = (serviceForm.offerings as string[]) || [];
    setServiceForm({ ...serviceForm, offerings: [...offerings, ''] });
  };

  const removeOffering = (index: number) => {
    const offerings = (serviceForm.offerings as string[]) || [];
    setServiceForm({ ...serviceForm, offerings: offerings.filter((_, i) => i !== index) });
  };

  const updateOffering = (index: number, value: string) => {
    const offerings = [...((serviceForm.offerings as string[]) || [])];
    offerings[index] = value;
    setServiceForm({ ...serviceForm, offerings: offerings });
  };

  const toggleDay = (day: string) => {
    const days = (localForm.openDays as string[]) || [];
    if (days.includes(day)) {
      setLocalForm({ ...localForm, openDays: days.filter(d => d !== day) });
    } else {
      setLocalForm({ ...localForm, openDays: [...days, day] });
    }
  };

  const canInherit = pageSlug !== 'home' && homePageSchema && schemaType && schemaType !== 'Organization';

  return (
    <div className="space-y-4">
      {/* Schema Type Selector */}
      <div className="space-y-2">
        <Label>Schema Type</Label>
        <Select value={schemaType || 'none'} onValueChange={handleSchemaTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select schema type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Structured Data</SelectItem>
            <SelectItem value="Organization">Organization</SelectItem>
            <SelectItem value="LocalBusiness">Local Business (Employment Agency)</SelectItem>
            <SelectItem value="Service">Service (for service pages)</SelectItem>
            <SelectItem value="FAQ">FAQ Page</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {schemaType === 'Organization' && 'Best for: Home page, About page'}
          {schemaType === 'LocalBusiness' && 'Best for: Location pages, Contact page'}
          {schemaType === 'Service' && 'Best for: Service pages (Executive Search, Healthcare Staffing, etc.)'}
          {schemaType === 'FAQ' && 'Best for: Resource pages, FAQ sections'}
          {!schemaType && 'Select a schema type to add structured data'}
        </p>
      </div>

      {/* Inheritance Toggle */}
      {canInherit && (
        <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
          <Switch
            checked={inheritOrganization}
            onCheckedChange={setInheritOrganization}
            disabled={loadingHomeSchema}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <Label className="font-medium">Inherit Organization schema from Home page</Label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Automatically include Organization structured data alongside this page's {schemaType} schema
            </p>
            {inheritOrganization && homePageSchema && (
              <Badge variant="secondary" className="mt-2">
                Inheriting: {homePageSchema.name}
              </Badge>
            )}
          </div>
        </div>
      )}

      {pageSlug !== 'home' && !homePageSchema && !loadingHomeSchema && schemaType && schemaType !== 'Organization' && (
        <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <p className="text-xs text-muted-foreground">
            Tip: Add an Organization schema to your Home page to enable inheritance on child pages.
          </p>
        </div>
      )}

      {schemaType && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleResetToDefault}>
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset to Defaults
          </Button>
          <Button variant="outline" size="sm" onClick={copyJson}>
            <Copy className="h-3 w-3 mr-1" />
            Copy JSON
          </Button>
        </div>
      )}

      {/* Organization Form */}
      {schemaType === 'Organization' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Organization Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={(orgForm.name as string) || ''}
                  onChange={e => setOrgForm({ ...orgForm, name: e.target.value })}
                  placeholder="Engaged Headhunters"
                />
              </div>
              <div className="space-y-2">
                <Label>Alternate Name</Label>
                <Input
                  value={(orgForm.alternateName as string) || ''}
                  onChange={e => setOrgForm({ ...orgForm, alternateName: e.target.value })}
                  placeholder="EH Staffing"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>URL *</Label>
              <Input
                value={(orgForm.url as string) || ''}
                onChange={e => setOrgForm({ ...orgForm, url: e.target.value })}
                placeholder="https://www.engagedheadhunters.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input
                value={(orgForm.logo as string) || ''}
                onChange={e => setOrgForm({ ...orgForm, logo: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={(orgForm.description as string) || ''}
                onChange={e => setOrgForm({ ...orgForm, description: e.target.value })}
                rows={2}
              />
            </div>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Address
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-3">
                <Input
                  value={(orgForm.streetAddress as string) || ''}
                  onChange={e => setOrgForm({ ...orgForm, streetAddress: e.target.value })}
                  placeholder="Street Address"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    value={(orgForm.city as string) || ''}
                    onChange={e => setOrgForm({ ...orgForm, city: e.target.value })}
                    placeholder="City"
                  />
                  <Input
                    value={(orgForm.state as string) || ''}
                    onChange={e => setOrgForm({ ...orgForm, state: e.target.value })}
                    placeholder="State"
                  />
                  <Input
                    value={(orgForm.postalCode as string) || ''}
                    onChange={e => setOrgForm({ ...orgForm, postalCode: e.target.value })}
                    placeholder="Zip"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Contact
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={(orgForm.telephone as string) || ''}
                    onChange={e => setOrgForm({ ...orgForm, telephone: e.target.value })}
                    placeholder="Phone"
                  />
                  <Input
                    value={(orgForm.contactType as string) || ''}
                    onChange={e => setOrgForm({ ...orgForm, contactType: e.target.value })}
                    placeholder="Contact Type"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Social Profiles ({((orgForm.socialProfiles as string[]) || []).length})
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-2">
                {((orgForm.socialProfiles as string[]) || []).map((profile, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={profile}
                      onChange={e => updateSocialProfile(index, e.target.value)}
                      placeholder="https://linkedin.com/..."
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeSocialProfile(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addSocialProfile}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Profile
                </Button>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex items-center gap-3 pt-2">
              <Switch
                checked={(orgForm.includeRating as boolean) || false}
                onCheckedChange={checked => setOrgForm({ ...orgForm, includeRating: checked })}
              />
              <Label>Include Aggregate Rating</Label>
            </div>

            {Boolean(orgForm.includeRating) && (
              <div className="grid grid-cols-2 gap-3 pl-6">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={(orgForm.ratingValue as string) || ''}
                    onChange={e => setOrgForm({ ...orgForm, ratingValue: e.target.value })}
                    placeholder="4.9"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reviews</Label>
                  <Input
                    type="number"
                    value={(orgForm.reviewCount as string) || ''}
                    onChange={e => setOrgForm({ ...orgForm, reviewCount: e.target.value })}
                    placeholder="127"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Local Business Form */}
      {schemaType === 'LocalBusiness' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Local Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name *</Label>
              <Input
                value={(localForm.name as string) || ''}
                onChange={e => setLocalForm({ ...localForm, name: e.target.value })}
                placeholder="Engaged Headhunters - Houston"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={(localForm.telephone as string) || ''}
                  onChange={e => setLocalForm({ ...localForm, telephone: e.target.value })}
                  placeholder="+1-713-..."
                />
              </div>
              <div className="space-y-2">
                <Label>Price Range</Label>
                <Input
                  value={(localForm.priceRange as string) || ''}
                  onChange={e => setLocalForm({ ...localForm, priceRange: e.target.value })}
                  placeholder="$$"
                />
              </div>
            </div>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Address
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-3">
                <Input
                  value={(localForm.streetAddress as string) || ''}
                  onChange={e => setLocalForm({ ...localForm, streetAddress: e.target.value })}
                  placeholder="Street Address"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    value={(localForm.city as string) || ''}
                    onChange={e => setLocalForm({ ...localForm, city: e.target.value })}
                    placeholder="City"
                  />
                  <Input
                    value={(localForm.state as string) || ''}
                    onChange={e => setLocalForm({ ...localForm, state: e.target.value })}
                    placeholder="State"
                  />
                  <Input
                    value={(localForm.postalCode as string) || ''}
                    onChange={e => setLocalForm({ ...localForm, postalCode: e.target.value })}
                    placeholder="Zip"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Geo Coordinates
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Latitude</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={(localForm.latitude as string) || ''}
                      onChange={e => setLocalForm({ ...localForm, latitude: e.target.value })}
                      placeholder="29.7604"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Longitude</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={(localForm.longitude as string) || ''}
                      onChange={e => setLocalForm({ ...localForm, longitude: e.target.value })}
                      placeholder="-95.3698"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Business Hours
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map(day => (
                    <Badge
                      key={day}
                      variant={((localForm.openDays as string[]) || []).includes(day) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleDay(day)}
                    >
                      {day.slice(0, 3)}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Opens</Label>
                    <Input
                      type="time"
                      value={(localForm.opens as string) || '09:00'}
                      onChange={e => setLocalForm({ ...localForm, opens: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Closes</Label>
                    <Input
                      type="time"
                      value={(localForm.closes as string) || '17:00'}
                      onChange={e => setLocalForm({ ...localForm, closes: e.target.value })}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Areas Served ({((localForm.areaServed as string[]) || []).length})
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-2">
                {((localForm.areaServed as string[]) || []).map((area, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={area}
                      onChange={e => updateAreaServed(index, e.target.value, 'local')}
                      placeholder="Houston, TX"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeAreaServed(index, 'local')}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addAreaServed('local')}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Area
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}

      {/* Service Form */}
      {schemaType === 'Service' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Service Name *</Label>
                <Input
                  value={(serviceForm.name as string) || ''}
                  onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })}
                  placeholder="Executive Search Services"
                />
              </div>
              <div className="space-y-2">
                <Label>Service Type *</Label>
                <Input
                  value={(serviceForm.serviceType as string) || ''}
                  onChange={e => setServiceForm({ ...serviceForm, serviceType: e.target.value })}
                  placeholder="Executive Search"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={(serviceForm.description as string) || ''}
                onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}
                rows={2}
                placeholder="Professional executive search services helping businesses find top-tier leadership talent."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={(serviceForm.url as string) || ''}
                  onChange={e => setServiceForm({ ...serviceForm, url: e.target.value })}
                  placeholder="https://www.engagedheadhunters.com/executive-search"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={(serviceForm.category as string) || ''}
                  onChange={e => setServiceForm({ ...serviceForm, category: e.target.value })}
                  placeholder="Recruiting Services"
                />
              </div>
            </div>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Provider
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Provider Name</Label>
                    <Input
                      value={(serviceForm.providerName as string) || ''}
                      onChange={e => setServiceForm({ ...serviceForm, providerName: e.target.value })}
                      placeholder="Engaged Headhunters"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Provider URL</Label>
                    <Input
                      value={(serviceForm.providerUrl as string) || ''}
                      onChange={e => setServiceForm({ ...serviceForm, providerUrl: e.target.value })}
                      placeholder="https://www.engagedheadhunters.com"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Areas Served ({((serviceForm.areaServed as string[]) || []).length})
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-2">
                {((serviceForm.areaServed as string[]) || []).map((area, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={area}
                      onChange={e => updateAreaServed(index, e.target.value, 'service')}
                      placeholder="United States"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeAreaServed(index, 'service')}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addAreaServed('service')}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Area
                </Button>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex items-center gap-3 pt-2">
              <Switch
                checked={(serviceForm.includePricing as boolean) || false}
                onCheckedChange={checked => setServiceForm({ ...serviceForm, includePricing: checked })}
              />
              <Label>Include Pricing Information</Label>
            </div>

            {Boolean(serviceForm.includePricing) && (
              <div className="grid grid-cols-3 gap-3 pl-6">
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <Input
                    value={(serviceForm.priceRange as string) || ''}
                    onChange={e => setServiceForm({ ...serviceForm, priceRange: e.target.value })}
                    placeholder="Contact for quote"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={(serviceForm.currency as string) || 'USD'}
                    onValueChange={value => setServiceForm({ ...serviceForm, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select
                    value={(serviceForm.availability as string) || 'https://schema.org/OnlineOnly'}
                    onValueChange={value => setServiceForm({ ...serviceForm, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="https://schema.org/OnlineOnly">Online Only</SelectItem>
                      <SelectItem value="https://schema.org/InStock">In Stock</SelectItem>
                      <SelectItem value="https://schema.org/OnDemand">On Demand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                Service Offerings ({((serviceForm.offerings as string[]) || []).length})
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-2">
                {((serviceForm.offerings as string[]) || []).map((offering, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={offering}
                      onChange={e => updateOffering(index, e.target.value)}
                      placeholder="C-Suite Placement"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeOffering(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addOffering}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Offering
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}

      {/* FAQ Form */}
      {schemaType === 'FAQ' && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">FAQ Items ({faqItems.length})</CardTitle>
              <Button size="sm" onClick={addFaqItem}>
                <Plus className="h-3 w-3 mr-1" />
                Add FAQ
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">FAQ {index + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeFaqItem(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Question *</Label>
                  <Input
                    value={item.question}
                    onChange={e => updateFaqItem(index, 'question', e.target.value)}
                    placeholder="What industries do you specialize in?"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Answer *</Label>
                  <Textarea
                    value={item.answer}
                    onChange={e => updateFaqItem(index, 'answer', e.target.value)}
                    rows={2}
                    placeholder="We specialize in healthcare, technology, finance..."
                  />
                </div>
              </div>
            ))}
            {faqItems.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No FAQ items yet. Click "Add FAQ" to create one.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Validation Status */}
      {schemaType && (
        <div className="space-y-2">
          {validation.errors.length > 0 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">Validation Errors</p>
                <ul className="text-xs text-muted-foreground mt-1">
                  {validation.errors.map((err, i) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {validation.warnings.length > 0 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-500">Warnings</p>
                <ul className="text-xs text-muted-foreground mt-1">
                  {validation.warnings.map((warn, i) => (
                    <li key={i}>• {warn}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {validation.valid && validation.errors.length === 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <p className="text-sm font-medium text-green-700 dark:text-green-500">
                Valid {schemaType} Schema
                {inheritOrganization && ' + Organization (inherited)'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* JSON Preview */}
      {schemaType && (
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
            <ChevronDown className="h-4 w-4" />
            JSON-LD Preview
            {inheritOrganization && (
              <Badge variant="secondary" className="ml-2">Combined Schema</Badge>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto max-h-64">
              {JSON.stringify(buildFinalSchema(), null, 2)}
            </pre>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
