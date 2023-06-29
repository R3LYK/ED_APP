import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import LoginPersist from "./components/LoginPersist";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import StudentRegister from "./pages/StudentRegister";
import TeacherRegister from "./pages/teacher/TeacherRegister";
import TeacherDashboard from "./pages/teacher/TeachersDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateClasses from "./pages/teacher/CreateClasses";
import ClassOverview from "./pages/teacher/ClassOverview";
import NoPage from "./pages/NoPage";
import AssignWork from "./pages/teacher/AssignWork";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
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
                <Route
                  path="/teacher_dashboard"
                  element={<TeacherDashboard />}
                />
                <Route
                  path="/teacher_dashboard/create_classes"
                  element={<CreateClasses />}
                />

                <Route
                  path="/teacher_dashboard/class_overview"
                  element={<ClassOverview />}
                />
                <Route
                  path="/teacher_dashboard/assign_work"
                  element={<AssignWork />}
                />
              </Route>
              <Route element={<RequireAuth allowedRoles={[1003]} />}>
                <Route
                  path="/StudentDashboard"
                  element={<StudentDashboard />}
                />
              </Route>
            </Route>
            {/* catch-all route */}
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
