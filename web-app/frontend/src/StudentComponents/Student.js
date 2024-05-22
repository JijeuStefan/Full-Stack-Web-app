import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Student() {
    const [students, setStudent] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        // axios.get('http://localhost:8081/session')
        // .then(res => {
        //     if (!res.data.status)
        //         navigate("/");
        // })
        // .catch(err => console.log(err));


        axios.get('http://localhost:8081/students',{
            headers: {
                Authorization: `Bearer ${token}`
            }})
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    }, [navigate, token])

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this student?");
        if (!isConfirmed) {
            return; 
        }
        
        try {
            await axios.delete('http://localhost:8081/student/delete/' + id,{
                headers: {
                    Authorization: `Bearer ${token}`
                }});
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    


    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/student/add" className="btn btn-success">Add +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Group</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((data, i) => {
                                return <tr key={i}>
                                    <td>{data.Name}</td>
                                    <td>{data.Email}</td>
                                    <td>{data.Groups}</td>
                                    <td>
                                        <Link to={`/student/${data.ID}`} className="btn btn-secondary">View</Link>
                                        <Link to={`/student/update/${data.ID}`} className="btn btn-primary">Update</Link>
                                        <button className="btn btn-danger" onClick={e => handleDelete(data.ID)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default Student;