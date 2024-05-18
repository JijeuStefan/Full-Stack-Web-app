import React, {useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [backendErrors, setBckErrors] = useState([]);

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:8081/signup', {name, email, password})
        .then(res => {
            if (res.data.errors){
                setBckErrors(res.data.errors);
            }else{
                alert("Account created with success!");
                navigate('/students');
            }}).catch(err => console.log(err));
    }

    function handleDismiss(index) {
        setBckErrors(backendErrors.filter((_, i) => i !== index));
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <div className="d-flex justify-content-center align-items-center">
                    <h2>Sign up</h2>
                </div>
                {backendErrors.map((error, index) => {
                    return (
                        <div key={index} className="alert alert-warning alert-dismissible fade show" role="alert">
                        {error.msg}
                        <button type="button" className="btn-close" onClick={() => handleDismiss(index)} aria-label="Close"></button>
                        </div>)
                })}
                <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" className="form-control rounded-0" placeholder="Enter Name"
                        onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" className="form-control rounded-0" placeholder="Enter Email"
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" className="form-control rounded-0" placeholder="Enter Password"
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-success w-100"><strong>Sign up</strong></button>
                    <p></p>
                    <Link to="/" className="btn btn-default border w-100 bg-light">Log in</Link>
                </form>
            </div>
        </div>
    )
}

export default  Signup;