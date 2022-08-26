const pup = require('puppeteer')

async function start(){
    
 async function loading(page, selector){
      const moreButton = await page.$(selector)
      if(moreButton){
         await moreButton.click()
         await page.waitFor(selector, { timeout: 5000 }).catch(()=>{console.log("tempo")})
         await loading(page, selector)
     }
    }
    async function get(page, selector){
        
       const coments = await page.$$eval(selector, links => links.map(link =>{return link.innerText}))
       
       return coments
}


const browser = await pup.launch({headless: false, timeout: 50000})
const page = await browser.newPage()
await page.goto('https://www.instagram.com/')
await page.waitForSelector('[name=username]')
await page.type('[name=username]', '')
await page.type('[name=password]', '')
await page.click('[type=submit]')
await page.waitForNavigation()
await page.goto('https://www.instagram.com/p/CChMVvQgYKK/')
//await page.waitForNavigation()
await page.waitForSelector('[aria-label="Carregar mais comentários"]')

await loading(page, '[aria-label="Carregar mais comentários"]')
const arrobas = await get(page, '._a9zs span a')
const counted = count(arrobas)
const sorted = sort(counted)
sorted.forEach(arroba =>{console.log(arroba)})
await browser.close()
}
start()
function count(arrobas) {
    const count = {}
    arrobas.forEach(arroba => {count[arroba] = (count[arroba] || 0) + 1});
    return count  
}
function sort(counted){
    const entrada = Object.entries(counted)
    
    const sorted = entrada.sort((a, b)=>{return b[1] - a[1]})
    return sorted
}