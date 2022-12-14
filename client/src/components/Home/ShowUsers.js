import React, { useState, useEffect, useRef } from "react";
import Context from "../../context/Context";
import { useContextSelector } from "use-context-selector";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import ChatBox from "./ChatBox";

export default function ShowUsers() {
	const socket = useContextSelector(Context, (item) => item.socket);
	const username = useContextSelector(Context, (item) => item.username);
	const [allUser, setAllUser] = useState([]);
	const [allMsg, setAllMsg] = useState({});
	const [receiver, setReceiver] = useState(false);

	const sortName = (username1, username2) => {
		return [username1, username2].sort().join("-");
	};

	const getMsg = () => {
		socket.on("get_msg", (MsgData) => {
			let key;
			if (MsgData.sender === username) {
				key = sortName(username, MsgData.receiver);
			} else {
				key = sortName(username, MsgData.sender);
			}
			console.log(`key is ${key}`);
			setAllMsg((prev) => {
				const temp = { ...prev };
				console.log(temp);
				if (key in temp) {
					console.log("in");
					temp[key] = [...temp[key], MsgData];
				} else {
					console.log("not in");
					temp[key] = [MsgData];
				}
				return { ...temp };
			});
		});
	};

	useEffect(() => {
		if (receiver) {
			const key = sortName(username, receiver);
			const temp = { ...allMsg };
			if (key in temp) {
				temp[key] = temp[key].map((item) => ({ ...item, view: true }));
			}

			setAllMsg({ ...temp });
		}
	}, [receiver]);

	const getData = () => {
		socket.emit("load_users");
		socket.on("send_users", (users) => {
			setAllUser(users);
		});
	};

	useEffect(() => {
		getMsg();
		getData();
	}, []);

	return !receiver ? (
		<Container
			className="mt-3 text-center justify-content-start"
			style={{ width: "300px" }}
		>
			<Row>
				<Col style={{ fontSize: "2.3rem", color: "green" }}>
					Online User
				</Col>
			</Row>
			{allUser.map((user) =>
				user.id !== socket.id ? (
					<Row className="mt-1">
						<Col
							className="d-grid"
							style={{
								background: "#1E1E1E",
								color: "white",
							}}
						>
							<Button
								size="lg"
								onClick={() => {
									setReceiver(user.username);
								}}
							>
								{user.username}
							</Button>
						</Col>
					</Row>
				) : null
			)}
		</Container>
	) : (
		<ChatBox receiver={receiver} setReceiver={setReceiver} />
	);
}
