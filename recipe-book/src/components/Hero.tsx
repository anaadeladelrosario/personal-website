import { Card } from "./Card";
import "./Hero.css";
import "../styles/design-system.css";
import { useState } from "react";

const Hero = ({
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
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="gingham-bg">
      <div className="hero-section">
        {image && (
          <img
            src={image}
            alt="Hero Image"
            className="hero-image"
            width="680"
            height="260"
          />
        )}
        <div className="content">
          {children}
          <h1 className="book-title">{title}</h1>
          {subtitle && (
            <p className="book-subtitle" onClick={toggleReadMore}>
              {showMore ? subtitle : `${subtitle?.slice(0, 50)}...`}
            </p>
          )}
        </div>
      </div>
      {cardTitle || cardChildren ? (
        <Card title={cardTitle} children={cardChildren} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Hero;
