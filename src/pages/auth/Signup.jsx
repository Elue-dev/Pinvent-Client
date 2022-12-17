import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/features/auth/auth_slice";
import { registerUser, validateEmail } from "../../services/auth_service";
import { showAlert } from "../../utils/alert/Alert";
import "./auth.scss";

const initialState = {
  username: "",
  email: "",
  password: "",
  c_password: "",
};

export default function Signup() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const userRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, email, password, c_password } = formData;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const register = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !c_password) {
      return showAlert("error", "All fields are required");
    }

    if (!validateEmail(email)) {
      return showAlert("error", "Please enter a valid email address");
    }

    if (password.length < 6) {
      return showAlert("error", "Password must be 6 characters or more");
    }

    if (password !== c_password) {
      return showAlert("error", "Passwords do not match");
    }

    const userData = { username, email, password };

    try {
      setLoading(true);
      setError(null);

      const user = await registerUser(userData);
      setLoading(false);
      user ? navigate("/login") : null;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Register an account</h2>
        {error && <p className="popup auth_error">{error}</p>}
        {message && <p className="popup auth_message">{message}</p>}
        <form className="form form--login" onSubmit={register}>
          <div className="form-group ma-bt-md">
            <label htmlFor="username" className="form__label">
              Username <sup className="error">*</sup>
            </label>
            <input
              type="text"
              name="username"
              value={username}
              ref={userRef}
              onChange={handleInputChange}
              className="form__input"
              // required
              placeholder="e.g username"
            />
          </div>
          <div className="form-group ma-bt-md">
            <label htmlFor="email" className="form__label">
              Email Address <sup className="error">*</sup>
            </label>

            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="form__input"
              // required
              placeholder="you@example.com"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Password <sup className="error">*</sup>
            </label>
            <input
              className="form__input"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="••••••••"
              // required
              // minLength="6"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Confirm Password <sup className="error">*</sup>
            </label>
            <input
              className="form__input"
              type="password"
              name="c_password"
              value={c_password}
              onChange={handleInputChange}
              placeholder="••••••••"
              // required
              // minLength="6"
            />
          </div>
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
              Have an account?{" "}
              <Link to="/login">
                <span>Login</span>
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
