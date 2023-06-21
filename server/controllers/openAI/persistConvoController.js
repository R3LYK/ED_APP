import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import Conversation from "../../schemas/conversations.js";

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const handleOpenAIRequest = async (req, res) => {
  const { prompt } = req.body;
  const { userId } = req.params; // Access the user ID from req.params

  try {
    // Retrieve the conversation from the database based on the user identifier
    let conversation = await Conversation.findOne({ user: userId });

    if (!conversation) {
      // If the conversation doesn't exist, create a new one
      conversation = new Conversation({ user: userId, messages: [] });
    }

    // Append the user message to the conversation array
    conversation.messages.push({ role: "user", content: prompt });

    // Clean the messages array before making the API call
    const cleanedMessages = conversation.messages.map(({ role, content }) => {
      return { role, content };
    });
    console.log("Cleaned messages:", cleanedMessages);

    // Make the API call with the cleaned messages array
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: cleanedMessages,
    });
    console.log("API response:", response.data);

    // Retrieve the assistant's reply from the API response
    const reply = response.data.choices[0].message.content;

    // Append the assistant's reply to the conversation array
    conversation.messages.push({ role: "assistant", content: reply });

    // Save the updated conversation in the database
    await conversation.save();

    res.json({reply});
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Error status:", error.response.status);
      console.log("Error message:", error.response.data.error.message);
      res.status(500).json({ error: "An error occurred" });
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
      res.status(500).json({ error: "An error occurred" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error message:", error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

export default { handleOpenAIRequest };
