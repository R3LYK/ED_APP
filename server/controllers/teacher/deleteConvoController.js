import Conversation from "../../schemas/conversations.js";

const deleteConvoController = async (req, res) => {
  const { userId } = req.params; // Access the user ID from req.params

  try {
    // Find the conversation by the user ID and delete it
    const deletedConvo = await Conversation.findOneAndDelete({ user: userId });

    if (deletedConvo) {
      res.json({ message: "Conversation deleted successfully" });
    } else {
      res.status(404).json({ error: "Conversation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

export default { deleteConvoController };

  