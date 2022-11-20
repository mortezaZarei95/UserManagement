import React, { ReactNode } from "react";
import AddUserPage from "screens/AddUserPage";
import CheckUserPage from "screens/CheckUserPage";
import EditUserPage from "screens/EditUserPage";

const UserListPage: React.FC = React.lazy(
  () => import("../screens/UserListPage")
);

interface IRoute {
  path: string;
  element: ReactNode;
  subRoute: TRouteList;
}

type TRouteList = IRoute[];

const routeList: TRouteList = [
  {
    path: "/",
    element: <UserListPage />,
    subRoute: [],
  },
  {
    path: "/check-user/:id",
    element: <CheckUserPage />,
    subRoute: [],
  },
  {
    path: "/add-user",
    element: <AddUserPage />,
    subRoute: [],
  },
  {
    path: "/edit-user/:id",
    element: <EditUserPage />,
    subRoute: [],
  },
];
export default routeList;
