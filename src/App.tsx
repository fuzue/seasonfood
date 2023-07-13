import type { FoodList } from "./types/food";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { currentMonth } from "./utils/utils";
import fetchData from "./loadData";
import FoodOfTheMonth from "./routes/FoodOfTheMonth";
import FoodPage from "./routes/FoodPage";
import Layout from "./routes/Layout";
import { NotFound } from "./routes/NotFound";
import { useTranslation } from "react-i18next";


export default function App() {
  const [food, setFood] = useState([] as FoodList);

  const { i18n } = useTranslation();
  const lngs = {
    en: { nativeName: "English" },
    it: { nativeName: "Italiano" }
  } as { [key:string]: any}

  if (food.length === 0) fetchData(setFood, `ITALIA-fruits-and-veggies.csv`)

  return (
    food.length > 0 ?
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <div className="App">
        {Object.keys(lngs).map((lng) => (
        <button type="submit" key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>{lngs[lng].nativeName}</button>
      ))}
          <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Layout food={food} />}>
              <Route index element={<Navigate to={`/month/${currentMonth}`} replace />} />
                <Route path="/foodpage/:id" element={<FoodPage key="foodpage" food={food} />} />
                <Route path="/month/:selectedMonthNum" element={<FoodOfTheMonth food={food} />} />
              </Route>
          </Routes>
        </div>
      </BrowserRouter>
      :
      <center>not loaded</center>
  );
}
