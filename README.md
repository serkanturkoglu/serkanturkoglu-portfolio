# Portfolyo Sitesi — İçerik Yönetim Rehberi

Bu site, **tek bir dosyayı** düzenleyerek yönetilecek şekilde kuruldu:

```
src/data/siteContent.ts
```

Tasarımı, animasyonları veya kod dosyalarını **hiç açmadan**, sadece bu dosyadaki metinleri ve `projects` dizisini düzenleyerek siteyi güncelleyebilirsiniz.

> Görsel dosyalarını koyacağınız klasörler: `public/images/` (profil fotoğrafı) ve `public/images/projects/` (proje küçük resimleri).

---

## 1. About yazısını nasıl değiştiririm?

`src/data/siteContent.ts` dosyasını açın, en üstteki `about` objesini bulun:

```ts
export const about: AboutContent = {
  name: "Kai Ashford",
  shortName: "K. Ashford",
  role: "Director",
  shortBio: "...",      // Ana sayfa ve About başlığındaki kısa tanıtım
  longBio: [             // About sayfasındaki paragraflar
    "İlk paragraf...",
    "İkinci paragraf...",
  ],
  location: "Los Angeles / London",
  availability: "Currently booking productions for late 2026.",
  profileImage: "/images/profile.jpg",
  email: "hello@kaiashford.com",
  socials: [ ... ],
};
```

- **`shortBio`**: Tek cümlelik tanıtım. Ana sayfada büyük başlığın altında ve About sayfasının başlığında görünür.
- **`longBio`**: About sayfasındaki uzun biyografi. Her dizi elemanı ayrı bir paragraf olur. Yeni paragraf eklemek için diziye virgülle yeni bir satır ekleyin:
  ```ts
  longBio: [
    "Birinci paragraf.",
    "İkinci paragraf.",
    "Üçüncü paragraf burada.", // yeni eklenen
  ],
  ```

---

## 2. Profil fotoğrafını nereye koyarım?

1. Fotoğrafınızı `public/images/` klasörüne koyun (örnek: `public/images/profil.jpg`).
2. `siteContent.ts` içindeki `profileImage` alanını güncelleyin:
   ```ts
   profileImage: "/images/profil.jpg",
   ```

Dosya yolu bulunamazsa site otomatik olarak mevcut tasarım yer tutucusunu gösterir — hiçbir hata oluşmaz. Fotoğrafı eklediğiniz an otomatik olarak görünür.

---

## 3. Yeni proje nasıl eklerim?

`siteContent.ts` dosyasının altındaki `projects` dizisine yeni bir obje ekleyin:

```ts
export const projects: Project[] = [
  // ...mevcut projeler...
  {
    title: "Yeni Proje Adı",
    category: "music-video", // "music-video" | "commercial" | "fashion-film"
    year: 2026,
    description: "Projenin kısa açıklaması.",
    thumbnail: "/images/projects/yeni-proje.jpg",
    vimeoUrl: "https://vimeo.com/123456789",
    featured: false,
    order: 4,
  },
];
```

Başka **hiçbir dosyayı** değiştirmeniz gerekmez — proje sayfası, Work listesi ve kategori sekmeleri otomatik olarak güncellenir.

> ⚠️ Proje başlıkları (`title`) birbirinden farklı olmalı — sayfa adresi (URL) otomatik olarak başlıktan üretilir (örn. "No Vacancy" → `/work/no-vacancy`).

---

## 4. Vimeo linkini nereye yapıştırırım?

Projenin `vimeoUrl` alanına, Vimeo'dan kopyaladığınız linki **olduğu gibi** yapıştırın:

```ts
vimeoUrl: "https://vimeo.com/123456789",
```

Gizli (unlisted) bir video paylaşıyorsanız Vimeo'nun verdiği linkin sonundaki kod kısmını da olduğu gibi bırakın:

```ts
vimeoUrl: "https://vimeo.com/123456789/abcdef1234",
```

Site bu linki otomatik olarak oynatıcıya çevirir — ekstra bir embed kodu oluşturmanıza gerek yoktur. Link boşsa proje sayfasında "Video coming soon" yazısı görünür.

---

## 5. Thumbnail (küçük resim) görselini nereye eklerim?

1. Görseli `public/images/projects/` klasörüne koyun.
2. Projenin `thumbnail` alanına yolunu yazın:
   ```ts
   thumbnail: "/images/projects/no-vacancy.jpg",
   ```

`thumbnail` boş bırakılırsa şu sıra izlenir:
1. `thumbnail` doluysa ve dosya gerçekten varsa → o görsel kullanılır.
2. Yoksa ve `vimeoUrl` varsa → Vimeo'nun kendi küçük resmi kullanılır.
3. Hiçbiri yoksa → mevcut tasarımdaki gradyan görünüm kullanılır.

Yani hiçbir zaman bozuk/kırık bir görsel görünmez.

---

## 6. Projelerin sırasını nasıl değiştiririm?

Her projenin bir `order` (sayı) alanı vardır. **Küçük sayı önce gösterilir.**

```ts
{ title: "Proje A", order: 1, ... }
{ title: "Proje B", order: 2, ... }
{ title: "Proje C", order: 3, ... }
```

- Work sayfasında bir kategori sekmesine tıklandığında (örn. "Music Videos") o kategori içindeki projeler `order`'a göre sıralanır.
- "All" sekmesinde önce kategoriye göre gruplanır, sonra her grup kendi içinde `order`'a göre sıralanır.
- Ana sayfadaki öne çıkan (featured) projeler de kendi aralarında `order`'a göre sıralanır.

Sadece bu sayıları değiştirerek sırayı kontrol edebilirsiniz — başka hiçbir kodu değiştirmeniz gerekmez.

---

## 7. Featured nasıl açılır veya kapatılır?

Bir projeyi ana sayfadaki "Selected Work" vitrininde göstermek için:

```ts
featured: true,
```

Göstermek istemiyorsanız:

```ts
featured: false,
```

veya bu satırı tamamen silebilirsiniz (varsayılan olarak gösterilmez).

> Öneri: Ana sayfayı sade tutmak için her kategoriden en fazla 1 proje öne çıkarın (toplam 3 civarı).

---

## 8. Sosyal medya linklerini nereden değiştiririm?

`siteContent.ts` içindeki `about.socials` dizisini düzenleyin:

```ts
socials: [
  { label: "Instagram", href: "https://instagram.com/kullaniciadi" },
  { label: "Vimeo", href: "https://vimeo.com/kullaniciadi" },
],
```

Yeni bir sosyal medya linki eklemek için diziye yeni bir satır ekleyin:

```ts
socials: [
  { label: "Instagram", href: "https://instagram.com/kullaniciadi" },
  { label: "Vimeo", href: "https://vimeo.com/kullaniciadi" },
  { label: "YouTube", href: "https://youtube.com/@kullaniciadi" }, // yeni
],
```

Bu liste Footer'da ve Contact sayfasında otomatik olarak görünür.

---

## Diğer ayarlanabilir alanlar

| Alan | Nerede görünür |
|---|---|
| `about.email` | Header'daki "Get in Touch" linki, Footer, Contact sayfası |
| `about.location` | Ana sayfa, About sayfası, Contact sayfası, Footer |
| `about.availability` | About sayfası, Contact sayfası |
| `contact.heading` / `contact.intro` | Contact sayfasının başlığı ve açıklama metni |
| `footer.headline` | Footer'daki büyük başlık ("Let's tell the next one.") |
| `project.client` / `project.role` | Proje sayfasındaki bilgi panelinde (opsiyonel) |

---

## Siteyi yerelde çalıştırma

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın. `siteContent.ts` dosyasında yaptığınız her değişiklik tarayıcıda otomatik olarak yenilenir.

Yayına almadan önce kontrol için:

```bash
npm run build
```

Bu komut hata vermeden tamamlanıyorsa site yayına hazırdır.
