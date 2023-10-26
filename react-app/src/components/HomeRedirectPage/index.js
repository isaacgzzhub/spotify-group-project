import React, { useState, useRef } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
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
    history.push("/")
  };

  return (
    <div>
      <h1>Log in to Spotify</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <OpenModalButton
              buttonText="Sign up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
    </div>
  );
}

export default HomeRedirectPage;
