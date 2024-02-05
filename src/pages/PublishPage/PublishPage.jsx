import "../PublishPage/PublishPage.css";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const PublishPage = ({ token }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSumit = async (event) => {
    event.preventDefault();

    //FormData pour envoyer les fichier vers le requet//
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", picture);

    // pour visualiser le contenu de notre formData : (boucle for of)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("result upload =>", response.data);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div className="publish-main">
      <div className="publish-container">
        <h3>Vends Ton article</h3>
        <form onSubmit={handleSumit}>
          <div className="input-section">
            <div className="div-file">
              <div className="file">
                <input
                  className="input-file"
                  type="file"
                  onChange={(event) => {
                    // pour visualiser l'image : on crée un state preview dans lequel on envoi l'info suivante :
                    const objectUrl = URL.createObjectURL(
                      event.target.files[0]
                    );
                    setPreview(objectUrl);
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
              {preview && (
                <div>
                  <img src={preview} alt="picture" />
                  <button onClick={() => setPreview(preview.filter())}>
                    x
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="input-section1">
            <div className="text-input">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Chemise Sezane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text-input" style={{ borderBottom: "none" }}>
              <label htmlFor="description">Décrit ton article</label>
              <input
                type="text"
                id="description"
                value={description}
                placeholder="ex: porté quelque fois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-section2">
            <div className="text-input">
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                id="brand"
                value={brand}
                placeholder="ex: Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                id="size"
                value={size}
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                id="color"
                value={color}
                placeholder="ex: Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="condition">Etat</label>
              <input
                type="text"
                name="ex: Neuf avec étiquette"
                id="condition"
                value={condition}
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="text-input" style={{ borderBottom: "none" }}>
              <label htmlFor="city">Lieu</label>
              <input
                type="text"
                id="city"
                value={city}
                placeholder="ex: Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-section3">
            <div className="text-input-price">
              <label htmlFor="price">Prix</label>

              <div className="checkbox-section">
                <input
                  type="text"
                  id="price"
                  value={price}
                  placeholder="0,00 €"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="checkbox">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="echange"
                    id="echange"
                  />
                  <label className="text-checkbox" htmlFor="echange">
                    Je suis interessé(e) par les échanges
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="button-section">
            <button className="button-publish">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    // les informations mise dans la props state peuvent récupérées grâce à useLocation dans le composant de destination (ici, LogIn)
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default PublishPage;
