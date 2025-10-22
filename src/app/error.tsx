// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Server error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-7xl font-bold text-red-600"
      >
        500
      </motion.h1>
      <p className="mt-4 text-lg text-gray-600">
        Something went wrong on our end. We’re working on it!
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
