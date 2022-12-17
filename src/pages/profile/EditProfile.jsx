import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import Card from "../../components/card/Card";
import { getUser, getUserToken } from "../../redux/features/auth/auth_slice";
import { updateProfile } from "../../services/auth_service";
import "./profile.scss";

export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const user = useSelector(getUser);
  const token = useSelector(getUserToken);
  const navigate = useNavigate();

  const initialState = {
    name: user?.username,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrl;
      if (profileImage && profileImage.type.includes("image")) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dwdsjbetu");
        image.append("upload_preset", "oj28w9l5");

        // save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dwdsjbetu/image/upload",
          { method: "post", body: image }
        );
        const imageData = await response.json();
        imageUrl = imageData.url.toString();
      }

      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageUrl : profile.photo,
      };

      const res = await updateProfile(token, formData);
      res.status === "success" ? navigate("/profile") : null;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

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
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={profile?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              {/* <code className="--color-primary">Email cannot be changed.</code> */}
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <br />
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              {loading ? (
                <button className="btn btn--green" type="button" disabled>
                  <BeatLoader loading={loading} size={10} color={"#fff"} />
                </button>
              ) : (
                <button className="btn btn--green" type="submit">
                  Edit Profile
                </button>
              )}
            </div>
          </span>
        </form>
      </Card>
    </div>
  );
}
