import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  REMOVE_ACTIVE_USER,
} from "../../redux/features/auth/auth_slice";
import { logoutUser } from "../../services/auth_service";

export default function Header() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    dispatch(REMOVE_ACTIVE_USER());
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between --my">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{user.username}</span>
        </h3>
        <button onClick={logout} className="btn btn--green logout-btn">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
}
