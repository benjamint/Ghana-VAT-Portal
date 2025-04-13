'use client';

import { useEffect, useState } from 'react';
import type { LatLngTuple } from 'leaflet';

interface Business {
  id: number;
  name: string;
  location: string;
  coordinates: LatLngTuple;
  status: 'Compliant' | 'Partial' | 'Non-compliant';
  complianceScore: number;
}

interface ClientSideMapProps {
  businesses: Business[];
}

export default function ClientSideMap({ businesses }: ClientSideMapProps) {
  const [Map, setMap] = useState<any>(null);

  useEffect(() => {
    // Import map modules only on client side
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
      import('leaflet/dist/leaflet.css')
    ]).then(([L, { MapContainer, TileLayer, Marker, Popup }]) => {
      // Set up leaflet icon
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: '/images/marker-icon.png',
        iconRetinaUrl: '/images/marker-icon-2x.png',
        shadowUrl: '/images/marker-shadow.png',
      });

      // Create map component
      const MapComponent = () => (
        <MapContainer
          center={[7.9465, -1.0232] as LatLngTuple}
          zoom={6}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {businesses.map((business) => (
            <Marker
              key={business.id}
              position={business.coordinates}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">{business.name}</h3>
                  <p className="text-sm text-gray-600">{business.location}</p>
                  <p className="text-sm mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        business.status === 'Compliant'
                          ? 'bg-blue-100 text-blue-800'
                          : business.status === 'Partial'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {business.status}
                    </span>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      );

      setMap(() => MapComponent);
    });
  }, [businesses]);

  if (!Map) {
    return (
      <div className="w-full h-[400px] rounded-lg bg-gray-100 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return <Map />;
} 