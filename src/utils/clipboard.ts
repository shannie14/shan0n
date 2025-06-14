// src/utils/clipboard.js

/**
 * Copies the given text to the clipboard.
 * @param {string} text - The text to copy.
 * @param {function} [onSuccess] - Optional callback on successful copy.
 * @param {function} [onError] - Optional callback on failure.
 */
export function copyToClipboard(text, onSuccess, onError) {
    if (!navigator.clipboard) {
        try {
            document.execCommand('copy', true, text);
            onSuccess?.();
        } catch (err) {
            onError?.(err);
        }
        return;
    }

    navigator.clipboard
        .writeText(text)
        .then(() => onSuccess?.())
        .catch((err) => onError?.(err));
}
