import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [students, setStudent] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    
    useEffect(() => {
        axios.get('https://my-backend-app-ggg2.onrender.com/professors', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setProfessors(res.data))
        .catch(err => console.log(err));

        axios.get('https://my-backend-app-ggg2.onrender.com/students', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    }, [navigate, token]);

    const handleDelete = async (type, id) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete this ${type}?`);

        if (!isConfirmed) {
            return; 
        }   
        
        try {
            await axios.delete(`https://my-backend-app-ggg2.onrender.com/${type}/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
    }
    };

    const handleProfessorClick = (professor) => {
        setSelectedProfessor(professor);
    };

    function handleLogout(token){
        axios.post('http://localhost:8081/logout',{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(localStorage.clear(),
                navigate("/"))
        .catch(err => console.log(err));
    }

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#0d1117', color: '#c9d1d9' }}>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#161b22' }}>
                <div className="container-fluid">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/home" className="nav-link text-white">Home</Link>
                    </div>
                    <div className="navbar-nav ms-auto">
                        <div className="nav-item dropdown">
                            <button className="btn btn-outline-light dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><Link to="/profile" className="dropdown-item">View Profile</Link></li>
                                <li><button className="dropdown-item" onClick={() => handleLogout(token)}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="d-flex flex-grow-1">
                <div className="flex-grow-1 p-3">
                    <div className="w-100 rounded p-3" style={{backgroundColor: '#161b22', border: '1px solid #30363d' }}>
                        <h5 className="text-white">Professors</h5>
                        <Link to="/professor/add" className="btn btn-success mb-3">Add +</Link>
                        <table className="table table-bordered table-dark">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.map((professor, i) => (
                                    <tr key={i}>
                                        <td><button className="btn btn-link text-white" onClick={() => handleProfessorClick(professor)}>
                                            {professor.Name}
                                        </button></td>
                                        <td>{professor.Cours}</td>
                                        <td><div className="ml-auto">
                                            <Link to={`/student/add/${professor.ID}`} className="btn btn-success">Add Student</Link>
                                            <Link to={`/professor/update/${professor.ID}`} className="btn btn-primary mr-2">Update</Link>
                                            <button className="btn btn-danger" onClick={() => handleDelete("professor", professor.ID)}>Delete</button>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex-grow-1 p-3">
                    <div className="w-100 rounded p-3" style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}>
                        <h5 className="text-white">Students</h5>
                        <table className="table table-bordered table-dark">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Group</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {selectedProfessor && students.map((data, i) => {
                                if (selectedProfessor.ID === data.idProfessor) {
                                    return (
                                        <tr key={i}>
                                            <td>{data.Name}</td>
                                            <td>{data.Email}</td>
                                            <td>{data.Groups}</td>
                                            <td>
                                                <Link to={`/student/${data.ID}`} className="btn btn-secondary">View</Link>
                                                <Link to={`/student/update/${data.ID}`} className="btn btn-primary">Update</Link>
                                                <button className="btn btn-danger" onClick={() => handleDelete("student", data.ID)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                }
                            return null;
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;
