// src/components/clickableEmail.tsx
'use client';

import { Mail } from 'lucide-react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
type Props = {
  email?: string;
  label?: string;
  className?: string;
  iconSize?: number;
  toastDurationMs?: number;
};



export default function ClickableEmail({
  email = 'shannonkendall14@gmail.com',
  label,
  className = '',
  iconSize = 24,
  toastDurationMs = 2000,
}: Props) {
  const { copied, copy } = useCopyToClipboard(toastDurationMs);

  return (
    <>
      <button
        type="button"
        onClick={() => copy(email)}
    
        className={[
          'text-cadetGray/60 text-lg sm:text-xl mt-4 flex items-center rounded-md hover:bg-bone hover:text-white ',
          'transition-colors tracking-wider px-2 py-1',
          className,
        ].join(' ')}
        aria-label={`Copy ${email} to clipboard`}>
        <Mail size={iconSize} />
        <span className="ml-2">{label ?? email}</span>
      </button>

      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 left-1/2 -translate-x-1/2 w-72 text-center px-5 py-2 rounded-md shadow-lg bg-[#D1E231] text-black font-mono z-50"
        >
          Email copied to clipboard!
        </div>
      )}
    </>
  );
}
