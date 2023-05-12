import { monthEng, currentMonth } from "./FoodOfTheMonth";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

function FoodPage({food}: {food: Food}) {
  const { id } = useParams();
  const selectedFood = food.find((f) => f.id === id);
  const seasonMonths = [] as string[]; //  months array to update the list of months in season
  let seasonStatus = ""; // status of the specific fruit or vegetable

  for (let i = 0; i < 12; i++) {
    if (selectedFood[`month_${i}`] === "x") {
      seasonMonths.push(monthEng[i]);
      if (seasonMonths.includes(monthEng[currentMonth])) {
        seasonStatus = "Currently in season";
      } else {
        seasonStatus = "Not in season, check below when it's best to buy it.";
      }
    }
  }

  const backBtn = useNavigate();
  const image = selectedFood.image.toLowerCase();

  const monthColor = (month: string) => {
    if (seasonMonths.includes(month)) {
      return {
        backgroundColor: "primary.main",
        color: "#fff",
        boxShadow: "3px 4px 8px #888888",
      };
    } else {
      return { color: "gray" };
    }
  };
  const BackButton = styled(Button)(() => ({
    width: "5em",
    margin: "0",
    position: "absolute",
    left: "80%",
    top: "14%",
  }));

  const StyledButton = styled(Button)(() => ({
    width: "7.1em",
    borderRadius: "6px",
    margin: " 0.5em 0.25em",
    "&:hover": {
      backgroundColor: "rgba(19, 191, 142, 0.711)",
      color: "rgba(4, 44, 33, 0.711)",
    },
  }));

  const ImgBox = styled(Box)(() => ({
    objectFit: "cover",
    margin: "1em",
    width: "40%",
    maxHeight: "160px",
  }));

  function renderMonths() {
    return monthEng.map((month) => {
      return (
        <Grid item className="grid-item" xs={4} key={month.toString()}>
          <Link to={`/month/${month}`}>
            <StyledButton sx={monthColor(month)} size="medium">
              {month}
            </StyledButton>
          </Link>
        </Grid>
      );
    });
  }

  return (
    <Box marginX={1} justifyContent="space-between" alignItems="center">
      <div>
        <BackButton variant="outlined" onClick={() => backBtn(-1)}>
          back
        </BackButton>
        <Box
          display="flex"
          justifyContent="center"
          textAlign="left"
          marginTop="1.5em;"
        >
          <ImgBox>
            <img
              className="foodPage-image"
              src={`../images/${image}.png`}
              alt={`photo of ${image}`}
            />
          </ImgBox>
          <div className="season-status">
            <span className="season-status-title">
              {/*  <Link target="_blank" href={`https://en.wikipedia.org/wiki/${selectedFood.nameEng}`}>
                <img className="wiki-logo" src="../wiki-logo.png" />
              </Link> */}
              <h3>{selectedFood.nameEng}:</h3>
            </span>
            <p>{seasonStatus}</p>
          </div>
        </Box>
        <Box>
          <h4 className="months-in-season-title"> Months in season </h4>
          <Box justifyContent="space-between" alignItems="center">
            <Grid
              className="grid-container"
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {renderMonths()}
            </Grid>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default FoodPage;
