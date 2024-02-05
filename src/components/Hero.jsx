import "./Hero.css";
import herophoto from "../assets/hero-photo.jpg";
import herotear from "../assets/hero-tear.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="contenair-hero">
      <div className="hero">
        <img src={herophoto} alt="photo-hero" />
        <img className="tear" src={herotear} alt="hero-tear" />

        <div>
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <Link to="/publish" className="button-hero">
            Commencer à vendre
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Hero;
