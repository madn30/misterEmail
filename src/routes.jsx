import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmailIndex from "./pages/EmailIndex/EmailIndex";
import EmailCompose from "./components/Emails/EmailCompose/EmailCompose";
import EmailDetails from "./pages/EmailDetails/EmailDetails";
import MainLayout from "./layouts/MainLayout";

export const routes = [
  {
    path: "/mail",
    element: <MainLayout />,
    children: [
      {
        path: ":folder?",
        element: <EmailIndex />,
      },

      {
        path: ":folder/:id",
        element: <EmailDetails />,
      },
    ],
  },
  { path: "*", element: <Navigate to="/mail/inbox" replace /> },
];

export const createRouting = (routes) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((childRoute, childIndex) => (
              <Route
                key={childIndex}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
        </Route>
      ))}
    </Routes>
  </Suspense>
);
