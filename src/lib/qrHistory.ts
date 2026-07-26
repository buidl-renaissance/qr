import type { QrStudioOptions } from "./qrDefaults";

const STORAGE_KEY = "qr-studio-history";
const MAX_ITEMS = 40;

export interface QrHistoryItem {
  id: string;
  savedAt: number;
  /** Encoded content (URL / text) */
  data: string;
  options: QrStudioOptions;
}

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function loadHistory(): QrHistoryItem[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QrHistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.data === "string" &&
        item.options &&
        typeof item.savedAt === "number"
    );
  } catch {
    return [];
  }
}

export function saveHistory(items: QrHistoryItem[]) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch {
    // Quota exceeded — drop logos and retry with fewer items
    try {
      const slim = items.slice(0, Math.min(items.length, 20)).map((item) => ({
        ...item,
        options: {
          ...item.options,
          logo: { ...item.options.logo, src: null },
        },
      }));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
    } catch {
      // ignore
    }
  }
}

/** Snapshot current options into history (newest first). Dedupes by identical data + style fingerprint. */
export function pushHistory(
  existing: QrHistoryItem[],
  options: QrStudioOptions
): QrHistoryItem[] {
  const data = options.data.trim();
  if (!data) return existing;

  const item: QrHistoryItem = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    savedAt: Date.now(),
    data,
    options: structuredClone(options),
  };

  const withoutDup = existing.filter(
    (h) => !(h.data === item.data && styleKey(h.options) === styleKey(item.options))
  );

  return [item, ...withoutDup].slice(0, MAX_ITEMS);
}

export function removeHistoryItem(
  existing: QrHistoryItem[],
  id: string
): QrHistoryItem[] {
  return existing.filter((item) => item.id !== id);
}

function styleKey(options: QrStudioOptions): string {
  // Exclude logo src (large) for cheap compare
  const { logo, ...rest } = options;
  return JSON.stringify({
    ...rest,
    logo: {
      imageSize: logo.imageSize,
      margin: logo.margin,
      hideBackgroundDots: logo.hideBackgroundDots,
      hasLogo: !!logo.src,
    },
  });
}

export function formatHistoryLabel(data: string, max = 36): string {
  const trimmed = data.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}
