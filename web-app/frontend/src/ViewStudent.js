import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useParams, Link } from "react-router-dom";

function ViewStudent() {
    const {id} = useParams();

    const [student, setStudent] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/student/' + id)
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    },[id])
  
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
                <Link to={`/`} className="btn btn-secondary">Back</Link>
            </div>
        </div>
    )
}

export default ViewStudent;