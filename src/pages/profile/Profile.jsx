import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Card from "../../components/card/Card";
import {
  getUserToken,
  SET_ACTIVE_USER,
} from "../../redux/features/auth/auth_slice";
import { getUserProfile } from "../../services/auth_service";
import "./profile.scss";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector(getUserToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    async function getUserData() {
      const response = await getUserProfile(token);
      setProfile(response.user);
      setLoading(false);
      dispatch(SET_ACTIVE_USER(response.user));
    }
    getUserData();
  }, [dispatch]);

  if (!profile) {
    return (
      <div className="loader">
        <ClipLoader
          color={"rgba(14, 16, 30, 0.937)"}
          loading={true}
          size={50}
        />
      </div>
    );
  }

  return (
    <div className="profile --my2">
      <>
        {!loading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name : </b> {profile?.username}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Phone : </b> {profile?.phone}
              </p>
              <p>
                <b>Bio : </b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="btn btn--green">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
}
