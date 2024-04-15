import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./AuthPage";
import Room from "@/components/Room";
import TodoList from "@/components/TodoList";
import Message from "@/components/Message";
import Enroll from "@/components/Enroll";
import Settings from "@/components/Settings";
import { SideBarContextProvider } from "@/context/sideBarContext";
import DashBoard from "@/components/DashBoard";
import RequestAcc from "@/components/RequestAcc";
import AddSubjects from "@/components/AddSubjects";
import UserPanel from "./UserPanel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <SideBarContextProvider>
        <UserPanel />
      </SideBarContextProvider>
    ),
    children: [
      {
        path: "/student",
        element: <Room />,
      },
      {
        path: "/student/todo-list/:id",
        element: <TodoList />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/student/enroll",
        element: <Enroll />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/admin",
        element: <DashBoard />,
      },
      {
        path: "/admin/request-accounts",
        element: <RequestAcc />,
      },
      {
        path: "/admin/add-subjects",
        element: <AddSubjects />,
      },
      {
        path: "/instructor",
        element: <Room />,
      },
    ],
  },
]);

function Layout() {
  return <RouterProvider router={router} />;
}

export default Layout;
