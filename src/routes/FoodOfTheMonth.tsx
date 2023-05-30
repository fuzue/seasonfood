import type { FoodList, FoodCategory, FoodObject } from "../types/food";
import { ChangeEvent, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Tab, Tabs, styled, alpha } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import RenderFoods from "../components/RenderFoods";
import { monthEng } from "../utils/utils";

export default function FoodOfTheMonth({food} : {food: FoodList}) {
  const { selectedMonthName } = useParams();

  const monthNum = monthEng.findIndex((month) => month === selectedMonthName);

  const navigate = useNavigate();
  useEffect(() => {
    if(monthNum < 0 || monthNum > 11) {
      return navigate("/NotFound");
    }
  })

  const monthFood = [] as FoodObject[];
  food.forEach(item => {
    if(item.season[monthNum] === true) monthFood.push(item);
  })

  //filters the fruits and vegetables
  const filterFoodType = (monthFood: FoodList, foodCategory: FoodCategory) =>
    monthFood.filter((item) => item.category === foodCategory);
  const fruitsList = filterFoodType(monthFood, "Fruits");
  const veggiesList = filterFoodType(monthFood, "Veggies");

  //renders the fruits, veggies and others
  const RenderFruits = () => RenderFoods(fruitsList);
  const RenderVeggies = () => RenderFoods(veggiesList);

  //variables to handle the changing tabs
  const [foodType, setFoodType] = useState("Fruits" as FoodCategory);
  const handleChange = (event: ChangeEvent<EventTarget>, newFoodCategory: FoodCategory) => {
    setFoodType(newFoodCategory);
  };

  //function to render the different types according to the tab
  const changeTab = (foodType: FoodCategory) => {
    switch (foodType) {
      case "Fruits":
        return <RenderFruits />;
      case "Veggies":
        return <RenderVeggies />;
    }
  };

  //variables to change month when pressing the arrows
  const prevMonth = monthEng[monthNum != 0 ? monthNum - 1 : 11];
  const nextMonth = monthEng[monthNum != 11 ? monthNum + 1 : 0];

  //styled MUI arrows
  const ArrowButton = styled(Link)(({ theme }) => ({
    color: alpha(theme.palette.common.black, 0.75),
    width: "2em",
    "&:hover": {
      color: alpha(theme.palette.common.black, 0.95),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const ItemsBox = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    margin: "0",
    display: "flex",
  }));
  return (
    <Box>
      <div className="month-container">
        <div className="selected-month">
          <ArrowButton to={`/month/${prevMonth}`}>
            <ArrowLeft />
          </ArrowButton>
          <div className="month-title">
            <h4>{monthEng[monthNum]}</h4>
          </div>
          <ArrowButton to={`/month/${nextMonth}`}>
            <ArrowRight />
          </ArrowButton>
        </div>
        <p className="food-counter-text">
          {fruitsList.length} fruits and {veggiesList.length} vegetables in
          season this month
        </p>
        <div className="button-wrapper">
          <Tabs
            value={foodType}
            onChange={(e, value) => handleChange(e, value)}
            sx={{ fontWeight: 700 }}
            aria-label="tabs for the selection of fruits, vegetables or others"
          >
            <Tab label="Fruits" value="Fruits" />
            <Tab label="Veggies" value="Veggies" />
          </Tabs>
        </div>
        <ItemsBox>{changeTab(foodType)}</ItemsBox>
      </div>
    </Box>
  );
}
