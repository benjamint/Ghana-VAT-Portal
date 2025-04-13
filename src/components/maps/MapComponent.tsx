'use client';

import { useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import Script from 'next/script';

type ComplianceStatus = 'compliant' | 'partial' | 'non-compliant';

interface Business {
  id: number;
  name: string;
  fullName: string;
  location: string;
  phone: string;
  lat: number;
  lng: number;
  compliance: ComplianceStatus;
  sector: string;
}

// Compliance status colors and labels
const complianceConfig: Record<ComplianceStatus, { color: string; label: string }> = {
  'compliant': { color: '#22c55e', label: 'Compliant' },
  'partial': { color: '#eab308', label: 'Partially Compliant' },
  'non-compliant': { color: '#ef4444', label: 'Non-Compliant' }
};

// Business data with locations
const businesses: Business[] = [
  { 
    id: 1, 
    name: 'Sage Microsystems', 
    fullName: 'Sage Microsystems Ghana Ltd.',
    location: '14 Independence Ave, Airport City, Accra',
    phone: '+233 30 273 4567',
    lat: 5.6037, 
    lng: -0.1870, 
    compliance: 'compliant',
    sector: 'Technology'
  },
  {
    id: 2,
    name: 'Golden Coast Traders',
    fullName: 'Golden Coast Traders & Logistics',
    location: 'Tema Industrial Area, Greater Accra',
    phone: '+233 30 320 1234',
    lat: 5.6348,
    lng: -0.0174,
    compliance: 'partial',
    sector: 'Logistics'
  },
  {
    id: 3,
    name: 'Ashanti Gold Markets',
    fullName: 'Ashanti Gold Markets International',
    location: 'Kumasi Central Market, Kumasi',
    phone: '+233 32 202 5678',
    lat: 6.6885,
    lng: -1.6244,
    compliance: 'compliant',
    sector: 'Trading'
  },
  {
    id: 4,
    name: 'Volta Electronics',
    fullName: 'Volta Electronics & Appliances Ltd.',
    location: 'Ho Municipal, Volta Region',
    phone: '+233 36 208 9012',
    lat: 6.6016,
    lng: 0.4725,
    compliance: 'non-compliant',
    sector: 'Electronics'
  },
  {
    id: 5,
    name: 'Cape Coast Fisheries',
    fullName: 'Cape Coast Fisheries Co. Ltd.',
    location: 'Cape Coast Harbour, Central Region',
    phone: '+233 33 321 3456',
    lat: 5.1053,
    lng: -1.2466,
    compliance: 'partial',
    sector: 'Fisheries'
  }
];

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || !isMapReady) return;

    const initMap = async () => {
      try {
        const L = (window as any).L;
        if (!L) return;

        const map = L.map(mapRef.current).setView([7.9465, -1.0232], 7);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create custom icon for businesses
        const createBusinessIcon = (compliance: ComplianceStatus) => {
          return L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div style="
                background-color: ${complianceConfig[compliance].color}; 
                width: 32px; 
                height: 32px; 
                border-radius: 50%; 
                border: 3px solid white; 
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 8px;
                  height: 8px;
                  background: white;
                  border-radius: 50%;
                "></div>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });
        };

        // Add markers for each business
        businesses.forEach(business => {
          const marker = L.marker([business.lat, business.lng], {
            icon: createBusinessIcon(business.compliance)
          });

          const popupContent = `
            <div class="p-3 min-w-[250px]">
              <div class="mb-3">
                <h3 class="font-semibold text-lg mb-1">${business.fullName}</h3>
                <div class="flex items-center gap-2 mb-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                    style="background-color: ${complianceConfig[business.compliance].color}20; 
                           color: ${complianceConfig[business.compliance].color}">
                    ${complianceConfig[business.compliance].label}
                  </span>
                  <span class="text-xs text-gray-500">${business.sector}</span>
                </div>
              </div>
              <div class="space-y-2 text-sm text-gray-600">
                <p class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  ${business.location}
                </p>
                <p class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  ${business.phone}
                </p>
              </div>
              <div class="mt-3 pt-2 border-t border-gray-100">
                <p class="text-xs text-gray-400">Last updated: Today</p>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
          }).addTo(map);
        });

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMapReady]);

  return (
    <div className="relative w-full h-[400px]">
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="lazyOnload"
        onLoad={() => setIsMapReady(true)}
      />
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg overflow-hidden" 
        style={{ position: 'relative', zIndex: 1 }}
      />
    </div>
  );
}