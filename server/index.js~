const http = require("http")
const express = require("express")
const app = express()
const socketio = require("socket.io")
const cors = require("cors")
const server = http.createServer(app)
const io = socketio(server, {
	cors: {
		origin: "*"
	}
})

app.use(cors())

io.on("connection", (socket) => {
	console.log(socket.id)

	socket.on("create", (username) => {
		console.log(`username is ${username}`)
	})
})

server.listen(process.env.PORT || 3300, () => { console.log(`running in 3300`) })
