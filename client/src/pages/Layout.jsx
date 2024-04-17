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
import { ProtectedLayout } from "./protected/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedLayout>
        <SideBarContextProvider>
          <UserPanel />
        </SideBarContextProvider>
      </ProtectedLayout>
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
        path: "/message/:id",
        element: <Message />,
      },
      {
        path: "/student/enroll",
        element: <Enroll />,
      },
      {
        path: "/settings/:id",
        element: <Settings />,
      },
      {
        path: "/chair/:id",
        element: (
          <ProtectedLayout>
            <DashBoard />
          </ProtectedLayout>
        ),
      },
      {
        path: "/chair/request-accounts/:id",
        element: <RequestAcc />,
      },
      {
        path: "/chair/add-subjects/:id",
        element: <AddSubjects />,
      },
      {
        path: "/instructor/:id",
        element: <Room />,
      },
    ],
  },
]);

function Layout() {
  return <RouterProvider router={router} />;
}

export default Layout;
