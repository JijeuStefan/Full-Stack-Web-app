import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate, useParams, Link } from "react-router-dom";

function ViewStudent() {
    const {id} = useParams();

    const [student, setStudent] = useState([])

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        // axios.get('http://localhost:8081/session')
        // .then(res => {
        //     if (!res.data.status)
        //         navigate("/");
        // })
        // .catch(err => console.log(err));


        axios.get('http://localhost:8081/student/' + id)
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    },[id, navigate])
  
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <table className="table">
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
                <Link to={`/students`} className="btn btn-secondary">Back</Link>
            </div>
        </div>
    )
}

export default ViewStudent;