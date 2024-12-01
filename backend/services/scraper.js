const puppeteer = require('puppeteer');
const stores = require('./URLs/url');
async function scrapeWebsite(company, searchTerm) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const url = `${stores[company].baseUrl}${searchTerm}`;
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for product elements to load
    const nameSelector = stores[company].selectors.name;
    const priceSelector = stores[company].selectors.price;

    await page.waitForSelector(nameSelector, { timeout: 10000 });

    // Pass selectors into evaluate function
    const content = await page.evaluate((nameSelector, priceSelector) => {
      const products = [];
      const productElements = document.querySelectorAll(nameSelector);
      const priceElements = document.querySelectorAll(priceSelector);

      productElements.forEach((element, index) => {
        products.push({
          name: element.innerText || '',
          price: priceElements[index] ? priceElements[index].innerText : '',
          store: window.location.hostname
        });
      });

      return products;
    }, nameSelector, priceSelector);

    await browser.close();
    return content;

  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  }
}

async function main() {
  try {
    const data = await scrapeWebsite('nofrills', 'milk');
    const data1 = await scrapeWebsite('walmart', 'milk');
    console.log('Scraped Products:', data);
    console.log('Scraped Products:', data1);
    return data;
  } catch (error) {
    console.error('Scraping failed:', error);
  }
}

// For testing directly
if (require.main === module) {
  main();
}

module.exports = { scrapeWebsite };