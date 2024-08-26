const EventEmitter = require('events')
// const myEmitter = new EventEmitter()
const http = require('http')
class Sales extends EventEmitter {
  constructor() {
    super()
  }
}
const myEmitter = new Sales()
// Listener for the 'orderPlaced' event
myEmitter.on('orderPlaced', (order) => {
  console.log(`Order received for: ${order}`)

  // Simulate preparing the order
  setTimeout(() => {
    console.log(`Order ready: ${order}`)
    myEmitter.emit('orderReady', order) // Emit an event when the order is ready
  }, 2000) // 2 seconds delay to simulate order preparation time
})

// Listener for the 'orderReady' event
myEmitter.on('orderReady', (order) => {
  console.log(`Serving order: ${order}`)
})

// Emit the 'orderPlaced' event
console.log('Customer places an order for a coffee.')
myEmitter.emit('orderPlaced', 'Coffee')
// ///////////////////////////////////////

const server = http.createServer()
server.on('request', (req, res) => {
  console.log('Request received!')
  console.log(req.url)
  res.end('Request received')
})

server.on('request', (req, res) => {
  console.log('Another request 😀')
})

server.on('close', () => {
  console.log('Server closed')
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...')
})
