import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { REMOVE_ACTIVE_USER } from "../../redux/features/auth/auth_slice";
import { logoutUser, resetPassword } from "../../services/auth_service";
import "./auth.scss";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const reset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return setError("Please provide both password credentials");
    }

    if (password !== confirmPassword) {
      return setError("Both password credentials must match");
    }

    const userData = { password, confirmPassword };

    try {
      setLoading(true);
      setError(null);

      const response = await resetPassword(userData, token);

      if (response) {
        dispatch(REMOVE_ACTIVE_USER());
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // return showAlert("error", error);
      console.log(error);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Reset your password</h2>
        {error && <p className="popup auth_error">{error}</p>}
        {message && <p className="popup auth_message">{message}</p>}
        <form className="form form--login" onSubmit={reset}>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              New Password <sup className="error">*</sup>
            </label>
            <input
              type="password"
              className="form__input"
              value={password}
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength="6"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Confirm New Password <sup className="error">*</sup>
            </label>
            <input
              type="password"
              className="form__input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              minLength="6"
            />
          </div>
          <Link to="/login" className="forgot">
            <p>Login</p>
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
