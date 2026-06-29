import fs from "node:fs";
import path from "node:path";
import { projects, type Project, type ProjectCategory } from "@/data/siteContent";

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

// Turkish letters have no ASCII decomposition (NFKD leaves them as-is), so
// without this map "Salına" would turn into "sal-na" instead of "salina".
const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};
const TURKISH_CHAR_REGEX = new RegExp(Object.keys(TURKISH_CHAR_MAP).join("|"), "g");

export function slugify(value: string): string {
  return value
    .replace(TURKISH_CHAR_REGEX, (char) => TURKISH_CHAR_MAP[char])
    .toLowerCase()
    .normalize("NFKD")
    .replace(DIACRITICS_REGEX, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Routing/URL için kullanılan kimlik — proje başlığından otomatik üretilir. */
export function getProjectSlug(project: Project): string {
  return slugify(project.title);
}

/**
 * Work sayfasındaki "All" sekmesinde gösterilen sıra: kategoriye göre
 * gruplanmaz, sadece `order` alanına göre sıralanır — bu da kategorileri
 * doğal olarak birbirine karıştırır (karışık görünüm).
 */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return [...projects]
    .filter((project) => project.category === category)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return [...projects]
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => getProjectSlug(project) === slug);
}

/**
 * `public/` klasörüne göre verilen bir yolun gerçekten var olup olmadığını
 * kontrol eder. Boş bir alan veya bulunamayan bir dosya yolu sessizce
 * yok sayılır — bu sayede henüz bir görsel eklenmemiş olması hiçbir hataya
 * veya bozuk görsele yol açmaz, sadece mevcut tasarımdaki yer tutucu
 * gösterilmeye devam eder.
 */
export function resolvePublicImage(relativePath: string | undefined): string | undefined {
  if (!relativePath) return undefined;
  const normalized = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  const absolutePath = path.join(process.cwd(), "public", normalized);
  return fs.existsSync(absolutePath) ? normalized : undefined;
}
