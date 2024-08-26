const { log } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)
// const textOut = `My xuoi said: ${textIn}. \nThat's very truth`
// console.log(textOut)

// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('file written')
//////////////////////////////////////////////////////////////
// non blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) console.log(err)
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2)
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3)
//       fs.writeFile('./txt/final.txt', `${data2}, ${data3}`, 'utf-8', (err) => {
//         console.log('your file has been written')
//       })
//     })
//   })
// })
// console.log('log first')
////////////////////SERVER/////////////////////////////////////////

// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME}/g, product.productName)
//   output = output.replace(/{%IMAGE}/g, product.image)
//   output = output.replace(/{%PRICE}/g, product.price)
//   output = output.replace(/{%FROM}/g, product.from)
//   output = output.replace(/{%NUTRIANS}/g, product.nutrients)
//   output = output.replace(/{%QUANTITY}/g, product.quantity)
//   output = output.replace(/{%DESCRIPTION}/g, product.description)
//   output = output.replace(/{%ID}/g, product.id)
//   if (product.organic)
//     output = output.replace(/{%NOT_ORGANIC}/g, product.organic)

//   return output
// }

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/teamplate-card.html`,
  'utf-8'
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  // OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj.map((item) => replaceTemplate(tempCard, item));
    const output = tempOverview.replace('{%PRODUCT_CARD}', cardsHtml);
    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    console.log('this page can not be found');
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>this page can not be found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening on request');
});
