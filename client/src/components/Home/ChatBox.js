import React, { useEffect, useState } from "react";
import { Form, Alert, Button, Container, Row, Col } from "react-bootstrap";
import Context from "../../context/Context";
import { useContextSelector } from "use-context-selector";

export default function ChatBox({ receiver, setReceiver }) {
    const [message, setMessage] = useState("");
    const socket = useContextSelector(Context, (item) => item.socket);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit("send_msg", { receiver, message });
            setMessage("");
        }
    };

    return (
        <Container fluid="md">
            <Alert
                variant="light"
                style={{ height: "500px" }}
                onClose={() => setReceiver(false)}
                dismissible
            >
                <Alert.Heading className="text-center">
                    {receiver}
                </Alert.Heading>
                <hr />
                <Container style={{ overflowY: "scroll", height: "85%" }}>
                    test
                </Container>
            </Alert>
            <Form onSubmit={sendMessage}>
                <Form.Control
                    type="text"
                    placeholder={`text your message to ${receiver}`}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                ></Form.Control>
            </Form>
        </Container>
    );
}
