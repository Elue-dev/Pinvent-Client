import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {
  SET_ACTIVE_USER,
  SET_USER_TOKEN,
} from "../../redux/features/auth/auth_slice";
import { loginUser } from "../../services/auth_service";
import { showAlert } from "../../utils/alert/Alert";
import "./auth.scss";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = formData;

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return showAlert("error", "Both email and password are required");
    }

    const userData = { email, password };

    try {
      setLoading(true);
      setError(null);

      const user = await loginUser(userData);
      dispatch(SET_ACTIVE_USER(user.data));
      dispatch(SET_USER_TOKEN(user.token));

      setLoading(false);
      user ? navigate("/dashboard") : null;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        {error && <p className="popup auth_error">{error}</p>}
        {message && <p className="popup  message">{message}</p>}
        <form className="form form--login" onSubmit={login}>
          <div className="form-group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Email Address <sup className="error">*</sup>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              ref={emailRef}
              onChange={handleInputChange}
              className="form__input"
              placeholder="you@example.com"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Password <sup className="error">*</sup>
            </label>
            <input
              type="password"
              name="password"
              className="form__input"
              value={password}
              onChange={handleInputChange}
              placeholder="••••••••"
              minLength="6"
            />
          </div>
          <Link to="/forgot-password" className="forgot">
            <p>Forgot Password?</p>
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
          <div className="action">
            <p>
              Need an account?{" "}
              <Link to="/register">
                <span>Register</span>
              </Link>
            </p>
            <p>
              <Link to="/">Home</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
