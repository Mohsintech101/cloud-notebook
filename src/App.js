import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path='/about' element={<About/>} />
      <Route exact path='/contactus' element={<Contact/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
