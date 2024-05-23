import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate, useParams, Link } from "react-router-dom";

function ViewStudent() {
    const {id} = useParams();

    const [student, setStudent] = useState([])

    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');

    useEffect(()=>{
        axios.get('http://localhost:8081/student/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    },[id, navigate, token])
  
    return(
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#0d1117', color: '#c9d1d9' }}>
            <div className="w-50 rounded p-3" style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}>
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            student.map((data, i) => {
                                return <tr key={i}>
                                    <td>{data.Name}</td>
                                    <td>{data.Email}</td>
                                    <td>{data.Groups}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <Link to={`/home`} className="btn btn-secondary">Back</Link>
            </div>
        </div>
    )
}

export default ViewStudent;