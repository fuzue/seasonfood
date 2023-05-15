import type { Food, FoodDescription, FoodObject } from "./types/food";

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { usePapaParse } from "react-papaparse";
import { currentMonth, monthEng } from "./utils/utils";
import FoodPage from "./routes/FoodPage";
import FoodOfTheMonth from "./routes/FoodOfTheMonth";
import Layout from "./routes/Layout";

export default function App() {
  const [food, setFood] = useState([] as Food);

  const { readRemoteFile } = usePapaParse();

  if (food.length === 0) {
    readRemoteFile(
      `${location.origin}${
        import.meta.env.BASE_URL
      }/ITALIA-fruits-and-veggies.csv`,
      {
        download: true,
        header: true,
        complete: (result: any) => {
          normalizeData(result.data);
        },
      }
    );
  }

  const normalizeData = (data: { [key: string]: string }[]) => {
    const foodArray = [] as Food;
    const months = Object.keys(data[0]).filter(key => key.includes('month_'))
    const langs = Object.keys(data[0]).filter(key => key.includes('name'))

    const getMonths = (line: {[key: string]: string}) => {
      const monthsInfo = [] as boolean[]
      Object.keys(line).forEach(key => {
        if(months.includes(key)) monthsInfo.push(line[key] === 'x');
      })
      return monthsInfo
    }

    const getDescription = (line: {[key: string]: string}) => {
      const langsInfo = [] as FoodDescription[]
      Object.keys(line).forEach(key => {
        if(langs.includes(key)) langsInfo.push({
          lang: key.replace('name',''),
          name: line[key],
          slug: line[key]
                  .toLowerCase()
                  .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
                  .replace(/^\s+|\s+$/gm,'')
                  .replace(/\s+/g, '-')
        })
      })
      return langsInfo;
    }

    data.forEach((line) => {
      const parsedFood = {} as FoodObject;
      parsedFood.category = line.category;
      parsedFood.image = line.image;
      parsedFood.season = getMonths(line);
      parsedFood.description = getDescription(line);
      foodArray.push(parsedFood)
    });

    if(food.length === 0) setFood(foodArray)
  };

  return (
    <BrowserRouter basename={"/seasonfood"}>
      <div className="App">
        {food.length > 0 ? (
          <Routes>
            <Route path="/" element={<Layout food={food} />}>
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
        ) : (
          "not loaded"
        )}
      </div>
    </BrowserRouter>
  );
}
