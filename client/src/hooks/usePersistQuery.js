import { useState } from "react";
import queryGPT from "../hooks/queryGPT";
import useAuth from "../hooks/useAuth";

const usePersistQuery = () => {
  const [responseData, setResponseData] = useState("");
  const { auth } = useAuth();

  const handleQueryGPT = async (quizQuestions) => {
    if (!auth) {
      console.log("User is not authenticated.");
      return;
    }

    const userId = auth.id;
    const accessToken = auth.accessToken;
    console.log("THIS IS THE USERID:", userId);
    console.log("THIS IS THE LESSON PLAN:", quizQuestions);

    // Call the queryGPT function with the provided user ID and lesson plan
    const response = await queryGPT({ userId, quizQuestions: quizQuestions.prompt, accessToken });

    // Handle the response from the backend as needed
    console.log("RESPONSE.REPLY:");
    console.log(response.reply); // Access the reply property of the response object
    setResponseData(response.reply);

    return response; // Return the response object
  };

  return { responseData, handleQueryGPT };
};

export default usePersistQuery;
