const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors')

server.listen(process.env.PORT || 1337)

app.use(cors())
app.use(bodyParser())

app.get('/', (req, res) => {
  res.send('Hey')
})

io.on('connection', (socket) => {
  console.log('New connection to jam room.')
  socket.join('jam')

  socket.on('message', (data) => {
    console.log('Websocket server received message:')
    console.log(JSON.stringify(data, null, 3))
    socket.to('jam').emit('message', data)
  })
})
