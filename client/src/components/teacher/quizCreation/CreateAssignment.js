import React, { useState, useEffect, useCallback } from "react";
import TeacherDashNav from "../TeacherDashNav";
import usePersistQuery from "../../../hooks/usePersistQuery";
import TextareaAutosize from "react-textarea-autosize";
import { formatQuestions } from "../../../utils/questionUtils";
import QuestionForm from "./QuestionForm.js";

const CreateAssignment = () => {
  const [quizQuestions, setQuizQuestions] = useState("");
  const { responseData, handleQueryGPT } = usePersistQuery();

  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [questionType, setQuestionType] = useState("multiple choice");
  const [formattedQuestions, setFormattedQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const setQuestionsToKeep = () => {
    // This is a dummy function that does nothing
    //except make everything work
  };

  const handleNumOfQuestionsChange = (e) => {
    const value = e.target.value;
    setNumOfQuestions(value);
  };

  const handleQuestionTypeChange = (e) => {
    const value = e.target.value;
    setQuestionType(value);
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!quizQuestions) {
        setErrorMessage("Query cannot be empty");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      const selectedNumOfQuestions = numOfQuestions;
      const selectedQuestionType = questionType;

      const updatedQuizQuestions = `Create ${selectedNumOfQuestions} questions of type ${selectedQuestionType}.
      The questions should be about the following topic: ${quizQuestions}.
      If questions are of type 'multiple choice', answers must always be ordered with capital letters, alphabetically, followed with a parenthesis. 
      All data within this conversation MUST ALWAYS be returned as a valid JSON object, without line breaks, like this. [
        {
          "question": "What is the value of the digit '6' in the number 6,412?",
          "choices": ["A) 6", "B) 12", "C) 412", "D) 4,000"],
          "answer": "D) 4,000"
        },
        {
          "question": "Which of the following fractions is equivalent to 3/4?",
          "choices": ["A) 6/8", "B) 5/8", "C) 2/3", "D) 1/2"],
          "answer": "A) 6/8"
        }
      ] Please reply with RFC8259 compliant JSON`;

      handleQueryGPT({ prompt: updatedQuizQuestions });
      setShowQuestionForm(true);
    },
    [numOfQuestions, questionType, quizQuestions, handleQueryGPT]
  );

  useEffect(() => {
    if (responseData && responseData.reply) {
      const formattedQuestions = formatQuestions(
        responseData.reply,
        //questionType
      );
      setFormattedQuestions(formattedQuestions);
    }
  }, [responseData]);

  return (
    <div className="teacher-lesson-plans-container">
      {!showQuestionForm && (
        <>
          <TeacherDashNav />
          <h1 className="lesson-plans-title">Teacher Lesson Plans</h1>
          <p>This is where teachers can create lesson plans.</p>
          <p>And probably other stuff...</p>
          <form className="gpt-form" onSubmit={handleSubmit}>
            <label htmlFor="numOfQuestions-input">Number of Questions:</label>
            <div className="input-container">
              <select
                id="numOfQuestions-input"
                value={numOfQuestions}
                onChange={handleNumOfQuestionsChange}
              >
                {Array.from({ length: 50 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="questionType-input">Question Type:</label>
            <div className="input-container">
              <select
                id="questionType-input"
                value={questionType}
                onChange={handleQuestionTypeChange}
              >
                <option value="multiple choice">Multiple Choice</option>
                <option value="trueFalse">True or False</option>
                <option value="shortAnswer">Short Answer</option>
              </select>
            </div>

            <label htmlFor="quizQuestions-input">
              Create Tests or Assignments:
            </label>
            <div className="input-container">
              <TextareaAutosize
                placeholder="Generate Lesson Plan"
                id="quizQuestions-input"
                value={quizQuestions}
                onChange={(e) => setQuizQuestions(e.target.value)}
              />
              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </>
      )}
      {showQuestionForm && (
        <QuestionForm
          questions={formattedQuestions}
          setFormattedQuestions={setFormattedQuestions}
          setQuestionsToKeep={setQuestionsToKeep}
          showCreateAssignment={showCreateAssignment}
          setShowCreateAssignment={setShowCreateAssignment}
        />
      )}
    </div>
  );
};

export default CreateAssignment;
