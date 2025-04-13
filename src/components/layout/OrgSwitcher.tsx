'use client';

import React, { useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

const organizations = [
  {
    id: 1,
    name: 'Sage Microsystems',
    current: true,
  },
  {
    id: 2,
    name: 'GRA',
    current: false,
  },
  {
    id: 3,
    name: 'VAT',
    current: false,
  },
];

export default function OrgSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-56">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-base hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#5266eb] text-xs font-semibold text-white">
            SM
          </div>
          <span className="truncate font-medium text-gray-900 dark:text-white">
            Sage Microsystems
          </span>
        </div>
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400 ml-auto" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700 min-w-[240px]">
          <div className="py-2">
            <a href="#" className="block px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Settings</a>
            
            <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>
            
            <div className="px-3 pb-2 text-sm text-gray-500 dark:text-gray-400">
              Switch accounts
            </div>
            
            {organizations.map((org) => (
              <a
                key={org.id}
                href="#"
                className="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-[#5266eb] text-xs font-semibold text-white">
                    {org.name === 'Sage Microsystems' ? 'SM' : org.name.substring(0, 2)}
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">{org.name}</span>
                </div>
                {org.current && (
                  <svg className="h-4 w-4 text-[#5266eb]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </a>
            ))}

            <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>

            <div className="px-3 py-1">
              <button className="block w-full text-left py-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 