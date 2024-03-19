import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalStyles from "./utils/GlobalStyle";
import LayoutAdmin from "./layout/LayoutAdmin";
import NotFound from "./page/NotFoundPage";

import Chat from "./page/Chat/Chat";

import { Bookings } from "./page/bookings";
import { LayoutParty } from "./page/Party/LayoutParty";
import { DashBoard } from "./page/dashboard";
import { Account } from "./page/Account";
import Login from "./page/Login/Login";
import { ProtectedRoute } from "./page/ProtectedRoute/ProtetedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "booking",
          element: <Bookings />,
        },
        {
          path: "user",
          element: <Account />,
        },
        {
          path: "party",
          element: <LayoutParty />,
        },
        {
          path: "chat",
          element: <Chat />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
