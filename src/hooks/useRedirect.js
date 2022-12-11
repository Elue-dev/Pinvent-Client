import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/features/auth/auth_slice";
import { showAlert } from "../utils/alert/Alert";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = useSelector(selectIsLoggedIn);

      if (!isLoggedIn) {
        showAlert("error", "Session expired, please login to continue.");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path]);
};

export default useRedirectLoggedOutUser;
