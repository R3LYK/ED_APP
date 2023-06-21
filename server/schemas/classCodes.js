import mongoose from 'mongoose';

const classCodeSchema = new mongoose.Schema({
    classType: {
      type: String,
      required: true,
    },
    classCode: {
      type: [String],
      required: true,
    },
  });

mongoose.model('ClassCode', classCodeSchema);

export default mongoose.model("ClassCode");