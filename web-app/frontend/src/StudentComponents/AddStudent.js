import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

function AddStudent() {
    const {id} = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState(0);

    const navigate = useNavigate();

    const [backendErrors, setBckErrors] = useState([]);

    const token = localStorage.getItem('accessToken');

    function handleSubmit(event){
        event.preventDefault();
        axios.post('https://my-backend-app-ggg2.onrender.com/student/add', {name, email, group, id}, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
        .then(res => {
            if (res.data.errors){
                setBckErrors(res.data.errors);
            }
            else {
                navigate('/home');       
            }})
        .catch(err => console.log(err));

        }
    
    function handleDismiss(index) {
        setBckErrors(backendErrors.filter((_, i) => i !== index));
    }

    return(
        <div className='d-flex vh-100 justify-content-center align-items-center' style={{ backgroundColor: '#0d1117', color: '#c9d1d9' }}>
            <div className='w-50 rounded p-3' style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                        {backendErrors.map((error, index) => {
                            return (
                                <div key={index} className="alert alert-warning alert-dismissible fade show" role="alert">
                                {error.msg}
                                <button type="button" className="btn-close" onClick={() => handleDismiss(index)} aria-label="Close"></button>
                              </div>)
                        })}
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className="form-control" 
                        onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control"
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Group</label>
                        <input type="number" placeholder="Enter Group" className="form-control"
                        onChange={e => setGroup(Number(e.target.value))}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to={`/home`} className="btn btn-secondary">Back</Link>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudent;