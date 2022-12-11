import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import axios from "axios";
import { useEffect } from "react";
import { logoutUser } from "./services/auth_service";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER } from "./redux/features/auth/auth_slice";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      await logoutUser();
      dispatch(REMOVE_ACTIVE_USER());
    }, 720000);
  });

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
