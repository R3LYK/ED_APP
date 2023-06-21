import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useRef, useState, useEffect } from "react";
import {
  FaInfoCircle,
  FaRegDizzy,
  FaRegGrinStars,
} from "react-icons/fa";
//import axios from "./api/axios";

const STUDENT_ID_REGEX = /^[a-zA-Z][a-zA-X0-9-_]{3,23}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-X0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/studentRegister'; // endpoint for backend
const DEFAULT_ROLE = 1003; // role for student

const StudentRegister = () => {
  const userRef = useRef();
  const studentIdRef = useRef();
  const errRef = useRef();

  const [studentId, setStudentId] = useState("");
  const [validStudentId, setValidStudentId] = useState(false);
  const [studentIdFocus, setStudentIdFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = STUDENT_ID_REGEX.test(studentId);
    setValidStudentId(result);
  }, [studentId]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = STUDENT_ID_REGEX.test(studentId);
    const v2 = USER_REGEX.test(user);
    const v3 = PWD_REGEX.test(pwd);
    const v4 = pwd === matchPwd;

    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid input. Please check the fields.");
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL, {
        studentID: studentId,
        uName: user,
        roles: DEFAULT_ROLE,
        pwd: pwd,
      });
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Network error");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or student ID already exists");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <nav className="nav">
        <Navbar />
      </nav>
      {success ? (
        <div>
          <h1>Success!</h1>
          <p>{/* <a href="#">Sign In</a> to continue. */}</p>
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
          <h1>Student</h1>
          <h3>Register</h3>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="studentId">Student ID:</label>
            <span className={validStudentId ? "valid" : "hide"}>
              <FaRegGrinStars />
            </span>
            <span className={validStudentId || !studentId ? "hide" : "invalid"}>
              <FaRegDizzy />
            </span>
            <input
              type="text"
              id="studentId"
              ref={studentIdRef}
              autoComplete="off"
              onChange={(e) => setStudentId(e.target.value)}
              value={studentId}
              required
              aria-invalid={validStudentId ? "false" : "true"}
              aria-describedby="studentidnote"
              onFocus={() => setStudentIdFocus(true)}
              onBlur={() => setStudentIdFocus(false)}
            />
            <p
              id="studentidnote"
              className={
                studentIdFocus && studentId && !validStudentId
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FaInfoCircle />
              4 to 24 characters.
              <br />
              Must begin with a letter or a number.
              <br />
              Letters, numbers, underscores, and hyphens allowed.
            </p>
            <label htmlFor="email">Username:</label>
            <span className={validName ? "valid" : "hide"}>
              <FaRegGrinStars />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              <FaRegDizzy />
            </span>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              4 to 24 characters.
              <br />
              must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
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
              disabled={!validName || !validPwd || !validMatch ? true : false}
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
            <br />
            Not a student?
            <br />
            <Link to="/TeacherRegister">Teacher</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default StudentRegister;
