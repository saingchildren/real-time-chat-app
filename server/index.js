const http = require("http");
const express = require("express");
const app = express();
const socketio = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
    },
});

const users = [];

app.use(cors());

io.on("connection", (socket) => {
    console.log(socket.id);
    const id = socket.id;
    socket.on("create", (username, callback) => {
        //檢查user是否存在
        //存在 ? 提醒已存在 : 加入users && 將users給前端
        const existingUser = users.find((user) => user.username === username);

        if (existingUser) return callback("This username is been taken!");
        const user = { id, username };
        users.push(user);
        console.log(`${id} create ${username}`);

        socket.on("load_users", () => {
            io.emit("send_users", users);
        });
    });

    socket.on("disconnect", () => {
        const id = socket.id;

        const index = users.findIndex((user) => user.id === id);

        if (index !== -1) {
            users.splice(index, 1)[0];
        }
        io.emit("send_users", users);
    });
});

server.listen(process.env.PORT || 3300, () => {
    console.log(`running in 3300`);
});
