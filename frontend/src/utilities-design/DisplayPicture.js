import { React, useState } from 'react'
import { Spinner } from 'reactstrap';

export default function DisplayPicture({ file }) {

    const [preview, setPreview] = useState(null)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result)
    }
    return (
        <div>
            {preview ? <img className='profilePic' src={preview} alt="profile img" /> :
                <Spinner color="dark">
                    Loading...
                </Spinner>}
            {/* {alert("hiiiiii", preview)} */}
        </div>
    )
}
