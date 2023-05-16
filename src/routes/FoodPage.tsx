import type { Food } from "../types/food";

import { monthEng, currentMonth } from "../utils/utils";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function FoodPage({food}: {food: Food}) {
  const { id } = useParams();
  const selectedFood = food.find((f) => f.id === id);

  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedFood) {
      return navigate("/NotFound");
    }
  })

  const seasonMonths = [] as string[]; //  months array to update the list of months in season
  let seasonStatus = ""; // status of the specific fruit or vegetable

  for (let i = 0; i < 12; i++) {
    if (selectedFood && selectedFood[`month_${i}`] === "x") {
      seasonMonths.push(monthEng[i]);
      seasonStatus = "Not in season, check below when it's best to buy it.";
      if (seasonMonths.includes(monthEng[currentMonth])) {
        seasonStatus = "Currently in season";
      }
    }
  }

  const backBtn = useNavigate();
  const image = selectedFood ? selectedFood.image.toLowerCase() : '';

  const monthColor = (month: string) => {
    if (seasonMonths.includes(month)) {
      return {
        backgroundColor: 'primary.main',
        color: 'primary.light',
        boxShadow: '3px 4px 8px #888888'
      }
    }
    else {
      return {
        color: 'gray',
        backgroundColor: 'primary.light'
      }
    }
  };
  const BackButton = styled(Button)(() => ({
    width: "5em",
    margin: "0",
    position: "absolute",
    left: "80%",
    top: "14%",
  }));

  const GridBox = styled(Box)(() => ({
    width: '6em',
    borderRadius: '6px',
    height: '2.5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const ImgBox = styled(Box)(() => ({
    objectFit: "cover",
    margin: "1em",
    width: "40%",
    maxHeight: "160px",
  }));

  const renderMonths = () => {
    return monthEng.map((month) => {
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
      );
    });
  }

  return (
    <Box
      marginX={1}
      justifyContent="space-between"
      alignItems="center">
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
        <Box
        marginLeft= '1em'
        marginTop= '0'
        display= "flex"
        flexDirection="column"
        alignItems= "left"
        justifyContent= "center"
        width="50%">
          <Typography variant="h6">
            {selectedFood ? selectedFood.nameEng : ''}:
          </Typography>
          <Typography>{seasonStatus}</Typography>
        </Box>
      </Box>

      {/* BOTTOM GRID WITH MONTHS */}
      <Box
          sx={{
            margin: '1em ',
          }}>
          <Typography marginY={2} variant="h6" > Months in season </Typography>
          <Grid container
            direction="row"
            spacing={3}
          >
            {renderMonths()}
          </Grid>
        </Box>
    </Box>
  );
}