import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    uName: {
      type: String,
      required: true,
      unique: true
    },
    roles: {
      type: Number,
      required: true
    },
    pwd: {
      type: String,
      required: true
    },
    classCodes: {
      type: [String],
      required: false
    }
  });

mongoose.model("Teacher", teacherSchema);

export default mongoose.model("Teacher");
