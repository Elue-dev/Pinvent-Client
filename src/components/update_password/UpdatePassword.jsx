import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserToken,
  REMOVE_ACTIVE_USER,
} from "../../redux/features/auth/auth_slice";
import { showAlert } from "../../utils/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import "./updatePassword.scss";
import { BeatLoader } from "react-spinners";
import Card from "../card/Card";
import { logoutUser, updatePassword } from "../../services/auth_service";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = credentials;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(getUserToken);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword || !confirmPassword) {
      return showAlert("error", "Please specify all password credentials");
    }

    if (newPassword !== confirmPassword) {
      return showAlert("error", "New password credentials do not match");
    }

    try {
      setLoading(true);

      const passwordCredentials = {
        oldPassword,
        newPassword,
      };

      const { data } = await updatePassword(token, passwordCredentials);
      console.log(data);
      setLoading(false);
      showAlert("success", "Password changed. Please login again");
      await logoutUser();
      dispatch(REMOVE_ACTIVE_USER());
      navigate("/login");

      navigate("/profile");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="change-password">
      <Card cardClass={"password-card"} className="pass_card">
        <div className="wrap">
          <h4>Change Password</h4>
          <form onSubmit={changePassword} className="--form-control">
            <input
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            {loading ? (
              <button className="btn btn--green" type="button" disabled>
                <BeatLoader loading={loading} size={10} color={"#fff"} />
              </button>
            ) : (
              <button className="btn btn--green" type="submit">
                Change Password
              </button>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}
