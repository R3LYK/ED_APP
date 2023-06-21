import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // User identifier or session ID
    messages: [
      {
        role: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { strict: false } // Add the strict option
);

mongoose.model("Conversation", conversationSchema);

export default mongoose.model("Conversation");


//the above two lines MIGHT BE?? equivalent to the following:
// export default mongoose.model("Conversation", conversationSchema);