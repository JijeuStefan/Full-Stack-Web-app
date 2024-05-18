import React, {useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import StudentValidation from "../Validation/StudentValidation";

function UpdateStudent() {
    const {id} = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState("");

    const [errors, setErrors] = useState({});
    
    useEffect(()=>{
        axios.get('http://localhost:8081/student/' + id)
        .then(res => {
            setName(res.data[0].Name);
            setEmail(res.data[0].Email);
            setGroup(res.data[0].Groups);
        }).catch(err => console.log(err))
    },[id])

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        setErrors(StudentValidation(name,email,group));
        if (errors.name === "" && errors.email === "" && errors.group === ""){
            axios.put('http://localhost:8081/student/update/' + id, {name, email, group})
            .then(res => {
                navigate('/students');
            }).catch(err => console.log(err));
    }}

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" value={name}
                        onChange={e => setName(e.target.value)}/>
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" value={email}
                        onChange={e => setEmail(e.target.value)}/>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="group">Group</label>
                        <input type="number" className="form-control" value={group}
                        onChange={e => setGroup(e.target.value)}/>
                        {errors.group && <span className="text-danger">{errors.group}</span>}
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