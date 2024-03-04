import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";


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
  {
    path: "/email-detail/:id",
    layout: MainLayout,
    element: () => import("./pages/EmailDetails/EmailDetails"),
  },
];

export const createRouting = (routesArray) => (
    <Routes>
      {routesArray.map((route, index) => {
        const Layout = route.layout || React.Fragment;
        const Element = lazy(route.element); 
  
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
  