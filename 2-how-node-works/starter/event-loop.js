const fs = require('fs')
const start = Date.now()
const crypto = require('crypto')
setTimeout(() => console.log('timer 1 finished'), 0)
setImmediate(() => console.log('immediate 1 finished'))
process.env.UV_THREADPOOL_SIZE = 2
fs.readFile('text-file.txt', () => {
  console.log('i/o finished')
  console.log(
    '----------------------------------------------------------------'
  )
  setTimeout(() => console.log('timer 2 finished'), 0)
  setTimeout(() => console.log('timer 3 finished'), 3000)
  setImmediate(() => console.log('immediate 2 finished'))
  process.nextTick(() => console.log('process.nextTick'))
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
})

console.log('Hello from the top level code')
