import { useRef, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import axios from "../api/axios";

const AUTH_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const uNameRef = useRef(); 
  const pwdRef = useRef(); 
  const errRef = useRef();

  const [uName, setUName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // useEffect(() => {
  //   useRef.current.focus();
  // });

  // useEffect(() => {
  //   setErrMsg('');
  // }, [uName, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(AUTH_URL, JSON.stringify({ uName, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      //console.log(JSON.stringify(res?.data));
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.user.roles;
      const id = res?.data?.user._id;
      //console.log("ACCESS TOKEN = " + accessToken);
      //console.log("ROLES = " + roles);
      setAuth({ id, uName, pwd, roles: [roles], accessToken }); // Updated the property names
      setUName("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Server is down");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      //console.log(err);
    }
    errRef.current.focus();
  };

  return (
    <>
        <div className="auth-form-container">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="uName">Username:</label> {/* Changed to uName */}
            <input
              type="text"
              id="uName"
              ref={uNameRef} // Changed to uNameRef
              onChange={(e) => setUName(e.target.value)} // Changed to setUName
              value={uName}
              required
            />
            <label htmlFor="pwd">
              {" "}
              {/* Changed to pwd */}
              Password:
              <FaInfoCircle className={errMsg ? "invalid" : "hide"} />
            </label>
            <input
              type="password"
              id="pwd"
              ref={pwdRef} // Changed to pwdRef
              onChange={(e) => setPwd(e.target.value)} // Changed to setPwd
              value={pwd}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p>
            New user?
            <br />
            Register here:
            <br />
            <span className="line">
              <NavLink to="/StudentRegister" className="student-reg">
                Student
              </NavLink>
              <br />
              <NavLink to="/TeacherRegister" className="teacher-reg">
                Teacher
              </NavLink>
            </span>
          </p>
        </div>
    </>
  );
};

export default Login;
