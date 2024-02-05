import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.vinted.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <header className="contenair">
      <Link to="/">
        <img src={logo} alt="logo-vinted" />
      </Link>

      <form>
        <input
          className="search"
          type="search"
          name="search"
          placeholder="Recherche des articles"
        />
      </form>
      <nav>
        {token ? (
          <button
            className="button-deconnect"
            onClick={() => {
              Cookies.remove("userToken");
              setToken("");
              navigate("/login");
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div>
            <Link to="/signup" className="button-signup">
              S'inscrire
            </Link>
            <Link to="/login" className="button-signup">
              Se connecter
            </Link>
          </div>
        )}

        <div>
          <Link to="/publish" className="button-article">
            Vends tes article
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
