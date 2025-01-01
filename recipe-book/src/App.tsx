
import { AppHeader } from './components/AppHeader'
import Hero from './components/Hero';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import AussiePie from './components/AussiePie';

function App() {

  return (
    <Router>
    <div className="landing-page">
      <AppHeader username="Ana" onLogout={() => {}} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/add-recipe" element={<Form />} />
        <Route path="/aussie-pie" element={<AussiePie />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
