const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://flights-app.pages.dev/');

  // Test 1: "From" ve "To" input alanlarında aynı değerin girilemediğini test etmek
  await page.fill('#from', 'Istanbul');
  await page.fill('#to', 'Istanbul');
  const fromValue = await page.$eval('#from', el => el.value);
  const toValue = await page.$eval('#to', el => el.value);
  if (fromValue === toValue) {
    console.error('Hata: "From" ve "To" input alanlarında aynı değer girilebiliyor.');
  } else {
    console.log('Test başarılı şekilde geçti.');
  }

  // Test 2: Her şehir arasında uçuş olmadığı için bazı sorgulardan cevap dönmeyecektir.
  // "From: Istanbul", "To: Los Angeles" seçtiğinizde iki adet uçuş listelendiğini göreceksiniz.
  await page.fill('#from', 'Istanbul');
  await page.fill('#to', 'Los Angeles');
  await page.click('#search');
  const flightCount = await page.$eval('.flight-list', el => el.childElementCount);
  const foundCount = parseInt(await page.$eval('.found-count', el => el.textContent.split(' ')[0]));
  if (flightCount !== foundCount) {
    console.error(`Hata: "Found ${foundCount} items" yazısında ${foundCount} sayısı ile listelenen uçuş sayısı farklı.`);
  } else {
    console.log('Test başarılı şekilde geçti.');
  }

  await browser.close();
})();
