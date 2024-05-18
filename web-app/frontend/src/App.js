import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Student from './StudentComponents/Student';
import AddStudent from './StudentComponents/AddStudent';
import UpdateStudent from './StudentComponents/UpdateStudent';
import ViewStudent from './StudentComponents/ViewStudent';
import Login from './RegisterComponents/Login';
import Signup from './RegisterComponents/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login/>}></Route>
          <Route path='/signup' element = {<Signup/>}></Route>
          <Route path='/students' element = {<Student/>}></Route>
          <Route path='/student/add' element = {<AddStudent/>}></Route>
          <Route path='/student/update/:id' element = {<UpdateStudent/>}></Route>
          <Route path='/student/:id' element = {<ViewStudent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
