import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap"
import Upload from './Upload'
import EditProfile from './EditProfile'

function Admin(props) {
    const { profile } = props;

    return (
        <Container>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header>Edit Profile</Card.Header>
                        <Card.Body>
                            <EditProfile
                                profile={profile}
                            />
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Edit Portfolio</Card.Header>
                        <Card.Body>
                            <Upload
                                profile={profile}
                                destination={"gallery"}
                            />
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Edit Digitals</Card.Header>
                        <Card.Body>
                            <Upload
                                profile={profile}
                                destination={"digitals"}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

export default Admin;