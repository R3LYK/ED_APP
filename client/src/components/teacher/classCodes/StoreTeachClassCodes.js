import { useState } from 'react';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

const SUBMIT_CODES_URL = '/store_class_code';

const SubmitButton = ({ classCode, onClassCodeSaved, isCodeSaved }) => {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const TeacherId = auth.id;

  const [, setErrMsg] = useState('');

  const handleSubmit = async () => {
    try {
      if (!auth || !auth.accessToken) {
        console.log('Unauthorized access');
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      // Send a request to your backend server to store the selected classes
      await axios.post(SUBMIT_CODES_URL, { classCode, TeacherId }, { headers });

      console.log('Class code stored successfully!');

      // Invoke the callback function to notify the parent component
      onClassCodeSaved();
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Network error');
      } else if (err?.response?.status === 409) {
        // Handle specific status code
      } else {
        setErrMsg('Adding class code failed');
      }
    }
  };

  return (
    <div>
      {!isCodeSaved && ( // Render the button only if the code is not saved
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default SubmitButton;
