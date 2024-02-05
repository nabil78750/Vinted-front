import "./SignupPage.css";
import { useState } from "react";
//--import axios--//
import axios from "axios";
//--import du cookie--//
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupPage = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log({
    //   username: username,
    //   email: email,
    //   password: password,
    //   newsletter: newsletter,
    // });

    // console.log({
    //   username,
    //   email,
    //   password,
    //   newsletter,
    // });

    try {
      if (username && email && password) {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            username,
            email,
            password,
            newsletter,
          }
        );

        console.log("signupPage - response >>", data);

        //--  Création du cookie
        Cookies.set("userToken", data.token, { secure: true });

        // -- Envoie du token au state
        // {
        //   console.log(data.token);
        // }
        setToken(data.token);

        // -- Naviguer vers la page d'accueil
        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("Signpage - catch >>>", error.response);
      setErrorEmail("Cet email a déjà un compte chez nous !");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          className="input"
          type="text"
          name="username"
          id="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            // Pour supprimer le message d'erreur quand on modifie le champs//
            setErrorMessage("");
            setUsername(event.target.value);
          }}
        />
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            // Pour supprimer le message d'erreur quand on modifie le champs//
            setErrorMessage("");
            setEmail(event.target.value);
          }}
        />
        <p style={{ color: "red" }}>{errorEmail}</p>

        <input
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            // Pour supprimer le message d'erreur quand on modifie le champs//
            setErrorMessage("");
            setPassword(event.target.value);
          }}
        />
        <div className="newsletter">
          <input
            className="newsletter-input"
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={newsletter}
            onChange={() => {
              // Pour supprimer le message d'erreur quand on modifie le champs//
              setErrorMessage("");
              setNewsletter(!newsletter);
            }}
          />
          <label htmlFor="newsletter">S'inscrire à la newsletter</label>
        </div>
        <p className="condition">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button className="button-sign">S'inscrire</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Link className="compte" to="/login">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </main>
  );
};

export default SignupPage;
