import React, { useState, useEffect, useCallback } from "react";
import TeacherDashNav from "../TeacherDashNav";
import usePersistQuery from "../../../hooks/usePersistQuery";
import TextareaAutosize from "react-textarea-autosize";
import { formatQuestions } from "../../../utils/questionUtils";
import QuestionForm from "./QuestionForm.js";
import GetTeacherClasses from "../../teacher/GetTeacherClasses.js";
import { generateAssignmentQueryStructure } from "../../../query-constants/structuredGPTQuerys.js";

const CreateAssignment = () => {
  const [quizQuestions, setQuizQuestions] = useState("");
  const { responseData, handleQueryGPT } = usePersistQuery();

  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [questionType, setQuestionType] = useState("multiple choice");
  const [formattedQuestions, setFormattedQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [teacherClasses, setTeacherClasses] = useState([]);
  const [selectedClassCode, setSelectedClassCode] = useState("");
  

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

  const handleTeacherClassChange = (teacherClasses) => {
    setTeacherClasses(teacherClasses);
  };

  const handleClassCodeChange = (e) => {
    const value = e.target.value;
    setSelectedClassCode(value);
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
      const classCode = selectedClassCode;

      const updatedQuizQuestions = generateAssignmentQueryStructure(
        selectedNumOfQuestions,
        selectedQuestionType,
        quizQuestions,
        classCode
      );

      handleQueryGPT({ prompt: updatedQuizQuestions });
      setShowQuestionForm(true);
    },
    [numOfQuestions, questionType, quizQuestions, handleQueryGPT]
  );

  useEffect(() => {
    if (responseData && responseData.reply) {
      const formattedQuestions = formatQuestions(
        responseData.reply
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
            <div>
              <GetTeacherClasses
                onTeacherClassChange={handleTeacherClassChange}
              />

              <label htmlFor="classType-input">Choose the class code</label>
              <div>
                <select
                  id="classType-input"
                  value={selectedClassCode}
                  onChange={handleClassCodeChange}
                >
                  <option value="">Choose class code</option>
                  {teacherClasses.map((classCode, index) => (
                    <option key={index} value={classCode}>
                      {classCode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label htmlFor="questionType-input">Question Type:</label>
            <div className="input-container">
              <select
                id="questionType-input"
                value={questionType}
                onChange={handleQuestionTypeChange}
              >
                <option value="multiple choice">Multiple Choice</option>
                <option value="true false">True or False</option>
                <option value="short answer">Short Answer</option>
                <option value="long answer">Long Answer</option>
                <option value="fill in the blank">Fill in the Blank</option>
              </select>
            </div>

            <label htmlFor="quizQuestions-input">
              Create Tests or Assignments:
            </label>
            {/* TODO: Fix the issue with this re-rendering on every character input */}
            <div className="input-container">
              <TextareaAutosize
                placeholder="Generate Lesson Plan"
                id="quizQuestions-input"
                value={quizQuestions}
                onChange={(e) => setQuizQuestions(e.target.value)}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
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