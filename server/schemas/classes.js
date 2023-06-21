import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    className: {
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

