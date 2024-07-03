import './globals.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Root } from './pages/Root';
import { Signup } from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
