// src/utils/clipboard.ts

/**
 * Copies the given text to the clipboard.
 *
 * @param text - The text to copy.
 * @param onSuccess - Optional callback on successful copy.
 * @param onError - Optional callback on failure.
 */
export function copyToClipboard(
    text: string,
    onSuccess?: () => void,
    onError?: (err: unknown) => void
  ): void {
    if (!navigator.clipboard) {
      try {
        document.execCommand("copy", true, text);
        onSuccess?.();
      } catch (err: unknown) {
        onError?.(err);
      }
      return;
    }
  
    navigator.clipboard
      .writeText(text)
      .then(() => {
        onSuccess?.();
      })
      .catch((err: unknown) => {
        onError?.(err);
      });
  }
  