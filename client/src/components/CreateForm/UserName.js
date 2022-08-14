import React, { useState } from "react"
import { Form, InputGroup, FloatingLabel } from "react-bootstrap"
import { useContextSelector } from "use-context-selector"
import Context from "../../context/Context"
import io from "socket.io-client"

export default function UserName () {
	
	const username = useContextSelector(Context, item => item.username)
	const setUserName = useContextSelector(Context, item => item.setUserName)

	return (
		<FloatingLabel label="UserName">
			<Form.Control
				type="text"
				value={username}
				onChange={(e) => { setUserName(e.target.value) }}
			/>
		</FloatingLabel>
	)
}
