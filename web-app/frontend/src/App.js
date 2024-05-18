import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Student from './Student';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';
import ViewStudent from './ViewStudent';
import Login from './Login';
import Signup from './Signup';

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
