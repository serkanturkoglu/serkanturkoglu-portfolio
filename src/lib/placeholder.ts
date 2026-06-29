function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/**
 * Deterministic grayscale gradient used as a stand-in for real poster
 * frames/photography. Swap `ProjectCard`/project pages over to real
 * thumbnails (next/image) once footage is available — nothing else needs
 * to change.
 */
export function placeholderGradient(seed: string): string {
  const h = hash(seed);
  const angle = h % 360;
  const baseLight = 14 + (h % 6);
  const peakLight = 24 + ((h >> 3) % 10);
  return `linear-gradient(${angle}deg, hsl(0 0% ${baseLight}%) 0%, hsl(0 0% ${peakLight}%) 55%, hsl(0 0% ${baseLight}%) 100%)`;
}
