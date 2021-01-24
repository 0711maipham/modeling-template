import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Alert, Button, Form, Row, Col } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import Parser from 'html-react-parser'
import 'react-quill/dist/quill.snow.css'

function EditProfile(props) {
    const { profile } = props;
    const { updateContent } = useAuth();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState(profile.bio);
    const firstNameRef = useRef();
    const middleNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const heightRef = useRef();
    const waistRef = useRef();
    const hipRef = useRef();
    const shoeRef = useRef();
    const hairRef = useRef();
    const eyesRef = useRef();
    const bioRef = useRef();
    const bustRef = useRef();

    useEffect(() => {
        setBio(profile.bio);
    }, [profile.bio])

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike'],
          [],
          ['link'],
          ['clean']
        ],
      }

    function handleSubmit(e) {
        e.preventDefault()

        setLoading(true)
        setError("")

        let newContent = {
            firstName: firstNameRef.current.value,
            middleName: middleNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            height: heightRef.current.value,
            waist: waistRef.current.value,
            hip: hipRef.current.value,
            shoe: shoeRef.current.value,
            hair: hairRef.current.value,
            eyes: eyesRef.current.value,
            bio: bio,
            bust: bustRef.current.value,
        }

        try {
            updateContent(newContent)
            setMessage("Information updated successfully!")
        }
        catch {
            setError("Unable to update information.")
        }
        setLoading(false);

    }

    return (
        <>
            {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
            {message && <Alert variant="success" onClose={() => setMessage("")} dismissible>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col sm="4">
                        <Form.Group id="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" ref={firstNameRef} maxLength={50} defaultValue={profile.firstName} />
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        <Form.Group id="middleName">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" ref={middleNameRef} maxLength={50} defaultValue={profile.middleName} />
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        <Form.Group id="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" ref={lastNameRef} maxLength={50} defaultValue={profile.lastName} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <Form.Group id="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="text" ref={emailRef} maxLength={50} defaultValue={profile.email} />
                        </Form.Group>
                    </Col>
                    <Col sm="6">
                        <Form.Group id="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" ref={phoneRef} maxLength={50} defaultValue={profile.phone} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm="3">
                        <Form.Group id="height">
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="text" ref={heightRef} maxLength={10} defaultValue={profile.height} />
                        </Form.Group>
                    </Col>
                    <Col sm="3">
                        <Form.Group id="bust">
                            <Form.Label>Bust</Form.Label>
                            <Form.Control type="text" ref={bustRef} maxLength={10} defaultValue={profile.bust} />
                        </Form.Group>
                    </Col>
                    <Col sm="3">
                        <Form.Group id="waist">
                            <Form.Label>Waist</Form.Label>
                            <Form.Control type="text" ref={waistRef} maxLength={10} defaultValue={profile.waist} />
                        </Form.Group>

                    </Col>
                    <Col sm="3">
                        <Form.Group id="hip">
                            <Form.Label>Hip</Form.Label>
                            <Form.Control type="text" ref={hipRef} maxLength={10} defaultValue={profile.hip} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                        <Form.Group id="shoe">
                            <Form.Label>Shoe</Form.Label>
                            <Form.Control type="text" ref={shoeRef} maxLength={10} defaultValue={profile.shoe} />
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        <Form.Group id="hair">
                            <Form.Label>Hair</Form.Label>
                            <Form.Control type="text" ref={hairRef} maxLength={10} defaultValue={profile.hair} />
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        <Form.Group id="eye">
                            <Form.Label>Eyes</Form.Label>
                            <Form.Control type="text" ref={eyesRef} maxLength={10} defaultValue={profile.eyes} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Form.Group id="bio">
                            <Form.Label>Bio</Form.Label>
                            {/* <Form.Control as="textarea" ref={bioRef} maxLength={10} defaultValue={profile.bio} /> */}
                            <ReactQuill theme="snow" value={bio || profile.bio} onChange={setBio} modules={modules}/>
                        </Form.Group>
                        {Parser(profile.bio || "")}
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Button disabled={loading} className="w-100" type="submit">
                            Update
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
};

export default EditProfile;