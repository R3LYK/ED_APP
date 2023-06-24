import { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { FaInfoCircle, FaRegDizzy, FaRegGrinStars } from "react-icons/fa";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/teacherRegister"; // endpoint for backend
const DEFAULT_ROLE = 1002; // role for teacher

const TeacherRegister = () => {
  const nameRef = useRef();
  const errRef = useRef();

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidTitle(title !== "");
  }, [title]);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uname =
      firstName.charAt(0).toLowerCase() + "." + lastName.toLowerCase();
    const v1 = PWD_REGEX.test(pwd);
    const v2 = title !== "";
    if (!v1) {
      setErrMsg("Invalid password");
      return;
    }
    if (!v2) {
      setErrMsg("Must select a title");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        { title, firstName, uName: uname, lastName, roles: DEFAULT_ROLE, pwd },
        { withCredentials: true }
      );
      console.log("respons data " + response.data);
      console.log("response access Token " + response.data.accessToken);
      console.log(" response JSON " + JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Network error");
      } else if (err.response?.status === 409) {
        setErrMsg("Username already exists");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  const handleTitleChange = (selectedTitle) => {
    setTitle(selectedTitle);
  };

  return (
    <>
      <nav className="nav">
        <Navbar />
      </nav>
      {success ? (
        <div>
          <h1>Success!</h1>
          <p>
            Username:{" "}
            {firstName[0].toLowerCase() + "." + lastName.toLowerCase()}
          </p>
          <p>
            <Link to="/Login">Sign In</Link>
          </p>
        </div>
      ) : (
        <div className="auth-form-container">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Teacher</h1>
          <h3>Register</h3>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <div className="toggle-buttons">
              <button
                type="button"
                className={title === "Mr." ? "active" : "inactive"}
                onClick={() => handleTitleChange("Mr.")}
              >
                Mr.
              </button>
              <button
                type="button"
                className={title === "Mrs." ? "active" : "inactive"}
                onClick={() => handleTitleChange("Mrs.")}
              >
                Mrs.
              </button>
              <button
                type="button"
                className={title === "Ms." ? "active" : "inactive"}
                onClick={() => handleTitleChange("Ms.")}
              >
                Ms.
              </button>
            </div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              ref={nameRef}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
            <label htmlFor="password">
              Password:
              <FaRegGrinStars className={validPwd ? "valid" : "hide"} />
              <FaRegDizzy className={validPwd || !pwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FaInfoCircle />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: ! @ # $ %
            </p>
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FaRegGrinStars
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FaRegDizzy
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              Must match the first password input field.
            </p>
            <button disabled={!validPwd || !validTitle || !validMatch}>
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/Login">Sign In</Link>
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default TeacherRegister;
