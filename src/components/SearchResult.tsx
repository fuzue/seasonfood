import type { FoodList, FoodObject } from "../types/food";
//import RenderFoods from "./RenderFoods";
import Item from "./Item"
import { Box, Typography, Dialog, Grid } from "@mui/material";

type Props = {
  searchResults: FoodList
  ifSearched: boolean
  closeModal: () => void
}

function SearchResult(props: Props) {
  const { searchResults, ifSearched, closeModal } = props;
 
    const foodItems = searchResults.map((item, key) => {
      return (
        <Grid item  key={key}>
          <Item key={key} {...item} />
        </Grid>
      );
    })
    const renderResults = (foodItems: JSX.Element[]) => {
      return(
        <Grid 
        spacing={3}
        padding={2}>
          {foodItems}
        </Grid>
      )
    }

  return (
    <Dialog
      open={ifSearched}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClick={closeModal}
    >
      {searchResults.length === 0 ? (
        <Box
          sx={{
            padding: "2em",
            bgColor: 'red',
          }}
        >
          <Typography variant="h6">ITEM NOT FOUND</Typography>
        </Box>
      ) : (
        <Grid>
          {renderResults(foodItems)}
        </Grid>
      )}
    </Dialog>
  );
}

export default SearchResult;
