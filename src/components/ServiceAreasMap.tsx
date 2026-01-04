import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { usePathnames, Location } from '@/hooks/useLocation';

const ServiceAreasMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenLoading, setTokenLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: locations, isLoading: locationsLoading } = usePathnames();

  useEffect(() => {
    // Fetch the Mapbox token from edge function secrets
    async function fetchToken() {
      try {
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        if (error) {
          // Fallback: use hardcoded token from secrets (already added)
          setMapboxToken('pk.eyJ1IjoiYm9va21vcmV0ZWV0aW1lcyIsImEiOiJjbWo3bnV2bWEwNjlzM2RveGFldHB3ZmV3In0._n5ZmiGRzUjP8UfUCE5wBQ');
        } else if (data?.token) {
          setMapboxToken(data.token);
        } else {
          // Use the token directly since it's public
          setMapboxToken('pk.eyJ1IjoiYm9va21vcmV0ZWV0aW1lcyIsImEiOiJjbWo3bnV2bWEwNjlzM2RveGFldHB3ZmV3In0._n5ZmiGRzUjP8UfUCE5wBQ');
        }
      } catch (err) {
        // Use the token directly since it's public
        setMapboxToken('pk.eyJ1IjoiYm9va21vcmV0ZWV0aW1lcyIsImEiOiJjbWo3bnV2bWEwNjlzM2RveGFldHB3ZmV3In0._n5ZmiGRzUjP8UfUCE5wBQ');
      } finally {
        setTokenLoading(false);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || tokenLoading || locationsLoading || !locations) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-98.5795, 39.8283], // Center of US
        zoom: 3.5,
        pitch: 0,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: false,
        }),
        'top-right'
      );

      // Add markers for each location from database
      const validLocations = locations.filter(loc => loc.geo_lat && loc.geo_lng);

      validLocations.forEach((location: Location) => {
        const markerColor =
          location.market_type === 'headquarters' ? '#FF6B35' :
            location.market_type === 'primary' ? '#006DB0' : '#002855';

        const markerSize =
          location.market_type === 'headquarters' ? 'large' :
            location.market_type === 'primary' ? 'medium' : 'small';

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.cssText = `
          width: ${markerSize === 'large' ? '24px' : markerSize === 'medium' ? '18px' : '14px'};
          height: ${markerSize === 'large' ? '24px' : markerSize === 'medium' ? '18px' : '14px'};
          background-color: ${markerColor};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer;
        `;

        const industryText = location.industries?.join(', ') || 'Multiple industries';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px; color: #002855;">${location.display_name}</h3>
            <p style="font-size: 12px; color: #666; margin: 0;">${industryText}</p>
            ${location.market_type === 'headquarters' ? '<span style="font-size: 10px; background: #FF6B35; color: white; padding: 2px 6px; border-radius: 4px; margin-top: 4px; display: inline-block;">HQ</span>' : ''}
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat([location.geo_lng!, location.geo_lat!])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Fit bounds to show all markers
      if (validLocations.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        validLocations.forEach(loc => bounds.extend([loc.geo_lng!, loc.geo_lat!]));
        map.current.fitBounds(bounds, { padding: 50, maxZoom: 5 });
      }

    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to load map');
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, tokenLoading, locationsLoading, locations]);

  if (tokenLoading || locationsLoading) {
    return (
      <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className="w-full h-96 rounded-xl shadow-lg" />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-md">
        <h4 className="font-semibold text-sm text-foreground mb-2">Service Areas</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent border-2 border-white shadow"></div>
            <span className="text-muted-foreground">Headquarters</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary border-2 border-white shadow"></div>
            <span className="text-muted-foreground">Primary Markets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#002855] border-2 border-white shadow"></div>
            <span className="text-muted-foreground">National Coverage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasMap;
