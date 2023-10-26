import React, { useState, useRef } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";

function HomeRedirectPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    history.push("/");
  };

  return (
    <div>
      <h1>Log in to Spotify</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label style={{ marginBottom: "10px" }}>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button type="submit">Log In</button>
        </div>
        <OpenModalButton
          buttonText="Sign up"
          onItemClick={closeMenu}
          modalComponent={<SignupFormModal />}
        />
      </form>
    </div>
  );
}

export default HomeRedirectPage;
