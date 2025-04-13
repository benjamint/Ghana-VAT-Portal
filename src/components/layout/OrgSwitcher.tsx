'use client';

import React from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

export default function OrgSwitcher() {
  return (
    <div className="relative w-56">
      <button
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
    </div>
  );
} 