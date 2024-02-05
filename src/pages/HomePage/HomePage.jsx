import Hero from "../../components/Hero";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log("response>>>", response.data);
        setData(response.data.offers);
      } catch (error) {
        console.log("catch app>>>", error.response);
      }

      setIsLoading(false);
    };

    fechData();
  }, []);

  return isLoading ? (
    <p>Changement...</p>
  ) : (
    <main>
      <Hero />
      <div className="contenair">
        <div className="offers-container">
          {data.map((offer) => {
            // console.log("offer", offer);

            return (
              <div key={offer._id}>
                <div>
                  {/* {console.log(offer._id)} */}
                  <div className="titre-logo">
                    {offer.owner.account.avatar && (
                      <img
                        src={offer.owner.account.avatar.secure_url}
                        alt="logo"
                      />
                    )}

                    <p>{offer.owner.account.username}</p>
                  </div>
                </div>
                <Link to={`/offer/${offer._id}`} className="offer-link">
                  {/* {console.log(offer.product_image.url)} */}
                  <div className="offer">
                    <img
                      src={offer.product_image.secure_url}
                      alt=" image-offer"
                    />
                    <div className="offers-description">
                      <p className="offer-price">
                        {offer.product_price
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                        €
                      </p>
                      <span>{offer.product_name}</span>
                      {/* {console.log(offer.product_details.MARQUE)} */}

                      <span>
                        {offer.product_details.map((detail, index) => {
                          // {
                          //   console.log(detail.MARQUE);
                          // }
                          const keyTab = Object.keys(detail);
                          // console.log(keyTab[0]);
                          return (
                            <div key={index}>
                              <p>{detail[["MARQUE"]]}</p>
                            </div>
                          );
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
