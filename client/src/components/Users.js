// import { useState, useEffect } from "react";
// import { axiosPrivate } from "../hooks/useAxiosPrivate";
// import { useNavigate, useLocation } from "react-router-dom";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const axiosPrivateInstance = axiosPrivate();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     let isMounted = true;
//     const controller = new AbortController();

//     const getUsers = async () => {
//       try {
//         const response = await axiosPrivateInstance.get("/users", {
//           signal: controller.signal,
//         });
//         console.log(response.data);
//         isMounted && setUsers(response.data);
//       } catch (err) {
//         console.error(err);
//         navigate("/login", { state: { from: location }, replace: true });
//       }
//     };

//     getUsers();

//     return () => {
//       isMounted = false;
//       controller.abort();
//     };
//   }, [axiosPrivateInstance, navigate, location]);

//   return (
//     <div>
//       <h2>Users List</h2>
//       {users.length ? (
//         <ul>
//           {users.map((user, i) => (
//             <li key={i}>{user?.uName}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No users to display</p>
//       )}
//     </div>
//   );
// };

// export default Users;
