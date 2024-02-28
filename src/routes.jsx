import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts";


export const routes = [
  {
    path: "/",
    layout: MainLayout, 
    element: () => import("./pages/EmailIndex/EmailIndex"),
  },
  {
    path: "/about",
    layout: MainLayout,
    element: () => import("./pages/AboutUs/AboutUs"),
  },
];

export const createRouting = (routesArray) => (
    <Routes>
      {routesArray.map((route, index) => {
        const Layout = route.layout || React.Fragment;
        // Ensure the lazy-loaded component is directly rendered as a child of the layout
        const Element = lazy(route.element); // Adjust this if necessary to match your implementation
  
        // Use a React fragment to avoid unnecessary div wrappers, which could interfere with layout or styling
        return (
          <Route key={index} path={route.path} element={
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <Element />
              </Suspense>
            </Layout>
          }/>
        );
      })}
    </Routes>
  );
  