'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';

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
  { 
    id: 2, 
    name: 'MTN Ghana', 
    fullName: 'MTN Ghana Limited',
    location: 'MTN House, Independence Avenue, Accra',
    phone: '+233 24 444 0000',
    lat: 5.6200, 
    lng: -0.2000, 
    compliance: 'compliant',
    logoUrl: '/logos/mtn.png'
  },
  { 
    id: 3, 
    name: 'Melcom', 
    fullName: 'Melcom Group of Companies',
    location: 'North Industrial Area, Accra',
    phone: '+233 30 222 3333',
    lat: 6.7000, 
    lng: -1.6167, 
    compliance: 'partial',
    logoUrl: '/logos/melcom.png'
  },
  { 
    id: 4, 
    name: 'GHACEM', 
    fullName: 'GHACEM Limited',
    location: 'Factory Road, Tema',
    phone: '+233 30 320 2250',
    lat: 4.9000, 
    lng: -1.7667, 
    compliance: 'compliant',
    logoUrl: '/logos/ghacem.png'
  },
  { 
    id: 5, 
    name: 'Vodafone', 
    fullName: 'Vodafone Ghana',
    location: 'Manet Tower A, Airport City, Accra',
    phone: '+233 20 420 0000',
    lat: 9.4000, 
    lng: -0.8500, 
    compliance: 'compliant',
    logoUrl: '/logos/vodafone.png'
  },
  { 
    id: 6, 
    name: 'Ecobank', 
    fullName: 'Ecobank Ghana Limited',
    location: '2 Morocco Road, Ridge, Accra',
    phone: '+233 30 268 3999',
    lat: 5.1000, 
    lng: -1.2500, 
    compliance: 'compliant',
    logoUrl: '/logos/ecobank.png'
  },
  { 
    id: 7, 
    name: 'Palace Mall', 
    fullName: 'Palace Shopping Mall',
    location: 'Atomic Road, Accra',
    phone: '+233 30 273 8888',
    lat: 6.6000, 
    lng: 0.4667, 
    compliance: 'partial',
    logoUrl: '/logos/palace.png'
  },
  { 
    id: 8, 
    name: 'Ashfoam', 
    fullName: 'Ashfoam Ghana Limited',
    location: 'South Industrial Area, Accra',
    phone: '+233 30 222 4444',
    lat: 7.3333, 
    lng: -2.3333, 
    compliance: 'partial',
    logoUrl: '/logos/ashfoam.png'
  },
  { 
    id: 9, 
    name: 'GCB Bank', 
    fullName: 'GCB Bank Limited',
    location: 'High Street, Accra',
    phone: '+233 30 221 0369',
    lat: 5.6667, 
    lng: -0.0167, 
    compliance: 'compliant',
    logoUrl: '/logos/gcb.png'
  },
  { 
    id: 10, 
    name: 'Game', 
    fullName: 'Game Stores Ghana',
    location: 'Accra Mall, Spintex Road',
    phone: '+233 30 274 5555',
    lat: 6.0833, 
    lng: -0.2500, 
    compliance: 'non-compliant',
    logoUrl: '/logos/game.png'
  },
  { 
    id: 11, 
    name: 'Max Mart', 
    fullName: 'Max Mart Family Shopping Center',
    location: '37 Liberation Road, Accra',
    phone: '+233 30 277 7777',
    lat: 10.7833, 
    lng: -0.8500, 
    compliance: 'partial',
    logoUrl: '/logos/maxmart.png'
  },
  { 
    id: 12, 
    name: 'Unilever', 
    fullName: 'Unilever Ghana Limited',
    location: 'Theme Heavy Industrial Area',
    phone: '+233 30 321 3111',
    lat: 10.0667, 
    lng: -2.5000, 
    compliance: 'compliant',
    logoUrl: '/logos/unilever.png'
  },
  { 
    id: 13, 
    name: 'Shoprite', 
    fullName: 'Shoprite Ghana',
    location: 'Accra Mall, Tetteh Quarshie',
    phone: '+233 30 274 6666',
    lat: 5.0833, 
    lng: -1.3500, 
    compliance: 'non-compliant',
    logoUrl: '/logos/shoprite.png'
  },
  { 
    id: 14, 
    name: 'Cal Bank', 
    fullName: 'Cal Bank Limited',
    location: '23 Independence Avenue, Accra',
    phone: '+233 30 221 2332',
    lat: 4.9333, 
    lng: -1.7000, 
    compliance: 'partial',
    logoUrl: '/logos/calbank.png'
  },
  { 
    id: 15, 
    name: 'Fan Milk', 
    fullName: 'Fan Milk Limited',
    location: 'Industrial Area, North Kaneshie',
    phone: '+233 30 222 2222',
    lat: 7.5833, 
    lng: -1.9333, 
    compliance: 'compliant',
    logoUrl: '/logos/fanmilk.png'
  },
];

// Compliance status colors and labels
const complianceConfig: Record<ComplianceStatus, { color: string; label: string }> = {
  'compliant': { color: '#22c55e', label: 'Compliant' },
  'partial': { color: '#eab308', label: 'Partially Compliant' },
  'non-compliant': { color: '#ef4444', label: 'Non-Compliant' }
};

export default function BusinessMap() {
  useEffect(() => {
    // Dynamic import of leaflet
    import('leaflet').then((L) => {
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

      // Initialize map
      const map = L.map('map').setView([7.9465, -1.0232], 7);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

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

      return () => {
        map.remove();
      };
    });
  }, []);

  return <div id="map" className="w-full h-[400px] rounded-lg overflow-hidden" />;
} 