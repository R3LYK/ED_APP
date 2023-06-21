import ClassCode from "../schemas/classCodes.js";
import {
  language_arts,
  mathematics,
  science,
  social_studies,
} from "../data/classCodeData.js";

const seedClassCodes = async () => {
    try {
      // Check if class codes already exist in the database
      const existingClassCodes = await ClassCode.find();
      if (existingClassCodes.length > 0) {
        console.log("Class codes already exist. Skipping seeding.");
        return;
      }
  
      // Create class codes for language arts
      await ClassCode.create({
        classType: "language_arts",
        classCode: language_arts,
      });
  
      // Create class codes for mathematics
      await ClassCode.create({
        classType: "mathematics",
        classCode: mathematics,
      });
  
      // Create class codes for science
      await ClassCode.create({
        classType: "science",
        classCode: science,
      });
  
      // Create class codes for social studies
      await ClassCode.create({
        classType: "social_studies",
        classCode: social_studies,
      });
  
      console.log("Class codes seeded successfully.");
    } catch (error) {
      console.error("Error seeding class codes:", error);
    }
  };
  
  export default seedClassCodes;