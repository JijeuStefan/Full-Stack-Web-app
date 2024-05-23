import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import AddStudent from './StudentComponents/AddStudent';
import UpdateStudent from './StudentComponents/UpdateStudent';
import ViewStudent from './StudentComponents/ViewStudent';
import Login from './RegisterComponents/Login';
import Signup from './RegisterComponents/Signup';
import AddProfessor from './ProfessorComponents/AddProfessor';
import UpdateProfessor from './ProfessorComponents/UpdateProfessor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login/>}></Route>
          <Route path='/signup' element = {<Signup/>}></Route>
          <Route path='/home' element= {<Home/>}></Route>
          <Route path='/student/add' element = {<AddStudent/>}></Route>
          <Route path='/student/update/:id' element = {<UpdateStudent/>}></Route>
          <Route path='/student/:id' element = {<ViewStudent/>}></Route>
          <Route path='/professor/add' element = {<AddProfessor/>}></Route>
          <Route path='/professor/update/:id' element = {<UpdateProfessor/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
