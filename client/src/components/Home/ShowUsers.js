import React, { useState, useEffect, useRef } from "react";
import Context from "../../context/Context";
import { useContextSelector } from "use-context-selector";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import ChatBox from "./ChatBox";

export default function ShowUsers() {
    const socket = useContextSelector(Context, (item) => item.socket);
    const [alluser, setAlluser] = useState([]);
    const [receiver, setReceiver] = useState(false);

    const get_data = () => {
        socket.emit("load_users");
        socket.on("send_users", (users) => {
            setAlluser(users);
        });
    };

    useEffect(() => {
        get_data();
        console.log(alluser);
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
            {alluser.map((user) =>
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
