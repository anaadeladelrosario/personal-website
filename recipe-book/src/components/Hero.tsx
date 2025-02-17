import { Card } from "./Card";
import "./Hero.css";
import "../styles/design-system.css";

function Hero({
  title,
  subtitle,
  image,
  children,
  cardTitle,
  cardChildren,
}: {
  title?: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
  cardTitle?: string;
  cardChildren?: React.ReactNode;
}) {
  return (
    <div className="gingham-bg">
      <div className="hero-section">
        {image && <img src={image} alt="Hero Image" className="hero-image" />}
        <div className="content">
          {children}
          <h1 className="book-title">{title}</h1>
          {subtitle && <p className="book-subtitle">{subtitle}</p>}
        </div>
      </div>
      {cardTitle || cardChildren ? (
        <Card title={cardTitle} children={cardChildren} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Hero;
