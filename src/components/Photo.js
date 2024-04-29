import axios from "axios";
import { useState } from "react";

export default function Photo(){

    const [inputs, setInputs] = useState({});

    const handleChange = (e) =>{
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleFileChange = (e) => {
        setInputs({...inputs, image: e.target.files[0]});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', inputs.name);
        formData.append('image', inputs.image);

        try {
            const response = await axios.post('http://localhost/react/photo.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <h1>Create data with photo</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} /> <br />
                <label>Image</label>
                <input type="file" name="image" onChange={handleFileChange} /> <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
