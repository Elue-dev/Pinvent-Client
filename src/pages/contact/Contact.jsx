import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import Card from "../../components/card/Card";
import { GoLocation } from "react-icons/go";
import { server_url } from "../../services/auth_service";
import "./contact.scss";
import { showAlert } from "../../utils/alert/Alert";
import { useSelector } from "react-redux";
import { getUserToken } from "../../redux/features/auth/auth_slice";
import { BeatLoader } from "react-spinners";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const token = useSelector(getUserToken);

  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${server_url}/api/v1/contact`, data, {
        headers: { authorization: `Bearer ${token}` },
      });
      setSubject("");
      setMessage("");
      setLoading(false);
      showAlert("success", response.data.message);
    } catch (error) {
      setLoading(false);
      showAlert("error", error.response.data.message);
    }
  };
  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              cols="30"
              rows="10"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {loading ? (
              <button className="btn btn--green" type="button" disabled>
                <BeatLoader loading={loading} size={10} color={"#fff"} />
              </button>
            ) : (
              <button className="btn btn--green">Send Message</button>
            )}
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>08107339039</p>
              </span>
              <span>
                <FaEnvelope />
                <p>support@pinvent.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Lagos, Nigeria</p>
              </span>
              <span>
                <FaTwitter />
                <p>@eluewisdom_</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
