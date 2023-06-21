import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import {
  FaInfoCircle,
  FaRegDizzy,
  FaRegGrinStars,
} from "react-icons/fa";
//import axios from "./api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
    console.log(title);
    setValidTitle(title !== "");
  }, [title]);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  //this is the original, user probably needs to be replaced with name

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd, matchPwd]);

  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh, which will lose state

    // this is to keep people from bypassing the form
    // validation by disabling the button
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
    console.log(firstName);
    console.log(name);
    setSuccess(true);
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
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
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
            <button
              disabled={!validPwd || !validTitle || !validMatch ? true : false}
            >
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
