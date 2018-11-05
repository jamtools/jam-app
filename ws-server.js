const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const cors = require('cors')

server.listen(1337)

app.use(cors())
app.use(bodyParser())

io.on('connection', (socket) => {
  console.log('yup')
  socket.join('jam')
  // setTimeout(() => {
  //   socket.emit('message', {text: 'hey'})
  // }, 1000)
  socket.on('message', (data) => {
    console.log(JSON.stringify(data, null, 3))
    socket.to('jam').emit('message', data)
  })
})
