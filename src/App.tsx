import type { Food } from "./types/food";

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { usePapaParse } from 'react-papaparse';
import { currentMonth, monthEng } from "./utils/utils";
import FoodPage from "./routes/FoodPage";
import FoodOfTheMonth from "./routes/FoodOfTheMonth";
import Layout from "./routes/Layout";
import { NotFound } from "./routes/NotFound";

export default function App() {
  const [food, setFood] = useState([] as Food)

  const { readRemoteFile } = usePapaParse();

  if (food.length === 0) {
    readRemoteFile("http://localhost:5173/ITALIA-fruits-and-veggies.csv", {
      download: true,
      header: true,
      complete: (result: any) => {
        setFood(result.data)
      }
    });
  }

  return (
    <BrowserRouter basename={"/seasonfood"}>
      <div className="App">
        {food.length > 0 ?
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Layout food={food} />}>
            <Route index element={<Navigate to={`/month/${monthEng[currentMonth]}`} replace />} />
            <Route path="/foodpage/:id" element={<FoodPage key="foodpage"  food={food} />} />
            <Route path="/month/:selectedMonthName" element={<FoodOfTheMonth food={food} />} />
          </Route>
        </Routes>
         : 'not loaded'}
      </div>
    </BrowserRouter>
  );
}

/* 
let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            path: "projects/:projectId",
            element: <Project />,
            errorElement: <ProjectErrorBoundary />,
            loader: projectLoader,
          },
        ],
      },
    ],
  },
]); */