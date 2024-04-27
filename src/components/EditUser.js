import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditUser(){

    const [inputs, setInputs] = useState({})
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
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost/react/${id}/edit`, inputs)
        console.log(inputs)
        alert("User updated successfully");
        Redirect();
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
                <label>Username: </label>
                <input type="text" value={inputs.username || ''} name="username" onChange={handleChange} /> <br />
                <label>Password: </label>
                <input type="text" value={inputs.password || ''} name="password" onChange={handleChange} /> <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
