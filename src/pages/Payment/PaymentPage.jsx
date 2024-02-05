import { Elements } from "@stripe/react-stripe-js";
import { Navigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

import "../Payment/PaymentPage.css";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  return token ? (
    <main className="payment-container">
      <div className="payment-wrapper">
        {/* {console.log("price>>>", offer.product_price)} */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};
export default Payment;
