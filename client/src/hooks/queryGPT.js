import axios from "../api/axios.js";

const queryGPT = async ({ userId, quizQuestions, accessToken }) => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const message = {
      role: "system",
      content: "/start",
    };

    const { _id, ...cleanedMessage } = message;

    const payload = {
      messages: [cleanedMessage],
      prompt: quizQuestions,
    };

    const response = await axios.post(`/api/queryGPT/${userId}`, payload, { headers });
    const reply = response.data;

    // Return the response as JSON
    return { reply };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while querying GPT", error);
  }
};

export default queryGPT;
