import "./App.css";
/*import des composants React Router */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import HomePage from "./pages/HomePage/HomePage";
import OfferPage from "./pages/OfferPage/OfferPage";
import Header from "./components/Header";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import PublishPage from "./pages/PublishPage/PublishPage";
import PaymentPage from "./pages/Payment/PaymentPage";

function App() {
  // si le cookie existe, il sera la valeur initiale du state, sinon ce sera une string vide--//
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  return (
    <Router>
      <Header token={token} setToken={setToken} />

      <Routes>
        {/*Creation des pages*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/offer/:id" element={<OfferPage token={token} />} />
        <Route path="/signup" element={<SignupPage setToken={setToken} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/publish" element={<PublishPage token={token} />} />
        <Route path="/payment" element={<PaymentPage token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
