import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { usePapaParse } from 'react-papaparse';
import {currentMonth,  monthEng } from "./utils/utils";
import FoodPage from "./routes/FoodPage";
import FoodOfTheMonth from "./routes/FoodOfTheMonth";
import Layout from "./routes/Layout";

export default function App() {
  const [food, setFood] = useState([] as Food)
  const { readRemoteFile } = usePapaParse();

  if(food.length === 0) {
    readRemoteFile("/ITALIA-fruits-and-veggies.csv", {
      download: true,
      header: true,
      complete: (result: any) => {
        setFood(result.data)
      }
    });
  }

  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
      <div className="App">
      {food.length > 0 ?
        <Routes>
          <Route
            path="/"
            element={<Layout food={food} />}>
            <Route
              index
              element={
                <Navigate to={`/month/${monthEng[currentMonth]}`} replace />
              }
            />
            <Route path="/foodpage/:id" element={<FoodPage food={food} />} />
            <Route
              path="/month/:selectedMonthName"
              element={<FoodOfTheMonth food={food} />}
            />
          </Route>
        </Routes>
      : 'not loaded'}
      </div>
    </BrowserRouter>
  );
}
