import { Button } from "./Button"
import spices from '../assets/spices.jpg'
function Hero() {
  return (
    <div className="gingham-bg">
      <div className="hero-section">
        <img src={spices} alt="Hero Image" className="hero-image" />
        <div className="description">
          <h1>Welcome to Recipe Book</h1>
          <p>Check the menu to find a list of recipes or press add button to add a new recipe.</p>
        </div>
        <Button primary label="Add Recipe" />
      </div>
    </div>
  )
}

export default Hero