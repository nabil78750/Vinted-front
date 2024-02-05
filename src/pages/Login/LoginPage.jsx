import { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (email && password) {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email,
            password,
          }
        );
        {
          console.log("login>>", data);
        }
        setToken(data.token);

        // -- Condition pour naviguer vers la page d'où l'on vient : si on vien de publish on sera redirigé vers publish, autrement, ce sera vers la page d'accueil
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      } else {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    } catch (error) {
      console.log("loginpage - catch >>>", error.response);
      setErrorMessage("Mauvais email et/ou mot de passe");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <input
          className="input"
          type="email"
          name="email"
          id=""
          placeholder="Adresse email"
          value={email}
          onChange={(event) => {
            setErrorMessage("");
            setEmail(event.target.value);
          }}
        />
        <input
          className="input"
          type="password"
          name="password"
          id=""
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setErrorMessage("");
            setPassword(event.target.value);
          }}
        />
        <p className="error-message">{errorMessage}</p>
        <button className="button-sign">Se connecter</button>
        <Link className="compte" to="/signup">
          Pas encore de compte? Inscris-toi!
        </Link>
      </form>
      ;
    </main>
  );
};
export default LoginPage;
