'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Dispatch, SetStateAction } from 'react';

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

type BusinessStatus = 'Compliant' | 'Partial' | 'Non-compliant';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Business {
  id: number;
  name: string;
  location: string;
  coordinates: Coordinates;
  status: BusinessStatus;
  complianceScore: number;
}

interface MapComponentProps {
  businesses: Business[];
  onSelectBusiness: Dispatch<SetStateAction<Business | null>>;
}

export default function MapComponent({ businesses, onSelectBusiness }: MapComponentProps) {
  return (
    <MapContainer
      center={[7.9465, -1.0232]} // Center of Ghana
      zoom={6}
      className="h-full w-full rounded-lg"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {businesses.map((business) => (
        <Marker
          key={business.id}
          position={[business.coordinates.lat, business.coordinates.lng]}
          eventHandlers={{
            click: () => onSelectBusiness(business),
          }}
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