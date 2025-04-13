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
  logoUrl: string;
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
    logoUrl: '/logos/sage.png'
  },
  // ... rest of the businesses data
];

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    console.log('Map effect running, isMapReady:', isMapReady);
    if (!mapRef.current || mapInstanceRef.current || !isMapReady) {
      console.log('Map initialization conditions not met:', {
        mapRefExists: !!mapRef.current,
        mapInstanceExists: !!mapInstanceRef.current,
        isMapReady
      });
      return;
    }

    const initMap = async () => {
      try {
        const L = (window as any).L;
        if (!L) {
          console.error('Leaflet not loaded');
          return;
        }
        console.log('Initializing map...');

        // Initialize map
        const map = L.map(mapRef.current).setView([7.9465, -1.0232], 7);
        mapInstanceRef.current = map;

        // Add tile layer first
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const { publicRuntimeConfig } = getConfig();
        const basePath = publicRuntimeConfig?.basePath || '';

        // Initialize default icon with correct paths
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: `${basePath}/images/marker-icon-2x.png`,
          iconUrl: `${basePath}/images/marker-icon.png`,
          shadowUrl: `${basePath}/images/marker-shadow.png`,
        });

        // Create custom icon for businesses
        const createBusinessIcon = (compliance: ComplianceStatus) => {
          return L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${complianceConfig[compliance].color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });
        };

        // Add markers for each business
        businesses.forEach(business => {
          const marker = L.marker([business.lat, business.lng], {
            icon: createBusinessIcon(business.compliance)
          });

          const popupContent = `
            <div class="p-2">
              <div class="mb-3">
                <h3 class="font-semibold text-lg mb-1">${business.fullName}</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" 
                  style="background-color: ${complianceConfig[business.compliance].color}20; 
                         color: ${complianceConfig[business.compliance].color}">
                  ${complianceConfig[business.compliance].label}
                </span>
              </div>
              <div class="space-y-2 text-sm text-gray-600">
                <p class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  ${business.location}
                </p>
                <p class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  ${business.phone}
                </p>
              </div>
              <div class="mt-3 pt-2 border-t border-gray-100">
                <p class="text-xs text-gray-400 text-left">Powered by ScoreTrux</p>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, {
            maxWidth: 300
          }).addTo(map);
        });

        console.log('Map initialization complete');
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
    <div className="relative">
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('Leaflet script loaded');
          setIsMapReady(true);
        }}
      />
      <div 
        ref={mapRef} 
        className="w-full h-[400px] rounded-lg overflow-hidden" 
        style={{ position: 'relative', zIndex: 1 }}
      />
    </div>
  );
} 