import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true,
  },
  uName: {
    type: String,
    required: true,
    unique: true,
  },
  roles: {
    type: Number,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
});

mongoose.model("Student", studentSchema);

export default mongoose.model("Student");
