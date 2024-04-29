import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditUser(){

    const [inputs, setInputs] = useState({
        name: '',
        username: '',
        password: '',
        image: null // Initialize image to null
    });
    
    const { id } = useParams(); 

    useEffect(() => {
        getUser();
    }, [])

    function getUser(){
        axios.get(`http://localhost/react/${id}`).then(function(res){
            console.log(res.data);
            setInputs(res.data[0]);
        })
    }
    

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setInputs({...inputs, image: file});
        } else {
            setInputs({...inputs, [e.target.name]: e.target.value});
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', inputs.name);
        formData.append('username', inputs.username);
        formData.append('password', inputs.password);
        if (inputs.image instanceof File) { // Check if inputs.image is a File object
            formData.append('image', inputs.image);
        }
    
        axios.put(`http://localhost/react/${id}/edit`, formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
            .then(() => {
                alert("User updated successfully");
                // Redirect();
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    }
    
    

    function Redirect(){
        window.location.href = "/";
    }


    return(
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" value={inputs.name || ''} name="name" onChange={handleChange} /> <br />
                <label>Image</label>
                <input type="file" name="image" onChange={handleChange} /> <br />
                <label>Username: </label>
                <input type="text" value={inputs.username || ''} name="username" onChange={handleChange} /> <br />
                <label>Password: </label>
                <input type="text" value={inputs.password || ''} name="password" onChange={handleChange} /> <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
