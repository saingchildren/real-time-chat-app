import React from "react"
import UserName from "./UserName"
import { Form, Container, Row, Col, Button } from "react-bootstrap"
import Context from "../../context/Context"
import { useContextSelector } from "use-context-selector"
import { Link } from "react-router-dom"

export default function CreateForm () {

	const username = useContextSelector(Context, item => item.username)
	const socket = useContextSelector(Context, item => item.socket)

	const createUser = (e) => {

		if (!username) {
			e.preventDefault()
			alert("plz input username!")
		}

		if (username) {
			socket.emit("create", username, (error) => {
				if (error) {
					e.preventDefault()
					alert(error)
				}
			})
		}
	}

	return (
		<>
			<Container className="mt-5 bg-dark" style={{ width: "400px", height: "250px" }}>
				<Row className="text-center mb-2">
					<Form.Text className="mt-5"><h3>Create User</h3></Form.Text>
				</Row>
				<Row className="justify-content-center align-items-center">
					<Col xs="8" lg="10"><UserName /></Col>
				</Row>
				<Row className="mt-3 text-center">
					<Col>
						<Link onClick={e => createUser(e)} to={`/home?username=${username}`}>
							<Button variant="secondary" size="lg">Create</Button>
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	)
}
