import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import React, { useEffect, useState } from "react";
import "../../../css/createClasses.css";

const GET_CLASS_CODES_URL = "/class_codes";

const GetClassData = ({ classType, onItemClick }) => {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const [classCodes, setClassCodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_CLASS_CODES_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            classType,
          },
        });
        setClassCodes(response.data.classCodes);
      } catch (error) {
        console.error(error);
      }
    };

    if (classType) {
      fetchData();
    }
  }, [classType, accessToken]);

  return (
    <div>
     
      <div className="hovered-items-container">
      <div className="hovered-description-container">
        <p>
          Select any class codes that apply to any of your classes. These
          selections will help us determine the difficulty level of questions to
          generate.
        </p>
      </div>
        <ul>
          {classCodes.map((item, index) => (
            <li
              key={index}
              className="hovered-item"
              onClick={() => onItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetClassData;
