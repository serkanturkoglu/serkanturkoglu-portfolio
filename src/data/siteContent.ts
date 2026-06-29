/**
 * ============================================================================
 * TÜM SİTE İÇERİĞİ — bu dosya
 * ============================================================================
 *
 * Bu dosya sitenin TEK içerik kaynağıdır. About, Contact, Footer, sosyal medya
 * linkleri ve tüm projeler buradan yönetilir. Tasarım/komponent dosyalarına
 * dokunmadan sadece bu dosyayı düzenleyerek siteyi güncelleyebilirsiniz.
 *
 * Detaylı kullanım rehberi için proje köküne bakın: README.md
 */

export type ProjectCategory = "music-video" | "commercial" | "fashion-film";

export interface SocialLink {
  label: string;
  href: string;
}

/** Kategori rozetlerinde / sekmelerde görünen isimler. */
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "music-video": "Music Videos",
  commercial: "Commercials",
  "fashion-film": "Fashion Film",
};

/** Work sayfasındaki sekmelerin sırası. */
export const CATEGORY_ORDER: ProjectCategory[] = [
  "music-video",
  "commercial",
  "fashion-film",
];

// ----------------------------------------------------------------------------
// ABOUT — kişisel / profil bilgileri
// ----------------------------------------------------------------------------
export interface AboutContent {
  name: string;
  shortName: string;
  role: string;
  shortBio: string;
  longBio: string[];
  location: string;
  availability: string;
  profileImage: string;
  email: string;
  socials: SocialLink[];
}

export const about: AboutContent = {
  /** Ana sayfa, About sayfası ve site başlığında görünen tam isim. */
  name: "Serkan Türkoğlu",
  /** Üst menüdeki logoda görünen kısa isim. */
  shortName: "Serkan Türkoğlu",
  role: "Director",
  /** Ana sayfa ve About sayfasındaki kısa, tek cümlelik tanıtım. */
  shortBio:
    "Serkan Türkoğlu, müzik videoları, reklam filmleri ve moda filmleri alanında çalışan bir yönetmendir. Görsel anlatım, sinematik atmosfer ve yaratıcı konsept geliştirme odaklı projeler üretmektedir.",
  /** About sayfasında her biri ayrı paragraf olarak gösterilen uzun biyografi. Yeni paragraf eklemek için diziye yeni bir satır ekleyin. */
  longBio: [
    "Serkan Türkoğlu, müzik videoları, reklam filmleri ve moda odaklı görsel projeler üreten bir yönetmendir. Çalışmalarında sinematik anlatımı, atmosferi ve güçlü görsel kompozisyonları ön planda tutarak her proje için kendine özgü bir dünya oluşturmayı hedefler.",
    "Müzik, moda ve çağdaş sinemadan beslenen yaklaşımıyla; markaların ve sanatçıların anlatmak istediği hikâyeleri estetik olduğu kadar duygusal bir etki de bırakacak şekilde görselleştirir.",
  
  ],
  location: "ISTANBUL",
  availability: "projeleriniz ve iş birlikleri için iletişime geçebilirsiniz.",
  /**
   * Profil fotoğrafının public/ klasörüne göre yolu. Dosyayı
   * public/images/ klasörüne koyup buradaki yolu güncelleyin — dosya
   * bulunamazsa About sayfası otomatik olarak mevcut tasarım yer
   * tutucusunu gösterir, hiçbir hata oluşmaz.
   */
  profileImage: "/images/profile.jpg",
  email: "contact@serkanturkoglu.com",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/serknturkoglu/" },
    { label: "Vimeo", href: "https://vimeo.com/serkanturkoglu" },
  ],
};

// ----------------------------------------------------------------------------
// CONTACT — Contact sayfasına özel metinler
// ----------------------------------------------------------------------------
export const contact = {
  heading: "İş Birliği İçin",
  intro:
    "Her güçlü proje iyi bir fikirle başlar. Projenizi benimle paylaşın, birlikte en doğru yaratıcı yaklaşımı belirleyelim.",
};

// ----------------------------------------------------------------------------
// FOOTER — site altlığındaki metinler
// ----------------------------------------------------------------------------
export const footer = {
  headline: "Her detay, anlatının bir parçasıdır.",
};

// ----------------------------------------------------------------------------
// PROJECTS — tüm projeler
// ----------------------------------------------------------------------------
export interface Project {
  title: string;
  category: ProjectCategory;
  year: number;
  description: string;
  /**
   * public/ klasörüne göre küçük resim yolu, örn. "/images/projects/no-vacancy.jpg".
   * Boş bırakılırsa Vimeo'nun kendi küçük resmi, o da yoksa mevcut gradyan
   * tasarımı otomatik olarak kullanılır.
   */
  thumbnail?: string;
  /**
   * Normal Vimeo linkini olduğu gibi yapıştırın: "https://vimeo.com/123456789".
   * Site bunu otomatik olarak oynatıcıya çevirir, ekstra embed linki
   * oluşturmanıza gerek yoktur. Unlisted (gizli) bir video için Vimeo'nun
   * verdiği linkteki "/HASH" kısmını da olduğu gibi bırakın.
   */
  vimeoUrl?: string;
  /** true yaparsanız proje ana sayfadaki "Selected Work" vitrininde görünür. */
  featured?: boolean;
  /** Sıralamayı belirler — küçük sayı önce gösterilir. */
  order: number;
  /** Opsiyonel: proje sayfasındaki bilgi panelinde gösterilir. */
  client?: string;
  /** Opsiyonel: proje sayfasındaki bilgi panelinde gösterilir. */
  role?: string;
}

/**
 * Yeni proje eklemek için bu diziye yeni bir obje ekleyin — başka hiçbir
 * dosyayı değiştirmeniz gerekmez. Sıralama tamamen `order` alanına göre
 * çalışır, `featured: true` olan projeler ana sayfada gösterilir.
 */
export const projects: Project[] = [
  {
    title: "M Lisa - Salına Salına (Official Music Video) ",
    category: "music-video",
    year: 2025,
    client: "Rapkology x Tizz Music",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1100479308",
    featured: true,
    order: 1,
  },
  {
    title: "Jeff Redd - Peşindeyim Hala (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "1OF1 Music",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1177071683",
    order: 2,
  },
  {
    title: "Jeff Redd x Reckol - 1OFBLANCOS (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "1OF1 Music",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1184106181",
    order: 3,
  },
    {
    title: "Lark2020 - HAYALLERİMİ VURDUM (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "Rapkology",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1198607967",
    order: 4,
  },
   {
    title: "Favor - VİCDAN (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "Rapkology",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1184102578",
    order: 5,
  },
     {
    title: "LARK20 - KESTİM (Official Music Video)",
    category: "music-video",
    year: 2025,
    client: "Rapkology",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1078833467",
    order: 6,
  },
  {
    title: "BATUBOW x KVCKIN - CL GANG (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "Rapkology",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1198603884",
    order: 7,
  },
    {
    title: "Canis - BUNA İNANMIYORUM (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "Rapkology",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1174594262",
    order: 8,
  },
      {
    title: "KNGL X ERAY067 & MANSUR - KATLİHAV 5 (OFFICIAL MUSIC VIDEO)",
    category: "music-video",
    year: 2026,
    client: "KNGL MUSIC",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1194693721",
    order: 9,
  },
        {
    title: "Helin - Kelimeler (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "Rapkology",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1095727227",
    order: 2,
  },
          {
    title: "KODA, SOYLU - AH KALPSİZ (Official Music Video)",
    category: "music-video",
    year: 2025,
    client: "KODAFLOWA",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1144273815",
    order: 10,
  },
         {
    title: "Canis - Bi Gün Anlarsın Beni (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "RAPKOLOGY",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1155528982",
    order: 10,
  },
      {
    title: "Favor - Çareler Ne (Official Music Video)",
    category: "music-video",
    year: 2025,
    client: "RAPKOLOGY",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1144277344",
    order: 11,
  },
        {
    title: "V - nAp Can LaN (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "RAPKOLOGY",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1177565834",
    order: 12,
  },

        {
    title: "KODA - ANNELER GİZLİ AĞLAR (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "KODAFLOWA",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1095716427",
    order: 13,
  },
        {
    title: "Kodaflowa - Hattına (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "KODAFLOWA",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1152416732",
    order: 14,
  },
         {
    title: "Favor - Göremem (Official Music Video)",
    category: "music-video",
    year: 2025,
    client: "RAPKOLOGY",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1144428793",
    order: 15,
  },
         {
    title: "BATUBOW x KVCKIN - ALO ALO (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "RAPKOLOGY",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1184108552",
    order: 16,
  },
        {
    title: "Turay - Firuze (Official Music Video)",
    category: "music-video",
    year: 2025,
    client: "RAPKOLOGY",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1144428119",
    order: 17,
  },
        {
    title: "Enko - Beklerim (Official Music Video)",
    category: "music-video",
    year: 2026,
    client: "MMC2 MUSIC",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/860670271",
    order: 18,
  },

  
  {
    title: "Spotify 2025 Wrapped | LVBEL C5 (Director's Cut)",
    category: "commercial",
    year: 2025,
    client: "SPOTIFY",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1149549769",
    featured: true,
    order: 1,
  },
    {
    title: "Spotify 2025 Wrapped | Emre Fel (Director's Cut)",
    category: "commercial",
    year: 2025,
    client: "SPOTIFY",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1149550536",
    featured: true,
    order: 2,
  },
      {
    title: "Mercedes Benz | 23 Nisan Ulusal Egemenlik Ve Çocuk Bayramı",
    category: "commercial",
    year: 2025,
    client: "Mercedes-Benz",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1078350966",
    featured: true,
    order: 3,
  },
      {
    title: "Puma Speedcat × Semra Terzi",
    category: "commercial",
    year: 2025,
    client: "Puma",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1146603499",
    featured: true,
    order: 4,
  },
      {
    title: "Schwarzkopf x Semra Terzi",
    category: "commercial",
    year: 2025,
    client: "Schwarzkopf",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1146596774",
    featured: true,
    order: 5,
  },
        {
    title: "Schwarzkopf x Lamia Demirel",
    category: "commercial",
    year: 2025,
    client: "Schwarzkopf",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1146596053",
    featured: true,
    order: 6,
  },

  {
    title: "VOID | Tennis Court Collection",
    category: "fashion-film",
    year: 2025,
    client: "VOID",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1100476945",
    featured: true,
    order: 1,
  },

    {
    title: "13th Society | This is Istanbul",
    category: "fashion-film",
    year: 2025,
    client: "13th Society",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1144269972",
    featured: true,
    order: 2,
  },
    {
    title: "VOID | BACK TO SCHOOL",
    category: "fashion-film",
    year: 2025,
    client: "VOID",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1149567165",
    featured: true,
    order: 3,
  },
    {
    title: "VOID | Summer Collection 2",
    category: "fashion-film",
    year: 2025,
    client: "VOID",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1078349443",
    featured: true,
    order: 4,
  },
  {
    title: "VOID | (Fashion Video)",
    category: "fashion-film",
    year: 2024,
    client: "VOID",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1177568643",
    featured: true,
    order: 5,
  },
    {
    title: "VOID | Emblem Detail Tracksuit",
    category: "fashion-film",
    year: 2025,
    client: "VOID",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1144269211",
    featured: true,
    order: 6,
  },
      {
    title: "VOID | Summer Collection",
    category: "fashion-film",
    year: 2025,
    client: "VOID",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1078347176",
    featured: true,
    order: 7,
  },
      {
    title: "Holy Vision | Awakened 2025",
    category: "fashion-film",
    year: 2025,
    client: "HOLY VISION",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1146633355",
    featured: true,
    order: 8,
  },
        {
    title: "Raf Simons - Experimental Video Ch.1",
    category: "fashion-film",
    year: 2025,
    client: "independent",
    role: "Director",
    description:
      "",
    thumbnail: "",
    vimeoUrl: "https://vimeo.com/1078332917",
    featured: true,
    order: 8,
  },
];
