import React, {useState } from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";

function AddStudent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState(0);

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/student/add', {name, email, group})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
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
                    <div className="d-flex justify-content-between">
                        <Link to={`/`} className="btn btn-secondary">Back</Link>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudent;