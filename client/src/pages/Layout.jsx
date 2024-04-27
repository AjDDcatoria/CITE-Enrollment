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
import { ProtectedLayout } from "./protected/ProtectedLayout";
import ErrorPath from "@/components/ErrorPath";
import ProtectedRoutes from "./protected/ProtectedRoutes";
import Enrollees from "@/components/Enrollees";

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
        path: "/student/:id",
        element: (
          <ProtectedRoutes>
            <Room />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/student/todo-list/:id",
        element: (
          <ProtectedRoutes>
            <TodoList />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/message/:id",
        element: (
          <ProtectedRoutes>
            <Message />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/student/enroll/:id",
        element: (
          <ProtectedRoutes>
            <Enroll />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/settings/:id",
        element: (
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: "/chair/:id",
      //   element: (
      //     <ProtectedRoutes>
      //       <DashBoard />
      //     </ProtectedRoutes>
      //   ),
      // },
      {
        path: "/chair/:id",
        element: (
          <ProtectedRoutes>
            <RequestAcc />
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: "/chair/add-subjects/:id",
      //   element: (
      //     <ProtectedRoutes>
      //       <AddSubjects />
      //     </ProtectedRoutes>
      //   ),
      // },
      {
        path: "/instructor/:id",
        element: (
          <ProtectedRoutes>
            <Room />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/enrollee/:id",
        element: (
          <ProtectedRoutes>
            <Enrollees />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/*",
        element: <ErrorPath />,
      },
    ],
  },
]);

function Layout() {
  return <RouterProvider router={router} />;
}

export default Layout;
