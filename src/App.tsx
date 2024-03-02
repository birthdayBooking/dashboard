import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./page/dashboard/Dashboard";
import GlobalStyles from "./utils/GlobalStyle";
import LayoutAdmin from "./layout/LayoutAdmin";
import { NotFoundPage } from "./page/NotFoundPage";
import Login from "./page/Login/Login";
import { Bookings } from "./page/bookings/Bookings";
import { Account } from "./page/Account/Account";
import { Party } from "./page/Party/Party";
import Chat from "./page/Chat/Chat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutAdmin />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          path: "dashboard",
          element: <Dashboard />,
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
          element: <Party />,
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
      {/* <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="/admin" element={<LayoutAdmin />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
