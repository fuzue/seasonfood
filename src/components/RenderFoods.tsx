import type { FoodList } from "../types/food";
import Item from "./Item";
import { Grid, styled } from "@mui/material";

const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "0.25em",
}));

//render the grid of foods
function RenderFoods(foodList: FoodList) {
  const foodItems = foodList.map((item, key) => {
    return (
      <Grid item xs={4} key={key}>
        <Item key={key} {...item} />
      </Grid>
    );
  });
  return (
    <StyledGrid container spacing={2}>
      {foodItems}
    </StyledGrid>
  );
}

export default RenderFoods;
