import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { Row, Col, Button } from 'react-bootstrap'

export default function Footer(props) {
    const { profile } = props;

    return (
        <footer className="footer">
        <Row>
            <Col sm="6">
                <h4>Contact</h4>
                { profile ? <div>
                    <ul>
                        <li> {profile.firstName} {profile.middleName} {profile.lastName} </li>
                        <li> {profile.phone} </li>
                        <li> {profile.email} </li>
                        <Link to="/contact">Schedule</Link>
                    </ul>
                </div> :
                <div></div>}
            </Col>
            <Col sm="6">
            </Col>
        </Row>
        </footer>
    )
}