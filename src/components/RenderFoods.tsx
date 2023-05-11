import Item from "./Item";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "0.25em",
}));

//render the grid of foods
function RenderFoods(foodList) {
  const foodItems = foodList.map((item) => {
    return (
      <Grid item xs={4} key={item.id}>
        <Item key={item.id} {...item} />
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
