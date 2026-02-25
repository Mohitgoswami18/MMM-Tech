import Home from './components/Home'
import {Routes, Route} from 'react-router-dom'
import Modules from './components/Modules'
import NeedsVsWants from './components/NeedsVsWants';
import Login from './pages/Login';
import Signup from './pages/signup';
import Profile from './components/Porfile.jsx'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modules" element={<Modules></Modules>}></Route>
      <Route
        path="/modules/needs-vs-wants"
        element={<NeedsVsWants></NeedsVsWants>}
      ></Route>
      <Route path='/login' element={<Login></Login>}></Route>
     <Route path='/Signup' element={<Signup></Signup>}></Route>
     <Route path='/profile' element={<Profile></Profile>}></Route>
    </Routes>
  );
}

export default App
