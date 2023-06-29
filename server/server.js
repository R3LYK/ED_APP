import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logEvents.js";
import { errorHandler } from "./middleware/errorHandler.js";
import credentials from "./middleware/credentials.js";
import refreshRouter from "./routes/api/refresh.js";
import teacherRegisterRouter from "./routes/api/teacherRegister.js";
import studentRegisterRouter from "./routes/api/studentRegister.js";
import authRouter from "./routes/api/auth.js";
import storeClassCodeRouter from "./routes/api/teacher/storeClassCode.js";
import classCodeRouter from "./routes/api/teacher/classCodeRouter.js";
import saveStudentRouter from "./routes/api/teacher/saveStudent.js";
import deleteConvoRouter from "./routes/api/teacher/deleteConvo.js";
import getTeacherClassRouter from "./routes/api/teacher/getTeacherClass.js";
import getCohortsRouter from "./routes/api/teacher/getCohorts.js";
import verifyJWT from "./middleware/verifyJWT.js";
import logoutRouter from "./routes/api/logout.js";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";

import assignmentEventRouter from "./routes/api/eventRouter.js";

// These need to be their own router
import saveAssignmentRouter from "./routes/api/teacher/saveAssignments.js";
import getAssignmentsRouter from "./routes/api/teacher/getAssignments.js";

// External API Routes
import persistentRouter from "./routes/externalAPI/persistentRouter.js";
// Import tools for dev purposes
import seedClassCodes from "./tools/seedClassCodes.js";
import seedTestClass from "./tools/seedTestClass.js";
import assignmentEvent from "./schemas/assignmentEvent.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Custom middleware logger
app.use(logger);

// Hanles options creds check before CORS
//and fetches cookies cred reqs
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middle-ware for parsing cookies
app.use(cookieParser());

// built-in middleware
app.use(express.urlencoded({ extended: true }));

// for parsing application/json
app.use(express.json());

//Need to change these from camelCase to snake_case
//hadn't checked best practices for this yet

// register routes > middleware
app.use("/teacherRegister", teacherRegisterRouter);
app.use("/studentRegister", studentRegisterRouter);
app.use("/api", persistentRouter);
app.use("/auth", authRouter);
// route for refreshing access token
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);
// JWT verification middleware
app.use(verifyJWT);

// routes for teacher
app.use("/deleteConvo", deleteConvoRouter);
app.use("/store_class_code", storeClassCodeRouter);
app.use("/teacher", getTeacherClassRouter);
app.use("/save_student", saveStudentRouter);
app.use("/get_teacher_cohorts", getCohortsRouter);

// routes for calendar events
app.use("/add_event", assignmentEventRouter);

// these two 'assignment' routes need to have their own router
app.use("/saveAssignment", saveAssignmentRouter);
app.use("/get_assignemnts", getAssignmentsRouter);


// Not sure that this will work
// part of it (fetching the classes from the db) works for sure, 
//haven't tested the other part (posting the classes to the db)
app.use("/class_codes", classCodeRouter);

// custom error handling, @ /middleware/errorHandler.js
app.use(errorHandler);

// DEV_TOOLS - seed data for testing

// Call the seedClassCodes function before starting the server
//seedClassCodes();

// This is for dev purposes only, it breaks the app if it's not 
//commented out after populating the database.
//seedTestClass();

// DB Connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log("Server started on port " + PORT));
});