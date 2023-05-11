import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { usePapaParse } from 'react-papaparse';
import FoodPage from "./routes/FoodPage";
import { FoodOfTheMonth, monthEng } from "./routes/FoodOfTheMonth";
import Layout from "./routes/Layout";

export default function App() {
  const [food, setFood] = useState([])
  const date = new Date();
  const currentMonth = date.getMonth();

  if(food.length === 0) {
    const { readRemoteFile } = usePapaParse();
    readRemoteFile("http://localhost:5173/ITALIA-fruits-and-veggies.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setFood(result.data)
      }
    });
  }

  return (
    <BrowserRouter basename={"/seasonfood"}>
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
