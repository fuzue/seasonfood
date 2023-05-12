import RenderFoods from "../components/RenderFoods";
import { ChangeEvent, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Tab, Tabs, styled, alpha } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

type FoodType = "Fruits" | "Veggies"

const monthEng = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
const currentMonth = date.getMonth();

function FoodOfTheMonth({food} : {food: Food}) {
  const { selectedMonthName } = useParams();
  const monthNum = monthEng.findIndex((month) => month === selectedMonthName);

  const monthFood = [];
  for (let i = 0; i < food.length; i++) {
    if (food[i][`month_${monthNum}`] === "x") {
      monthFood.push(food[i]);
    }
  }
  //filters the fruits and vegetables
  const filterFoodType = (monthFood: Food, foodType: FoodType) =>
    monthFood.filter((item) => item.type === foodType);
  const fruitsList = filterFoodType(monthFood, "Fruits");
  const veggiesList = filterFoodType(monthFood, "Veggies");

  //renders the fruits, veggies and others
  const RenderFruits = () => RenderFoods(fruitsList);
  const RenderVeggies = () => RenderFoods(veggiesList);

  //variables to handle the changing tabs
  const [foodType, setFoodType] = useState("Fruits" as FoodType);
  const handleChange = (event: ChangeEvent<EventTarget>, newFoodType: FoodType) => {
    setFoodType(newFoodType);
  };

  //function to render the different types according to the tab
  const changeTab = (foodType: FoodType) => {
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

export { FoodOfTheMonth, monthEng, currentMonth };
