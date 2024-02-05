import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import "./CheckoutForm.css";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [validMessage, setValidMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  const { id } = location.state;
  const { name } = location.state;

  return (
    <div>
      <div className="payment-title">
        <h4>Résumé de la commande</h4>
      </div>
      <div className="payment-commande">
        <div>
          <h5>Commande</h5>
          <p>{price}€</p>
        </div>

        <div>
          <h5>Frais protection acheteurs</h5> <p>1,00 €</p>
        </div>

        <div>
          <h5>Frais de port</h5> <p>2,00 €</p>
        </div>
      </div>
      <div className="border-payment"></div>
      <div className="payment-total">
        <h6>Total</h6>
        <p>{price + 3}€</p>
      </div>
      <div className="text-payment">
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <span>{title}</span> . Vous allez payer <span> {price + 3}€</span>
          (frais de protection et frais de port inclus).
        </p>
      </div>
      <div className="border-cb"></div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const cardInfos = elements.getElement(CardElement);
          const stripeResponse = await stripe.createToken(cardInfos, {
            name: "L'id de l'acheteur",
          });

          const stripeToken = stripeResponse.token.id;

          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/payment",
            {
              // le token que vous avez reçu de l'API Stripe//
              token: stripeToken,
              title: name,
              // le prix indiquée dans l'annonce//
              amount: 10,
            }
          );
          console.log("reponse back>>>", response.data);
          // si la reponse du serveur est favorable, la transaction est faite//
          if (response.data.status == "succeeded") {
            setCompleted(true);
            setValidMessage("Merci pour votre achat");
          } else {
            setErrorMessage(response.data.status);
          }
        }}
      >
        {validMessage ? (
          <div className="payment-cb">
            <p>{validMessage}</p>
          </div>
        ) : (
          <div>
            <div className="payment-cb">
              <CardElement />
            </div>
            <div className="payment-div-button">
              <button className="payment-button">Pay</button>
            </div>
          </div>
        )}
      </form>
      <span>{errorMessage && <p>{errorMessage}</p>}</span>
    </div>
  );
};
export default CheckoutForm;
