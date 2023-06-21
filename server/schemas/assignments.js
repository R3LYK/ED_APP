import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  assignmentName: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      choices: [String],
      answer: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    }
});

//mongoose.model('Assignment', assignmentSchema);

export default mongoose.model('Assignment', assignmentSchema);
