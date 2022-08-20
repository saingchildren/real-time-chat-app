import React, { useState, useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import Context from "../../context/Context";
import ShowUsers from "./ShowUsers";
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <ShowUsers />
                </Col>
            </Row>
        </Container>
    );
}
