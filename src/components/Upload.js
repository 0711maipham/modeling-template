import { Card } from "react-bootstrap"
import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

function Upload(props) {
    const { profile } = props;
    const { updatePhotos } = useAuth();
    const [success, setSuccess] = useState(true);
    const [url, setUrl] = useState([]);
    const [photos, setPhotos] = useState(profile.photos);
    const fileRef = useRef();

    console.log(profile);

    useEffect(
        () => {
            setPhotos(profile.photos);
        }, []
    )

    function handleChange(ev) {
        setSuccess(false);

    }

    function handleUpload(ev) {
        let files = fileRef.current.files;
        const promises = [];
        for (var i = 0; i < files.length; i++) {
            promises.push(upload(files[i]));
        }

        Promise.all(promises)
            .then(() =>
                setSuccess(false)
            )
            .finally(alert("Upload Finished"));
    }

    // Perform the upload
    async function upload(file) {
        // Split the filename to get the name and type
        let fileParts = file.name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        axios.post("http://localhost:3001/sign_s3", {
            fileName: fileName,
            fileType: fileType
        })
            .then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var newUrl = returnData.url;
                let newUrls = [...url, newUrl];
                setUrl(newUrls)
                console.log("Received a signed request " + signedRequest);
                // Put the fileType in the headers for the upload
                var options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };
                axios.put(signedRequest, file, options)
                    .then(result => {
                        updatePhotos(newUrl)
                    })
                    .catch(error => {
                        alert("ERROR " + JSON.stringify(error));
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error));
            })
    }

    return (
        <Card>
            <center>
                <h1>UPLOAD A FILE</h1>
                {profile.photos ? profile.photos.map((url) => {
                    return (
                        <div style={{ padding: 50 }}>
                            <a href={url}>{url}</a>
                            <br />
                        </div>
                    )
                }) : null}
                <input multiple onChange={handleChange} ref={fileRef} type="file" />
                <br />
                <button onClick={handleUpload}>{"Upload"}</button>
            </center>
        </Card>
    );
}

export default Upload;
