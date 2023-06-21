import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import React, { useEffect, useState } from "react";

const GET_CLASS_CODES_URL = "/class_codes";

const GetExistClassCode = ({ classType, onItemClick }) => {
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
        <ul>
          {classCodes.map((item, index) => (
            <li key={index} className="hovered-item" onClick={() => onItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetExistClassCode;
