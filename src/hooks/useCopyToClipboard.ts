// src/hooks/useCopyToClipboard.ts
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { copyText } from '../utils/clipboard';

export function useCopyToClipboard(toastDurationMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  const copy = useCallback(async (text: string) => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), toastDurationMs);
    }
    return ok;
  }, [toastDurationMs]);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  return { copied, copy };
}
