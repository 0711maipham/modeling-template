import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap"
import { InlineWidget } from "react-calendly";

function Contact(props) {
    const { profile } = props;

    return (
        <Container>
            <Row>
                <Col sm="12">
                    <InlineWidget url="https://calendly.com/your_scheduling_page" />
                </Col>
            </Row>
        </Container>
    )
};

export default Contact;