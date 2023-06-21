import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Define an empty conversation array to store the conversation history
let conversation = [];

const handleOpenAIRequest = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Append the user message to the conversation array
    conversation.push({ role: "user", content: prompt });

    // Make the API call with the updated conversation
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });

    // Retrieve the assistant's reply from the API response
    const reply = response.data.choices[0].message.content;

    // Append the assistant's reply to the conversation array
    conversation.push({ role: "assistant", content: reply });

    res.json(reply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default { handleOpenAIRequest };
