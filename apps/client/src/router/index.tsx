import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";



import { BuilderLayout } from "../pages/builder/layout";
import { BuilderPage } from "../pages/builder/page";
import { builderLoader } from "../pages/builder/page";
import { DashboardLayout } from "../pages/dashboard/layout";
import { ResumesPage } from "../pages/dashboard/resumes/page";


import { publicLoader, PublicResumePage } from "../pages/public/page";
import { Providers } from "../providers";
import { AuthGuard } from "./guards/auth";


export const routes = createRoutesFromElements(
  <Route element={<Providers />}>




    <Route path="dashboard">
   
        <Route element={<DashboardLayout />}>
          <Route path="resumes" element={<ResumesPage />} />
      

          <Route index element={<Navigate to="/dashboard/resumes" replace />} />
        </Route>
  
    </Route>

    <Route path="builder">

        <Route element={<BuilderLayout />}>
          <Route path=":id" loader={builderLoader} element={<BuilderPage />} />

          <Route index element={<Navigate to="/dashboard/resumes" replace />} />
        </Route>
      </Route>


    {/* Public Routes */}
    <Route path=":username">
      <Route path=":slug" loader={publicLoader} element={<PublicResumePage />} />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
