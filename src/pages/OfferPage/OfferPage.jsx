import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./OfferPage.css";
import { useNavigate } from "react-router-dom";

const OfferPage = ({ token }) => {
  const [offer, setOffer] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
      } catch (error) {
        console.log("OfferPage - catch", error.response);
      }

      setIsloading(false);
    };
    fetchData();
  }, []);

  const { id } = useParams();
  console.log("params id>>", id);
  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="offer-container">
      <div className="offer-page">
        <div>
          <img className="offer-img" src={offer.product_image.secure_url} />
        </div>

        <div className="offer-description">
          <div className="offer-details">
            <p>{offer.product_price}€</p>
            {offer.product_details.map((detail, index) => {
              const keyTab = Object.keys(detail);
              // console.log(keyTab[0]);
              // console.log(detail[keyTab[0]]);
              return (
                <div className="offer-details-span" key={index}>
                  <div style={{ width: 110 }}>
                    <span style={{ color: "#9999" }}>{keyTab[0]}</span>
                  </div>
                  <div>
                    <span style={{ color: "#666" }}>{detail[keyTab[0]]}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="offer-border"></div>
          <div className="offer-info">
            <p>{offer.product_name}</p>
            <p style={{ color: "#666" }}>{offer.product_description}</p>
            <div className="offer-psodo">
              {offer.owner.account.avatar && (
                <img
                  className="offer-logo"
                  src={offer.owner.account.avatar.secure_url}
                  alt="logo"
                />
              )}

              <p className="">{offer.owner.account.username}</p>
            </div>
          </div>
          <button
            className="offer-acheter"
            onClick={() => {
              token
                ? navigate("/payment", {
                    state: {
                      title: offer.owner.account.username,
                      price: offer.product_price,
                      id: id,
                      name: offer.product_name,
                    },
                  })
                : navigate("/login");
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </main>
  );
};

export default OfferPage;
