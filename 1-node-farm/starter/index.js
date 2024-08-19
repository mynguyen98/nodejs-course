const { log } = require('console')
const fs = require('fs')
const http = require('http')
const url = require('url')
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
const server = http.createServer((req, res) => {
  console.log(req.url)
  const pathName = req.url
  if (pathName === '/' || pathName === '/overview') {
    res.end('this is the overview')
  } else if (pathName === '/product') {
    res.end('this is the product')
  } else {
    console.log('this page can not be found')
    res.writeHead(404, {
      'Content-type': 'text/html',
    })
    res.end('<h1>this page can not be found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening on request')
})
