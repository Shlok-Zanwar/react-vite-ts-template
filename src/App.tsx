import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { APP_TOKEN_KEY } from "./constants";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Reducers/store";
import { ar_login, ar_logout, ar_setLoading } from "./Reducers/authReducer";
import AppLayout from "./Layout/AppLayout";
import Login from "./Pages/Login";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaRegImages } from "react-icons/fa";
import { MdAccessTimeFilled, MdOutlineCompare } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdAllInclusive } from "react-icons/md";

export interface I_JWTPayload {
  userId: string;
  name: string;
  exp: number;
}

function App() {
  const dispatch = useAppDispatch();
  const authReducer = useAppSelector((state) => state.authReducer);

  const validateToken = () => {
    dispatch(ar_setLoading(true));
    console.log(authReducer);
    if (localStorage[APP_TOKEN_KEY]) {
      const token = localStorage[APP_TOKEN_KEY];
      const decoded: I_JWTPayload = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (currentTime <= decoded?.exp) {
        dispatch(
          ar_login({
            userId: decoded.userId,
            username: decoded.name,
          })
        );
      }
    }
    dispatch(ar_login({ userId: "", username: "" })); // Remove this line after testing
    dispatch(ar_setLoading(false));
  };

  useEffect(() => {
    validateToken();
  }, []);

  const menuItems: any = [
    {
      key: "dashboard",
      label: <Link to={`/dashboard`}>Dashboard</Link>,
      icon: <AiFillHome />,

      search: "dashboard",
      pathname: `/dashboard`,
      name: "Dashboard",
    },
    {
      key: "images",
      label: "Images",
      icon: <FaRegImages />,
      children: [
        {
          key: "images-hour",
          label: <Link to={`/images/hour-wise`}>Hour Wise</Link>,
          icon: <MdAccessTimeFilled />,

          search: "hour wise hour-wise",
          pathname: `/images/hour-wise`,
          name: "Hour Wise",
        },
        {
          key: "images-day",
          label: <Link to={`/images/day-wise`}>Day Wise</Link>,
          icon: <MdDateRange />,

          search: "day wise day-wise",
          pathname: `/images/day-wise`,
          name: "Day Wise",
        },
        {
          key: "images-custom",
          label: <Link to={`/images/custom`}>Custom</Link>,
          icon: <MdAllInclusive />,

          search: "custom",
          pathname: `/images/custom`,
          name: "Custom",
        },
        {
          key: "images-compare",
          label: <Link to={`/images/compare`}>Compare</Link>,
          icon: <MdOutlineCompare />,

          search: "compare images",
          pathname: `/images/compare`,
          name: "Compare",
        },
      ],
    },
    {
      label: "Logout",
      key: "logout",
      name: "Logout",
      search: "logout",
      icon: <BiLogOut />,
      style: { marginTop: "5px" },
      onClick: () => {
        dispatch(ar_logout());
      },
    },
  ];

  // We will have a template with navbar, sidebar, and main content
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/*
          Validate the token first.
          Till the token is being validated, show the loading screen.
          After that loading will be false, hence check if the validation is successful or not.
          If successful, then move forward.
          Else, naviate to the login page.
        */}
        <Route
          path="*"
          element={
            authReducer.authLoading ? (
              <div>Loading...</div>
            ) : authReducer.isAuthenticated ? (
              <AppLayout
                menuItems={menuItems}
                searchItems={[
                  menuItems.find((item: any) => item.key === "dashboard"),
                  ...menuItems.find((item: any) => item.key === "images")?.children,
                  menuItems.find((item: any) => item.key === "logout"),
                ]}
              />
            ) : (
              <Navigate to={`/login?next=${window.location.href}`} replace={true} state={{ from: location.pathname }} />
            )
          }
        >
          <Route path="app" element={<div>hiii</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
