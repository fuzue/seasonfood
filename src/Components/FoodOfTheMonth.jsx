import RenderFoods from './RenderFoods'
import { useState } from 'react'
import food from '../ITALIA-fruits-and-veggies.csv'
import { useParams, Link } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box } from "@mui/material"
import { styled, alpha } from '@mui/material/styles'
import ArrowLeftIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import ArrowRightIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const monthEng = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const date = new Date()
const currentMonth = date.getMonth()

function FoodOfTheMonth() {
  const { selectedMonthName } = useParams()
  const monthNum = monthEng.findIndex((month) => month === selectedMonthName)

  let monthFood = []
  for (let i = 0; i < food.length; i++) {
    if (food[i][`month_${monthNum}`] === "x") {
      monthFood.push(food[i])
    }
  }
  //filters the fruits and vegetables
  let filterFoodType = (monthFood, foodType) => monthFood.filter((item) => item.type === foodType)
  const fruitsList = filterFoodType(monthFood, 'Fruits')
  const veggiesList = filterFoodType(monthFood, 'Veggies')
  //const othersList = filterFoodType(monthFood, 'Other')

  //renders the fruits, veggies and others
  const RenderFruits = () => RenderFoods(fruitsList)
  const RenderVeggies = () => RenderFoods(veggiesList)
  //const RenderOthers = () => RenderFoods(othersList)
  
  //variables to handle the changint tabs
  const [value, setValue] = useState('Fruits')
  const handleChange = (event, newValue) => {setValue(newValue)}
  
  //function to render the different types according to the tab
  const changeTab = (value) => {
    switch (value) {
      case "Fruits":
        return <RenderFruits />
      case "Veggies":
        return <RenderVeggies />
      /* case "Others":
        return  <RenderOthers />*/
        //temporary image 
    }
  }

  //variables to change month when pressing the arrows
  const prevMonth = monthEng[monthNum != 0 ? monthNum - 1 : 11]
  const nextMonth = monthEng[monthNum != 11 ? monthNum + 1 : 0]

  //styled MUI arrows
  const ArrowButton = styled(Link)(({ theme }) => ({
    color:  alpha(theme.palette.common.black, 0.75),
    width: '2em', 
    '&:hover': {
      color: alpha(theme.palette.common.black, 0.95),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const ItemsBox = styled(Box)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    margin: '0',
    display: 'flex',  
  }))

  return (
    <Box >
      <div className="month-container">
        <div className="selected-month">
          <ArrowButton to={`/month/${prevMonth}`}>
            <ArrowLeftIcon/>
          </ArrowButton>
          <div className="month-title"> 
            <h4 >{monthEng[monthNum]}</h4> 
          </div>
          <ArrowButton to={`/month/${nextMonth}`}>
            <ArrowRightIcon/>
          </ArrowButton>
        </div>
        <p className="food-counter-text">{fruitsList.length} fruits and {veggiesList.length} vegetables in season this month</p>
        <div className='button-wrapper'>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ fontWeight: 700}}
            aria-label="tabs for the selection of fruits, vegetables or others">
            <Tab label="Fruits" value="Fruits" />
            <Tab label="Veggies" value="Veggies" />
            {/* <Tab label="Others" value="Others"  /> */}
          </Tabs>
        </div>
        <ItemsBox> 
        {changeTab(value)}
        </ItemsBox>
        
      </div>
    </Box>
  );
}

export { FoodOfTheMonth, monthEng, currentMonth }
