import mongoose from 'mongoose';
import Cohort from '../schemas/cohort.js';
import Teacher from '../schemas/teachers.js';
import { fakeStudents, fakeStudents2 } from '../data/fakeStudentData.js';

// Different examples of existing class codes

//CCSS.Math.K.CC.A.1, CCSS.Math.1.OA.A.1, CCSS.Math.2.NBT.A.1
//ELA-Literacy.RL.K.1, ELA-Literacy.RL.1.1, ELA-Literacy.RL.2.1
//NGSS.PS2.A.1, NGSS.LS4.D.1, NGSS.ETS1.B
//SS.H.K.C.1, SS.H.1.C.1, SS.H.2.C.1

// Set the teacher id here
const testTeacherId = "647fcb48df4d5b82b6004246"; 
// Set the cohort name here
const cohortName = 'TestClass2';
// Set the class code here
const cohortCode = 'CCSS.Math.1.OA.A.1';

// Create a function to push the test data to the database
const seedTestClass = async () => {
  try {

    const existingCohort = await Cohort.findOne({ cohortName });
    if (existingCohort) {
        console.log('Test class already exists. Skipping seeding.');
        return;
    }

    // Find the teacher by their ID
    const teacher = await Teacher.findById(testTeacherId);

    if (!teacher) {
      console.error('Teacher not found');
      return;
    }

    // Create a new cohort with the provided data
    const cohort = new Cohort({
      cohortName,
      cohortCode,
      teacher: teacher,
      students: fakeStudents2.map((item) => item.student),
    });

    // Save the cohort to the database
    await cohort.save();

    console.log('Test data pushed to the database successfully!');
  } catch (error) {
    console.error('Error pushing test data:', error);
  } finally {
    // Disconnect from the database after the operation is complete
    mongoose.disconnect();
  }
};

export default seedTestClass;
