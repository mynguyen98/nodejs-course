const express = require('express')

const app = express()
// Param middleware for 'id'
app.param('id', (req, res, next, id) => {
  console.log(`Request received with global id: ${id}`)
  next()
})
app.get('/', (req, res) => {
  res.send('hello world')
})

// ############## setting up basic routing ###############

// home route
app.get('/home', (req, res) => {
  res.send('this is home page')
})
// about route
app.get('/about', (req, res) => {
  res.send('this is about page')
})

// ########### using routes parameters ##############

app.get('/user/:id', (req, res) => {
  const userId = req.params.id
  res.send('User: ' + userId)
})

// ########### Handling Query String#########
app.get('/search', (req, res) => {
  const query = req.query.q
  res.send('Search query for: ' + query)
})
app.listen(3000, () => {
  console.log('server listening on port 3000')
})
