import './App.css'
import { AppHeader } from './components/AppHeader'
import Hero from './components/Hero';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';

function App() {

  return (
    <Router>
    <div className="landing-page">
      <AppHeader username="Ana Banana" onLogout={() => {}} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
