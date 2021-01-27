import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Carousel } from 'react-responsive-carousel';

function Gallery(props) {
    const { profile } = props;
    const [photos, setPhotos] = useState();

    useEffect(() => {
        setPhotos(profile.gallery);
    }, [profile.gallery])

    return (
        <>
            <Row>
                <Col sm={{ span: 12, offset: 0 }}>
                    <Carousel 
                        >
                        {
                            photos ? photos.map((photo, index) => {
                                return (
                                    <div key={index} className="carousel-photo">
                                    <img src={photo.url} />
                                    </div>
                                )
                            }) :
                            <div>
                                <img />
                            </div>
                        }
                    </Carousel>
                </Col>
            </Row>
        </>
    )
};

export default Gallery;