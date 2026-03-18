# Basit Hesap Makinesi - PRD (Product Requirements Document)

## 1. Proje Genel Bakış

**Proje Adı:** Basit Hesap Makinesi  
**Proje Türü:** Web Uygulaması (Tek Sayfa)  
**Özet:** Dört temel matematiksel işlemi (toplama, çıkarma, çarpma, bölme) gerçekleştirebilen, koyu temalı, modern tasarımlı bir web hesap makinesi.  
**Hedef Kitle:** Günlük hesaplama ihtiyaçları olan tüm kullanıcılar.

---

## 2. Hedef Platform

- **Platform:** Web (Tarayıcı)
- **Teknoloji:** Vanilla HTML, CSS, JavaScript (Hiçbir framework kullanılmayacak)
- **Uyumluluk:** Modern tarayıcılar (Chrome, Firefox, Safari, Edge)
- **Responsive:** Evet - masaüstü ve mobil cihazlarda kullanılabilir

---

## 3. Fonksiyonel Gereksinimler

### 3.1 Temel Özellikler

| # | Özellik | Açıklama |
|---|---------|----------|
| 1 | Toplama (+) | İki veya daha fazla sayıyı toplama |
| 2 | Çıkarma (-) | Bir sayıdan diğerini çıkarma |
| 3 | Çarpma (×) | İki veya daha fazla sayıyı çarpma |
| 4 | Bölme (÷) | Bir sayıyı diğerine bölme |
| 5 | Temizle (C) | Ekranı ve hesaplamayı temizleme |
| 6 | Sil (⌫) | Son girilen karakteri silme |
| 7 | Eşittir (=) | Hesaplamayı çalıştırma |
| 8 | Ondalık (.) | Ondalıklı sayı girişi |

### 3.2 Hesaplama Davranışı

- **İşlem Sırası:** Standart matematiksel işlem önceliği (önce çarpma/bölme, sonra toplama/çıkarma)
- **Hata Yönetimi:** 
  - Sıfıra bölme durumunda "Hata" mesajı göster
  - Çok uzun sonuçları kırp
- **Devam Eden İşlem:** İlk hesaplamadan sonra sonuç üzerinden yeni işleme devam edilebilmeli

### 3.3 Kullanıcı Etkileşimleri

- **Fare/Tık:** Butonlara tıklama ile sayı ve işlem girişi
- **Klavye Desteği:** 
  - Rakam tuşları (0-9)
  - Operatörler (+, -, *, /)
  - Enter (=)
  - Escape (C - temizle)
  - Backspace (sil)

---

## 4. Teknik Gereksinimler

### 4.1 Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| HTML | HTML5 |
| CSS | CSS3 (Custom Properties, Flexbox, Grid) |
| JavaScript | ES6+ (Vanilla, hiçbir kütüphane yok) |

### 4.2 Dosya Yapısı

```
basit-hesap-makinesi/
├── index.html      # Ana HTML yapısı
├── style.css       # Tüm stiller
├── script.js      # Hesaplama mantığı
└── README.md      # Kullanım talimatları
```

### 4.3 Performans Gereksinimleri

- **Yükleme Süresi:** < 1 saniye
- **JavaScript Boyutu:** < 10KB (minified değil)
- **CSS Boyutu:** < 5KB

---

## 5. UI/UX Gereksinimleri

### 5.1 Tasarım Özellikleri

**Renk Paleti (Koyu Tema):**
| Element | Renk | Hex |
|---------|------|-----|
| Arka Plan (Ana) | Koyu Gri | #1a1a2e |
| Arka Plan (Butonlar) | Orta Gri | #16213e |
| Arka Plan (Buton Hover) | Açık Gri | #0f3460 |
| Buton Yazıları | Beyaz | #ffffff |
| Özel Buton (Eşittir) | Turuncu | #e94560 |
| Özel Buton Hover | Açık Turuncu | #ff6b6b |
| Ekran Arka Plan | Koyu Mavi | #0f0f23 |
| Ekran Yazı | Beyaz | #ffffff |
| Kenarlık | Koyu Mavi | #0f3460 |

**Tipografi:**
- **Font:** 'Inter', 'Segoe UI', system-ui, sans-serif
- **Ekran Yazı Boyutu:** 2.5rem (40px)
- **Buton Yazı Boyutu:** 1.5rem (24px)
- **Buton Yazı Ağırlığı:** 600

**Buton Düzeni (4x5 Grid):**
```
┌─────┬─────┬─────┬─────┐
│  C  │  ⌫  │  %  │  ÷  │
├─────┼─────┼─────┼─────┤
│  7  │  8  │  9  │  ×  │
├─────┼─────┼─────┼─────┤
│  4  │  5  │  6  │  -  │
├─────┼─────┼─────┼─────┤
│  1  │  2  │  3  │  +  │
├─────┼─────┼─────┼─────┤
│     0     │  .  │  =  │
└─────┴─────┴─────┘
```

**Buton Boyutları:**
- Standart buton: Kare, eşit boyutlarda
- Sıfır (0) butonu: 2 birim genişliğinde
- Tüm köşeler: 12px border-radius

### 5.2 Etkileşimler

| Etkileşim | Davranış |
|-----------|----------|
| Hover | Arka plan rengi değişir, hafif parlaklık artışı |
| Active/Click | Hafif içe doğru hareket (translateY: 2px) |
| Focus | Turuncu outline (erişilebilirlik) |

### 5.3 Responsive Tasarım

| Ekran Genişliği | Düzen |
|-----------------|-------|
| > 768px | Masaüstü boyutu, max-width: 400px |
| ≤ 768px | Tam genişlik, padding ayarlanır |
| ≤ 480px | Buton boyutları küçültülür |

---

## 6. Erişilebilirlik Gereksinimleri

- Tüm butonlarda `aria-label` tanımlı
- Renk kontrastı minimum WCAG AA standardı
- Klavye ile tam navigasyon desteği
- Focus durumları görünür

---

## 7. Ekranlar (Screens)

| # | Ekran Adı | Tür | Açıklama |
|---|-----------|-----|----------|
| 1 | Hesap Makinesi | main | Ana hesaplama arayüzü, ekran ve butonlar |
| 2 | Hakkında | info | Uygulama bilgileri, klavye kısayolları |

---

## 8. Varsayımlar

1. Kullanıcı modern bir tarayıcı kullanmaktadır
2. İnternet bağlantısı gerekmemektedir (tamamen offline çalışır)
3. Sonuçlar local olarak saklanmaz
4. Tarihsel hesaplama geçmişi tutulmaz

---

## 9. Başarı Kriterleri

- [ ] Dört temel işlem doğru çalışıyor
- [ ] Klavye ile kullanılabiliyor
- [ ] Koyu tema uygulanmış
- [ ] Mobil uyumlu
- [ ] Hata durumları düzgün yönetiliyor
- [ ] Erişilebilirlik standartları karşılanıyor
