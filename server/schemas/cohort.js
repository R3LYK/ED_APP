import mongoose from 'mongoose';

const cohortSchema = new mongoose.Schema({
    cohortName: {
        type: String,
        required: true,
    },
    cohortCode: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    students: [
        {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            studentId: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: false,
            },
        }
    ],
});

mongoose.model('Cohort', cohortSchema);

export default mongoose.model('Cohort');



