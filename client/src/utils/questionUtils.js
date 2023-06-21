export const formatQuestions = (reply, questionType) => {
  try {
    console.log("REPLY, REPLY:", reply);

    let formattedQuestions;

    if (typeof reply === "string") {
      formattedQuestions = JSON.parse(reply);
    } else {
      formattedQuestions = reply;
    }

    const formatQuestion = (questionData) => {
      if (questionData.choices === undefined) {
        return {
          ...questionData,
          choices: questionType === "trueFalse" ? ["True", "False"] : [],
          answer: questionData.answer,
        };
      }
      return questionData;
    };

    formattedQuestions = formattedQuestions.map(formatQuestion);

    console.table(formattedQuestions);

    return formattedQuestions;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};
