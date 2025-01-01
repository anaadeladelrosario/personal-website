import { Button } from "./Button"
import spices from '../assets/spices.jpg'
import { Card } from "./Card"
import './Hero.css'
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="gingham-bg">
      <div className="hero-section">
        <img src={spices} alt="Hero Image" className="hero-image" />
          <h1 className="book-title">Your Recipe Book</h1>
      </div>
       <div style={{  maxWidth: "800px", width: '90%', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warning)', margin: 'var(--space-sm)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }} className="button-section">
          <p>Check the menu to find a list of recipes or press add button to add a new recipe.</p>
          <Link to="/add-recipe">
            <Button size="small" primary label="Add" />
          </Link>
        </div>
      <Card />
    </div>
  )
}

export default Hero