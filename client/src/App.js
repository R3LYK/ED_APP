import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import LoginPersist from "./components/LoginPersist";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import StudentRegister from "./pages/StudentRegister";
import TeacherRegister from "./pages/TeacherRegister";
import TeacherDashboard from "./pages/TeachersDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateClasses from "./pages/CreateClasses";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/TeacherRegister" element={<TeacherRegister />} />
          <Route path="/StudentRegister" element={<StudentRegister />} />
          {/* protected routes */}
          <Route element={<LoginPersist />}>
            <Route element={<RequireAuth allowedRoles={[1002]} />}>
              <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
              <Route path="/TeacherDashboard/CreateClasses" element={<CreateClasses />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[1003]} />}>
              <Route path="/StudentDashboard" element={<StudentDashboard />} />
            </Route>
          </Route>
          {/* catch-all route */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
