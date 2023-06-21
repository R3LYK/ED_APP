import React, { useState, useEffect, useCallback,useContext } from "react";
import { QuestionProvider, QuestionContext } from "./VerifyQuiz";
import usePersistQuery from "../../../hooks/usePersistQuery";
import { formatQuestions } from "../../../utils/questionUtils";
import VerifyQuiz from "./VerifyQuiz";

const QuestionForm = ({ questions, setFormattedQuestions }) => {
  const { addQuestionsToKeep } = useContext(QuestionContext);
  const { responseData, handleQueryGPT } = usePersistQuery();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showVerifyQuiz, setShowVerifyQuiz] = useState(false);

  useEffect(() => {
    const initialSelectedOptions = questions.reduce((options, question, index) => {
      options[index] = "keep";
      return options;
    }, {});

    setSelectedOptions(initialSelectedOptions);
  }, [questions]);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const questionsToKeep = questions.filter((question, index) => {
        return selectedOptions[index] === "keep";
      });

      questionsToKeep.forEach(addQuestionsToKeep);

      const regenerateQuestions = Object.keys(selectedOptions).filter(
        (questionIndex) => selectedOptions[questionIndex] === "regenerate"
      );

      const prompt =
        regenerateQuestions.length > 0
          ? `Please regenerate ${regenerateQuestions.length} questions. No other information or comments are needed. You MUST respond with RFC8259 compliant JSON only!`
          : null;

      if (regenerateQuestions.length > 0) {
        handleQueryGPT({ prompt: prompt });
        setFormattedQuestions([]);
        setSelectedOptions({});
      } else {
        setShowVerifyQuiz(true);
      }
    },
    [selectedOptions, handleQueryGPT, setFormattedQuestions, questions, addQuestionsToKeep]
  );

  useEffect(() => {
    if (responseData && responseData.reply) {
      const updatedQuestions = formatQuestions(responseData.reply);
      setFormattedQuestions((prevFormattedQuestions) => [
        ...prevFormattedQuestions,
        ...updatedQuestions,
      ]);
    }
  }, [responseData, setFormattedQuestions]);

  if (!showVerifyQuiz) {
    return (
      <div>
        <QuestionProvider>
          <div>
            <h2>Proposed Questions:</h2>
            {questions.map((question, index) => (
              <div key={index}>
                <h3>Question {index + 1}</h3>
                <p>{question.question}</p>
                <ul>
                  {question.choices.map((choice, choiceIndex) => (
                    <li key={choiceIndex}>{choice}</li>
                  ))}
                  <li>Answer: {question.answer}</li>
                </ul>
                <label>
                  Keep:
                  <input
                    type="checkbox"
                    checked={selectedOptions[index] === "keep"}
                    onChange={() => handleOptionChange(index, "keep")}
                  />
                </label>
                <label>
                  Regenerate:
                  <input
                    type="checkbox"
                    checked={selectedOptions[index] === "regenerate"}
                    onChange={() => handleOptionChange(index, "regenerate")}
                  />
                </label>
              </div>
            ))}

            <button onClick={handleSubmit}>Submit</button>
            <span>Question total: {questions.length}</span>
          </div>
        </QuestionProvider>
      </div>
    );
  } else {
    return <VerifyQuiz />;
  }
};

export default QuestionForm;
