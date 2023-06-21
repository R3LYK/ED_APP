import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { QuestionProvider } from "./components/teacher/quizCreation/VerifyQuiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QuestionProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </QuestionProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
