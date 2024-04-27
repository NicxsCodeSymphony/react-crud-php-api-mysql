import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ListUser(){

    const [users, setUsers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, [])

    function getUser(){
        axios.get('http://localhost/react/').then(function(res){
            console.log(res.data);
            setUsers(res.data);
        })
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost/react/${id}`).then(function(res){
            console.log(res.data);
            getUser();
        })
    }
    

    return(
        <div>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Updated AT</th>
                        <th>Created AT</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.created_at}</td>
                            <td>{user.updateTime}</td>
                            <td>
                            <Link to={`/react/${user.id}/edit`}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
