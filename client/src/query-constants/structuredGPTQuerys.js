export const generateAssignmentQueryStructure = (selectedNumOfQuestions, selectedQuestionType, quizQuestions, classCode) => {
    return `Create ${selectedNumOfQuestions} questions of type ${selectedQuestionType}.
        The questions should be about the following topic: ${quizQuestions}.
        The questions should be of a difficulty level of ${classCode}
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
  };
  
  