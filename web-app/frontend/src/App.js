import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Student from './Student';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Student/>}></Route>
          <Route path='/add' element = {<AddStudent/>}></Route>
          <Route path='/update/:id' element = {<UpdateStudent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
