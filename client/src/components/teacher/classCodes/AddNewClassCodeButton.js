import React from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";

const SUBMIT_CODES_URL = "/add_class_code";

const AddNewClassCodeButton = ({
  classType,
  customCode,
  text,
  onCustomCodeSubmit,
}) => {
  console.log("customCode:", customCode);
  console.log("classType:", classType);
  console.log("onCustomCodeSubmit:", onCustomCodeSubmit);
  const { auth } = useAuth();

  const handleSubmit = async () => {
    try {
      if (!auth || !auth.id) {
        console.log("Unauthorized access");
        return;
      }

      const headers = {
        Authorization: `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
      };

      console.log("auth:", auth);

      const role = auth.roles[0];
      console.log("role:", role);

      // Send a request to your backend server to store the selected classes
      const response = await axios.post(
        SUBMIT_CODES_URL,
        {
          classType,
          classCode: customCode,
          role,
        },
        { headers, withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Classes stored successfully!");
        // Reset the form or perform any other necessary actions
        onCustomCodeSubmit(); // Call the onCustomCodeSubmit callback provided by the parent component
      } else {
        console.error("Failed to store classes.");
      }
    } catch (error) {
      console.error("Error storing classes:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>{text}</button>
    </div>
  );
};

export default AddNewClassCodeButton;
