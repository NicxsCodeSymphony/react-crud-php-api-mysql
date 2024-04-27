import { useState } from "react";
import axios from "axios";

export default function CreateUser(){

    const [inputs, setInputs] = useState({})

    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost/react/save", inputs)
        console.log(inputs)
        alert("Users saved successfully");
        Redirect();
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
                <label>Username: </label>
                <input type="text" name="username" onChange={handleChange} /> <br />
                <label>Password: </label>
                <input type="text" name="password" onChange={handleChange} /> <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}