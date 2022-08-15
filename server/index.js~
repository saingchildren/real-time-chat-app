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

const users = []

app.use(cors())

io.on("connection", (socket) => {
	console.log(socket.id)
	const id = socket.id
	socket.on("create", (username, callback) => {
		//檢查user是否存在
		//存在 ? 提醒已存在 | 加入users
		const existingUser = users.find((user) => user.username === username)
		console.log(existingUser)

		if (existingUser) return callback("This username is been taken!")
		console.log(`${id} is create username ${username}`)
		const user = { id, username }

		users.push(user)

		console.log(`All user: ${users.map(user => `${user.id} ${user.username}`)}`)
	})
})


server.listen(process.env.PORT || 3300, () => { console.log(`running in 3300`) })
