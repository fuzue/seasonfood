import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoodPage from './Components/FoodPage';
import Layout from './Components/Layout';
import { FoodOfTheMonth } from './Components/FoodOfTheMonth';
import { Navigate } from 'react-router-dom';
import {monthEng} from './Components/FoodOfTheMonth'



function App() {
  const date = new Date()
  const currentMonth = date.getMonth()

  return (
    <BrowserRouter basename={"/seasonfood"}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to={`/month/${monthEng[currentMonth]}`} replace />} />
            <Route path="/foodpage/:id" element={<FoodPage />}/>
            <Route path="/month/:selectedMonthName" element={<FoodOfTheMonth />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

