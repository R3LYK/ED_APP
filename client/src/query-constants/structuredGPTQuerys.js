// export const generateAssignmentQueryStructure = (
//   selectedNumOfQuestions,
//   classCode,
//   selectedDimensionSEP,
//   selectedDimensionCCC,
//   selectedDimensionDCI,
//   selectedQuestionBoundary,
//   selectedBoundaryTopic,
//   questionType
// ) => {
//   return `Create ${selectedNumOfQuestions} questions. The questions MUST BE of type ${questionType}.
//             For NGSS standard ${classCode}, within the assessment boundary of ${selectedQuestionBoundary}, and the topic of ${selectedBoundaryTopic}. If questions are of type 'multiple choice', answers must always be ordered with capital letters, alphabetically, followed with a parenthesis. If questions are of type 'multiple choice', answers must always be ordered with capital letters, alphabetically, followed with a parenthesis. 
//         All data within this conversation MUST ALWAYS be returned as a valid JSON object, without line breaks, like this. [
//           {
//             "question": "What is the value of the digit '6' in the number 6,412?",
//             "choices": ["A) 6", "B) 12", "C) 412", "D) 4,000"],
//             "answer": "D) 4,000"
//           },
//           {
//             "question": "Which of the following fractions is equivalent to 3/4?",
//             "choices": ["A) 6/8", "B) 5/8", "C) 2/3", "D) 1/2"],
//             "answer": "A) 6/8"
//           }
//         ] Please reply with RFC8259 compliant JSON`;
// };

export const generateAssignmentQueryStructure = (
  selectedNumOfQuestions,
  classCode,
  selectedQuestionBoundary,
  selectedBoundaryTopic ) => {
  
  console.log("selectedNumOfQuestions: ", selectedNumOfQuestions);
  console.log("classCode: ", classCode);
  console.log("selectedQuestionBoundary: ", selectedQuestionBoundary);
  console.log("selectedBoundaryTopic: ", selectedBoundaryTopic);
  
  return `In the context of high school physical science standard ${classCode}, within the assessment boundary of ${selectedQuestionBoundary}, and the topic of ${selectedBoundaryTopic}. Generate questions that require long answers. The format of the question should be a prompt or inquiry that requires an answer consisting of two or more sentences. Please provide questions that promote understanding and explanation rather than simple one-sentence responses. I need ${selectedNumOfQuestions}. All data within this conversation MUST ALWAYS be returned as a valid JSON object, without line breaks, like this. [
    {
      "question": "Describe the law of conservation of matter and explain how it applies to chemical reactions.",
      "answer": "The law of conservation of matter states that matter cannot be created or destroyed in a chemical reaction, only rearranged. This means that the total mass of the reactants must equal the total mass of the products. In other words, the number of atoms of each element remains constant throughout the reaction, even though they may be rearranged into different compounds or molecules."
    }. This is an example of structure, ignore the content when formulating your response. Please reply with RFC8259 compliant JSON`;
};


