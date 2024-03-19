import { Navigate } from "react-router-dom";
import { NotPermitted } from "./NotPermitted";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// const RoleBaseRoute = ({ children }: { children: React.ReactNode }) => {
//   const userRole = "ADMIN";

//   if (userRole === "ADMIN") {
//     return <>{children}</>;
//   } else {
//     return <NotPermitted />;
//   }
// };

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log('authen status', isAuthenticated)
  return (
    <>
      {isAuthenticated === true ? (
        <>
          {/* <RoleBaseRoute></RoleBaseRoute> */}
          {children}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
