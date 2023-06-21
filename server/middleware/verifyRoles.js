// const verifyRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req?.roles) return res.sendStatus(401); // unauthorized
//     const rolesArray = [...allowedRoles];
//     console.log(rolesArray); //TESTING - NEEDS REMOVED
//     console.log(req.roles); //TESTING - NEEDS REMOVED
//     const result = req.roles
//       .map((role) => rolesArray.includes(role)) //new array with true or false, compares rolesArray
//       .find((value) => value === true); //finds true
//     if (!result) return res.sendStatus(401); // unauthorized
//     next();
//   };
// };


// export default verifyRoles;