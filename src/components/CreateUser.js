import { useState } from "react";
import axios from "axios";

export default function CreateUser(){

    const [inputs, setInputs] = useState({})

    const handleChange = (e) => {
            setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const handleFileChange = (e) => {
        setInputs({...inputs, image: e.target.files[0]});
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', inputs.name);
        formData.append('username', inputs.username);
        formData.append('password', inputs.password);
        formData.append('image', inputs.image);
        
       try{
        const response = await axios.post("http://localhost/react/save", formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
        console.log(response.data)
        .catch(error => {
            console.error(error);
            alert("Failed to save user");
        });
       } catch (error){
            console.error(error)
       }
    }
    

    function Redirect(){
        window.location.href = "/";
    }

    return(
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="name" onChange={handleChange} /> <br />
                <label>Image</label>
                <input type="file" name="image" onChange={handleFileChange} /> <br />
                <label>Username: </label>
                <input type="text" name="username" onChange={handleChange} /> <br />
                <label>Password: </label>
                <input type="text" name="password" onChange={handleChange} /> <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}