import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Parser from 'html-react-parser'

function About(props) {
    const { profile } = props;

    return (
        <Container>
            <Row>
                <Col sm="12">
                {profile ? Parser(profile.bio || "") : ""}
                </Col>
            </Row>
        </Container>
    )
};

export default About;