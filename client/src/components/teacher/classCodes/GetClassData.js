import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import React, { useEffect, useState } from "react";
//import styles from "../../../css/createClasses.module.css";

const GET_CLASS_CODES_URL = "/class_codes";

const GetClassData = ({ classType, onItemClick, styles }) => {
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
      {classCodes.map((item, index) => (
        <li
          key={index}
          className={styles["code-item"]}
          onClick={() => onItemClick(item)}
        >
          {item}
        </li>
      ))}
    </div>
  );
};

export default GetClassData;
