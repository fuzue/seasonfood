import React from "react"
import food from '../ITALIA-fruits-and-veggies.csv'
import { monthEng, currentMonth } from './FoodOfTheMonth'
import { useParams, useNavigate } from "react-router-dom"
import Grid from '@mui/material/Grid'
import { Box, Typography } from "@mui/material"
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
//import Link from '@mui/material/Link'
import { Link } from "react-router-dom"
//import HelpIcon from '@mui/icons-material/Help';

function FoodPage(props) {
  let { id } = useParams()
  let selectedFood = food.find((f) => f.id === id)
  let seasonMonths = [] //  months array to update the list of months in season
  let seasonStatus = "" // status of the specific fruit or vegetable

  for (let i = 0; i < 12; i++) {
    if (selectedFood[`month_${i}`] === "x") {
      seasonMonths.push(monthEng[i])
      if (seasonMonths.includes(monthEng[currentMonth])) {
        seasonStatus = "Currently in season"
      } else {
        seasonStatus = "Not in season, check below when it's best to buy it."
      }
    }
  }

  const backBtn = useNavigate();
  let image = selectedFood.image.toLowerCase()

  const monthColor = (month) => {
    if (seasonMonths.includes(month)) {
      return {
        backgroundColor: 'primary.main',
        color: '#fff',
        boxShadow: '3px 4px 8px #888888'
      }
    }
    else {
      return { 
      color: 'gray',
      backgroundColor: '#fefefe',  
    }
    }
  }
  const BackButton = styled(Button)(({ theme }) => ({
    width: '5em',
    margin: '0',
    position: 'absolute',
    left: '80%',
    top: '14%',


  }));

  const ImgBox = styled(Box)(({ theme }) => ({
    objectFit: 'cover',
    margin: '1em',
    width: '40%',
    maxHeight: '160px',
  }));

  const GridBox = styled(Box)(({ theme }) => ({
    width: '6em',
    borderRadius: '6px',
    height: '2.5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  
  }));

  function renderMonths() {
    return monthEng.map(month => {
      return (
        <Grid item
          className="grid-item"
          xs={4}
          key={month.toString()}
        >
          <GridBox
            sx={monthColor(month)}>
            <Link to={`/month/${month}`}
            >
              {month}
            </Link>
          </GridBox>
        </Grid>
      )
    })
  }

  return (
    <Box marginX={1}
      flex
      justifyContent="space-between"
      alignItems="center">
      <div key={food.id}>
        <BackButton
          variant="outlined"
          onClick={() => backBtn(-1)}>back
        </BackButton>
        <Box
          display='flex'
          justifyContent='center'
          textAlign='left'
          marginTop='1.5em'
        >
          <ImgBox>
            <img className='foodPage-image' src={`../images/${image}.png`} alt={`photo of ${image}`} />
          </ImgBox>
          <div className="season-status">
            <span className='season-status-title'>
              {/*  <Link target="_blank" href={`https://en.wikipedia.org/wiki/${selectedFood.nameEng}`}>
                <img className="wiki-logo" src="../wiki-logo.png" />
              </Link> */}
              <h3>{selectedFood.nameEng}:</h3>
            </span>
            <p>{seasonStatus}</p>
          </div>
        </Box>
        {/* BOTTOM GRID WITH MONTHS */}
        <Box
          sx={{
            margin: '1em ',
          }}>
          <Typography marginY={2} variant="h6" > Months in season </Typography>
          <Grid className="grid-container" container
            direction="row"
            spacing={3}
          >
            {renderMonths()}
          </Grid>
        </Box>
      </div>
    </Box>
  )
}

export default FoodPage
