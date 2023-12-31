// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { signUp } from "../../store/session";
// import "./SignupForm.css";

// function SignupFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       const data = await dispatch(signUp(username, email, password));
//       if (data) {
//         setErrors(data);
//       }
//     } else {
//       setErrors([
//         "Confirm Password field must be the same as the Password field",
//       ]);
//     }
//   };

//   return (
//     <div>
//       <form className="form" onSubmit={handleSubmit}>
//         <h1>Sign Up</h1>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <label>
//           <div className="form-row">
//             Email
//             <p className="errors">{errors.songName}</p>
//           </div>

//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           <div className="form-row">
//             Username
//             <p className="errors">{errors.songUrl}</p>
//           </div>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           <div className="form-row">
//             Password
//             <p className="errors">{errors.songThumbnail}</p>
//           </div>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           <div className="form-row">
//             Confirm Password
//             <p className="errors">{errors.releaseYear}</p>
//           </div>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default SignupFormPage;
