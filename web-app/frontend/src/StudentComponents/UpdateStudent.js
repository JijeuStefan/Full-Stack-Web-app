import React, {useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

function UpdateStudent() {
    const {id} = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState("");

    const navigate = useNavigate();

    const [backendErrors, setBckErrors] = useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:8081/student/' + id)
        .then(res => {
            setName(res.data[0].Name);
            setEmail(res.data[0].Email);
            setGroup(res.data[0].Groups);
        }).catch(err => console.log(err))
    },[id])

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/student/update/' + id, {name, email, group})
        .then(res => {
            if (res.data.errors){
                setBckErrors(res.data.errors);
            }
            else {
                navigate('/students');       
            }}).catch(err => console.log(err));
    }

    function handleDismiss(index) {
        setBckErrors(backendErrors.filter((_, i) => i !== index));
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
                    {backendErrors.map((error, index) => {
                            return (
                                <div key={index} className="alert alert-warning alert-dismissible fade show" role="alert">
                                {error.msg}
                                <button type="button" className="btn-close" onClick={() => handleDismiss(index)} aria-label="Close"></button>
                              </div>)
                        })}
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" value={name}
                        onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="group">Group</label>
                        <input type="number" className="form-control" value={group}
                        onChange={e => setGroup(e.target.value)}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to={`/students`} className="btn btn-secondary">Back</Link>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent;