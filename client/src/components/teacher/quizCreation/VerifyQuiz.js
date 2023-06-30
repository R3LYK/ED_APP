import React, { useState, createContext, useContext } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import CreateAssignment from "./CreateAssignment";
import TeacherDashboard from "../../../pages/teacher/TeachersDashboard";
import Card from "../../../components/QuestionCard";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questionsToKeep, setQuestionsToKeep] = useState([]);

  const addQuestionsToKeep = (question) => {
    setQuestionsToKeep((prevQuestions) => [...prevQuestions, question]);
  };

  const clearQuestionsToKeep = () => {
    setQuestionsToKeep([]);
  };

  return (
    <QuestionContext.Provider
      value={{ questionsToKeep, addQuestionsToKeep, clearQuestionsToKeep }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

const SAVE_QUIZ_URL = "/saveAssignment"; // endpoint for backend
const DELETE_CONVO_URL = "/deleteConvo"; // endpoint for backend

const clearConversation = async (userId, auth) => {
  console.log("ClearConversation function called");
  try {
    if (!auth || !auth.accessToken) {
      console.log("Unauthorized access");
      return;
    }

    const headers = {
      Authorization: `Bearer ${auth.accessToken}`,
      "Content-Type": "application/json",
    };

    console.log("Sending delete request...");
    await axios.delete(`${DELETE_CONVO_URL}/${userId}`, {
      headers,
      withCredentials: true,
    });

    console.log("Conversation deleted successfully");
  } catch (err) {
    console.log(
      "THIS FUNCTION IS BEING CALLED TWICE. I CAN'T FIGURE OUT WHY, AND I'M KINDA OVER IT. SO NOW, IT'S FUTURE ME'S PROBLEM."
    );
  }
};

const VerifyQuiz = () => {
  const { questionsToKeep, clearQuestionsToKeep } = useContext(QuestionContext);

  const { auth } = useAuth();
  const teacherId = auth.id;

  const [, setErrMsg] = useState("");
  const [isNamingRequired, setIsNamingRequired] = useState(true);
  const [showVerifyQuiz, setShowVerifyQuiz] = useState(true);
  const [hasSavedQuiz, setHasSavedQuiz] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);

  const handleSaveQuiz = async () => {
    console.log("authToken: ", auth.accessToken);

    if (isNamingRequired) {
      const name = prompt(
        "Please enter the assignment name (less than 20 characters):"
      );
      if (name && name.trim().length > 0 && name.trim().length <= 20) {
        const assignmentName = name.trim();
        setIsNamingRequired(false);

        if (questionsToKeep.length > 0) {
          try {
            if (!auth || !auth.id) {
              console.log("Unauthorized access");
              return;
            }

            const headers = {
              Authorization: `Bearer ${auth.accessToken}`,
              "Content-Type": "application/json",
            };

            await axios.post(
              SAVE_QUIZ_URL,
              { assignmentName, questionsToKeep, createdBy: teacherId },
              { headers, withCredentials: true }
            );

            console.log("Quiz saved successfully");
            clearQuestionsToKeep();
            clearConversation(teacherId, auth);
            setHasSavedQuiz(true);
          } catch (err) {
            if (!err?.response) {
              setErrMsg("Network error");
            } else if (err?.response?.status === 409) {
              // Handle specific status code
            } else {
              setErrMsg("Quiz save failed");
            }
          }
        } else {
          console.log("Something went wrong, no questions to save");
        }
      } else {
        alert("Invalid assignment name. Please try again.");
        return;
      }
    }
  };

  const handleRegenerateQuiz = () => {
    console.log("Chose to regenerate the quiz");
    clearQuestionsToKeep();
    setShowVerifyQuiz(false);
    clearConversation(teacherId, auth);
  };

  const handleAddMoreQuestions = () => {
    console.log("Chose to add more questions");
    setShowVerifyQuiz(false);
  };

  if (!showVerifyQuiz) {
    return <CreateAssignment />;
  }
  if (showCreateAssignment) {
    return <TeacherDashboard />;
  }

  if (hasSavedQuiz) {
    return (
      <div>
        <h2>Quiz Saved!</h2>
        <button onClick={() => setShowCreateAssignment(true)}>
          Back to Dashboard
        </button>
        <button onClick={() => setShowVerifyQuiz(false)}>
          Build More Assignments
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Verify Quiz</h2>
      {questionsToKeep.map((question, index) => (
        <Card
          key={index}
          questionNum={index + 1}
          question={question.question}
          choices={question.choices}
          answer={question.answer}
        />
      ))}
      <button onClick={handleSaveQuiz}>Save Quiz</button>
      <button onClick={handleRegenerateQuiz}>Regenerate Quiz</button>
      <button onClick={handleAddMoreQuestions}>Add More Questions</button>
    </div>
  );
};

export default VerifyQuiz;
