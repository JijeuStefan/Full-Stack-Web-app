import React, {useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
    const {id} = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState(0);

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/student/update/' + id, {name, email, group})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
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
                        onChange={e => setGroup(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent;