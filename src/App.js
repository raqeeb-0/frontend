import './globals.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Root } from './pages/Root';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
