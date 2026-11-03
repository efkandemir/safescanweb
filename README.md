# SafeScan web

## Bilgisayarında aç

Node.js 20 veya üzeri gerekir. Harici paket yok; `npm install` zorunlu değil.

```powershell
cd "C:\Users\EFKAN\Documents\Codex\2026-11-03\bu-p\outputs\SafeScan web"
npm start
```

Tarayıcı: http://127.0.0.1:8787/

Kontrol: `npm run check`. Durdurmak için terminalde Ctrl+C.

## Sayfalar

- `dist/index.html`: tanıtım, üç özellik sekmesi, adımlar, gizlilik, mağaza alanı ve SSS.
- `dist/support.html`: destek e-postası, kopyalama ve sorun giderme yanıtları.
- `dist/privacy.html`: uygulama + web sitesi gizlilik politikası; TR/EN.
- `dist/private.html`: yanlış yazılmış eski bağlantılar için privacy.html yönlendirmesi.
- `dist/404.html`: bulunamayan sayfa.
- `dist/assets/styles.css`: responsive tasarım, açık/koyu tema.
- `dist/assets/app.js`: dil, tema, sekmeler, mobil menü, e-posta kopyalama.
- `dist/assets/site-config.js`: gerçek mağaza bağlantıları.
- `dist/assets/fonts`: yerel Poppins fontları ve OFL lisansı.
- `.github/workflows/deploy-pages.yml`: GitHub Pages yayını; yalnızca dist klasörünü yükler.

`dist/` doğrudan yayınlanabilir. Derleme veya sunucu tarafı uygulama gerekmez. Destek e-postası: demirefkan33@gmail.com. Form veya belge yükleme alanı yok; kullanıcı belgeleri bu siteye gönderilmez.

## Mağaza bağlantılarını sonradan ekle

Uygulama henüz mağazada olmadığı için düğmeler Yakında olarak gösterilir. Gerçek yayın adresleri geldiğinde `dist/assets/site-config.js` içindeki iki boş değeri doldur:

```js
window.safeScanConfig = Object.freeze({
  appStoreUrl: "", // gerçek https://apps.apple.com/... adresi
  googlePlayUrl: "", // gerçek https://play.google.com/... adresi
});
```

Geçerli mağaza bağlantısı girildiğinde ilgili düğme etkinleşir. Uydurma mağaza adresi, kullanıcı sayısı, yorum veya yıldız puanı eklenmemiştir. Telefon ve belge görselleri temsilidir; gerçek uygulama ekran görüntüsü değildir.

## Yayına alma

Adım adım rehber: [docs/yayinaAlma.md](docs/yayinaAlma.md). Proje bu çalışma sırasında GitHub'a yüklenmedi veya internette yayınlanmadı.

Kontrol raporu: [docs/verification.md](docs/verification.md).
