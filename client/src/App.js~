import React, { useState, useEffect } from "react"
import Router from "./router/Router"
import Context from "./context/Context"
import io from "socket.io-client"

export default function App () {
	

	document.body.style.backgroundColor = "#1E1E1E"
	

	const [ socket, setSocket ] = useState("")
	
	useEffect(() => {
		setSocket(io("http://localhost:3300"))
	}, [])

	const [ username, setUserName ] = useState("")
	const [ room, setRoom ] = useState("")

	return (
		<Context.Provider value={{
			username: username,
			setUserName: setUserName,
			room: room,
			setRoom: setRoom,
			socket: socket
		}}>
			<Router />
		</Context.Provider>
	)
}
