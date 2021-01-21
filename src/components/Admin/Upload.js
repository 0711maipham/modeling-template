import { Card } from "react-bootstrap"
import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import PhotoPreview from './PhotoPreview'

function Upload(props) {
    const { profile, destination } = props;
    const { updatePhotos, updateGalleryDigitals, deleteFromGalleryDigitals } = useAuth();
    const [success, setSuccess] = useState(true);
    const [loading, setLoading] = useState(false)
    const [filesLength, setFilesLength] = useState(0); // # of files in an upload batch
    const [photos, setPhotos] = useState(profile.photos);
    const fileRef = useRef();

    // let currentFilesUploaded = 0;
    // let percent = 0;

    useEffect(
        () => {
            setPhotos(profile.photos);
        }, []
    )

    function handleChange(ev) {
        setFilesLength(fileRef.current.files.length);
        setSuccess(false);
        if (fileRef.current.files.length > 5) {  //Limit the upload size  to 5 files
            fileRef.current.value = [];
        }
    }

    function handleUpload(ev) {
        let files = fileRef.current.files;
        const promises = [];
        for (var i = 0; i < files.length; i++) {
            promises.push(upload(files[i], i));
        }

        try {
            setLoading(true)
            Promise.all(promises)
                .then(() =>
                    setSuccess(true)
                )
        }
        catch {

        }
    }

    // Perform the upload
    function upload(file, i) {
        // Split the filename to get the name and type
        let fileParts = file.name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        return axios.post("http://localhost:3001/sign_s3", {
            fileName: fileName,
            fileType: fileType
        })
            .then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var newUrl = returnData.url;
                console.log("Received a signed request " + signedRequest);
                // Put the fileType in the headers for the upload
                var options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };
                axios.put(signedRequest, file, options)
                    .then(result => {
                        updatePhotos(newUrl, destination).then(() => {
                            if ((i + 1) == filesLength) { //Tell the state upload is finished after last file is uploaded
                                setLoading(false);
                                fileRef.current.value = [];
                            }
                        }
                        )
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
                {/* {profile.photos ? profile.photos.map((url) => {
                    return (
                        <div style={{ padding: 10 }}>
                            <a href={url}>{url}</a>
                            <br />
                        </div>
                    )
                }) : null} */}
                <input multiple onChange={handleChange} ref={fileRef} type="file" accept=".jpg,.png,.jpeg" />
                <br />
                <button disabled={loading || filesLength == 0} onClick={handleUpload}>{!loading ? "Upload" : "Uploading..."}</button>
            </center>
            <PhotoPreview
                photos={destination == "gallery" ? profile.gallery : profile.digitals}
                update={updateGalleryDigitals}
                deletePhoto={deleteFromGalleryDigitals}
                destination={destination} />
        </Card>
    );
}

export default Upload;
