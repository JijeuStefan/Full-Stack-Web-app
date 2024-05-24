import React, {useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

function UpdateProfessor() {
    const {id} = useParams();

    const [name, setName] = useState("");
    const [course, setCourse] = useState("");

    const navigate = useNavigate();

    const [backendErrors, setBckErrors] = useState([]);

    const token = localStorage.getItem('accessToken');
    
    useEffect(()=>{
        axios.get('https://my-backend-app-ggg2.onrender.com/professor/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
        .then(res => {
            setName(res.data[0].Name);
            setCourse(res.data[0].Cours);
        }).catch(err => console.log(err))
    },[id, token])

    function handleSubmit(event){
        event.preventDefault();
        axios.put('https://my-backend-app-ggg2.onrender.com/professor/update/' + id, {name, course},{
            headers: {
                Authorization: `Bearer ${token}`
            }})
        .then(res => {
            if (res.data.errors){
                setBckErrors(res.data.errors);
            }
            else {
                navigate('/home');       
            }}).catch(err => console.log(err));
    }

    function handleDismiss(index) {
        setBckErrors(backendErrors.filter((_, i) => i !== index));
    }

    return(
        <div className='d-flex vh-100 justify-content-center align-items-center' style={{ backgroundColor: '#0d1117', color: '#c9d1d9' }}>
            <div className='w-50 rounded p-3' style={{ backgroundColor: '#161b22' }}>
                <form onSubmit={handleSubmit}>
                    <h2>Update Professor</h2>
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
                        <label htmlFor="course">Course</label>
                        <input type="text" className="form-control" value={course}
                        onChange={e => setCourse(e.target.value)}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to={`/home`} className="btn btn-secondary">Back</Link>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfessor;