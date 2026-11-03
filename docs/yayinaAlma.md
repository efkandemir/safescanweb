# SafeScan web — GitHub Pages ile yayın

Özel domain satın almanız gerekmez. GitHub Free planında public repo için GitHub Pages kullanılabilir. Bu bir 30/90 günlük deneme yayını değildir; hesabınız, reponuz ve Pages yapılandırmanız etkin kaldığı ve kullanım koşullarına uyduğunuz sürece mevcut hizmetten yararlanabilirsiniz. Gelecekte koşulların değişmeyeceğine ilişkin garanti verilmez.

## Önerilen yol: proje + hazır GitHub Actions

1. GitHub’da **New repository** açın. Repo adı: `safescan-web`. **Public** seçin. Mevcut yerel projeyi gönderecekseniz boş repo oluşturun (README/gitignore eklemeyin).
2. Git yüklüyse bu projenin terminalinde aşağıdaki komutları çalıştırın. KULLANICIADIN yer tutucusunu gerçek kullanıcı adınızla değiştirin. Bu komutlar yeni oluşturduğunuz boş repo içindir; mevcut dolu reponun üzerine force push yapmayın.

```powershell
cd "C:\Users\EFKAN\Documents\Codex\2026-11-03\bu-p\outputs\SafeScan web"
git init
git add .
git commit -m "Create SafeScan website"
git branch -M main
git remote add origin https://github.com/KULLANICIADIN/safescan-web.git
git push -u origin main
```

GitHub oturum açma/izin istemini kendi hesabınızla tamamlayın. Parola veya erişim anahtarlarını kaynak dosyasına eklemeyin. Alternatif: GitHub Desktop ile bu klasörde repository oluşturup **Publish repository** seçin; ücretsiz Pages için private seçeneğini kapatın.

3. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions** seçin. Hazır workflow projede mevcut; yeni şablon eklemeyin.
4. **Actions → Publish SafeScan website → Run workflow → main** seçerek ilk yayını başlatın. Sonraki main push'ları otomatik yayınlanır. İlk push'ta Pages henüz açık olmadığı için işlem başarısız olursa bu ayardan sonra yeniden çalıştırın.
5. İşlem yeşil olduğunda **Settings → Pages → Visit site** adresini açın. Workflow yalnızca `dist/` içeriğini yayınlar; proje dokümanları ve önizleme resimleri yayına dahil değildir.

## Daha kolay alternatif: tarayıcıdan yalnızca site dosyalarını yükle

Git kullanmak istemiyorsanız:

1. `safescan-web` adlı public repo oluşturun, README ekleyin.
2. **Add file → Upload files** seçin.
3. Bilgisayarınızda `SafeScan web/dist` klasörünü açın. **dist klasörünün kendisini değil, içindeki dosyaları ve assets klasörünü** reponun köküne yükleyin. Ana dizinde index.html, support.html, privacy.html ve assets/ görünmeli.
4. **Commit changes** yapın.
5. **Settings → Pages → Source: Deploy from a branch → main → /(root) → Save** seçin.
6. Yayının oluşmasını bekleyin ve verilen adresi açın. Bu yöntemde `.github/workflows` veya scripts/ yüklemeniz gerekmez; güncellemelerde yalnızca değişen dist içeriğini yeniden yükleyin.

Bu iki yöntemi karıştırmayın: tam projeyi yüklerseniz hazır GitHub Actions, yalnızca dist içeriğini köke yüklerseniz branch/root yayını kullanın.

## Oluşacak adresler

Aşağıdakiler örnek biçimdir, gerçek yayın adresleri değildir:

- Ana sayfa: `https://KULLANICIADIN.github.io/safescan-web/`
- Destek: `https://KULLANICIADIN.github.io/safescan-web/support.html`
- Gizlilik: `https://KULLANICIADIN.github.io/safescan-web/privacy.html`

App Store Connect'te **Support URL** alanına support.html adresini, **App Privacy → Privacy Policy URL** alanına privacy.html adresini yazın. Mobil uygulamadaki gizlilik ekranına da gerçek yayın URL'si eklenecek. Mağaza adı için Bundle ID ile web domaininin aynı olması gerekmez.

## Yayın sonrası kontrol

- Her üç adresi gizli pencerede açın; giriş istememeli ve 404 vermemeli.
- Telefonunuzdan menü, Türkçe/İngilizce ve açık/koyu görünümü deneyin.
- Destek sayfasında e-posta adresini ve mesaj bağlantısını kontrol edin.
- Gizlilik metninin uygulamanın o anki sürümüyle uyumunu kontrol edin. Reklam/analitik/hesap gibi özellikler sonradan eklenirse metni ve App Store veri beyanını güncelleyin.
- Tema ve dil tercihi dışında analitik veya belge yükleme eklenmemiştir. Barındırma sağlayıcısının teknik kayıtları gizlilik sayfasında ayrıca açıklanır.
- Uygulama yayınlanınca assets/site-config.js içine gerçek App Store/Google Play bağlantılarını ekleyip yeniden yayınlayın.
- Gerçek domain belirlendiğinde canonical, sitemap ve sosyal paylaşım meta görseli gibi URL'ye bağlı SEO ekleri düzenlenebilir; uydurma URL yazılmamıştır.
- Repository adını/kullanıcı adını değiştirir veya Pages'i kapatırsanız mağazadaki bağlantıları da güncellemeniz gerekir.

## Kaynaklar

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
