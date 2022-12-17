import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/auth_service";
import { showAlert } from "../../utils/alert/Alert";
import { BeatLoader } from "react-spinners";

import "./auth.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const restore = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError("Please enter your email address");
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }

    try {
      setLoading(true);
      setError(null);
      const res = await forgotPassword({ email });
      setEmail("");
      setLoading(false);
      res ? navigate("/login") : null;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Let's get you back!</h2>
        {error && <p className="popup auth_error">{error}</p>}
        {message && <p className="popup auth_message">{message}</p>}
        <form className="form form--login" onSubmit={restore}>
          <div className="form-group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              className="form__input"
              placeholder="you@example.com"
            />
          </div>
          <Link to="/login" className="forgot">
            <p>Back to Login</p>
          </Link>
          <div className="form__group">
            {loading ? (
              <button className="btn btn--green" type="button" disabled>
                <BeatLoader loading={loading} size={10} color={"#fff"} />
              </button>
            ) : (
              <button className="btn btn--green" type="submit">
                PROCEED
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
