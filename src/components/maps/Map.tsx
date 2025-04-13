'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngTuple } from 'leaflet';

interface Business {
  id: number;
  name: string;
  location: string;
  coordinates: LatLngTuple;
  status: 'Compliant' | 'Partial' | 'Non-compliant';
  complianceScore: number;
}

interface MapProps {
  businesses: Business[];
}

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Map({ businesses }: MapProps) {
  useEffect(() => {
    // Fix for marker icons in Leaflet
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
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
} 