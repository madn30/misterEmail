import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

export const routes = [
  {
    path: "/inbox",
    layout: MainLayout,
    element: lazy(() => import("./pages/EmailIndex/EmailIndex")),
  },
  {
    path: "/starred",
    layout: MainLayout,
    element: lazy(() => import("./pages/EmailIndex/EmailIndex")),
  },
  {
    path: "/sent",
    layout: MainLayout,
    element: lazy(() => import("./pages/EmailIndex/EmailIndex")),
  },
  {
    path: "/about",
    layout: MainLayout,
    element: lazy(() => import("./pages/AboutUs/AboutUs")),
  },
  {
    path: "/email-detail/:id",
    layout: MainLayout,
    element: lazy(() => import("./pages/EmailDetails/EmailDetails")),
  },
  {
    path: "*",
    layout: React.Fragment, // No specific layout needed for redirect
    element: () => <Navigate to="/inbox" replace />,
  },
];
export const createRouting = (routesArray) => (
  <Routes>
    {routesArray.map((route, index) => {
      const Layout = route.layout || React.Fragment;
      const Element = route.element;

      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <Element />
              </Suspense>
            </Layout>
          }
        />
      );
    })}
  </Routes>
);
