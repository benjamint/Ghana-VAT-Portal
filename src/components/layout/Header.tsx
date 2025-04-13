'use client';

import React from 'react';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const pageTitle = pathname === '/dashboard' || pathname === '/' 
    ? 'Dashboard' 
    : pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            placeholder="Search or jump to..."
            className="block w-72 rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-[#5266eb] focus:outline-none focus:ring-1 focus:ring-[#5266eb] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <kbd className="rounded bg-gray-100 px-1.5 text-xs text-gray-500 dark:bg-gray-600 dark:text-gray-400">⌘K</kbd>
          </div>
        </div>

        {/* Add Business Button */}
        <button className="inline-flex items-center rounded-md bg-[#5266eb] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#4255da]">
          + Add Business
        </button>

        {/* Notifications */}
        <button className="relative rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300">
          <BellIcon className="h-6 w-6" />
        </button>

        {/* Avatar */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5266eb] text-sm font-medium text-white">
          A
        </button>
      </div>
    </header>
  );
} 