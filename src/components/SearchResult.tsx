import type { FoodList } from "../types/food";
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
    return ( <Item key={key} {...item} />);
  })

  const renderResults = (foodItems: JSX.Element[]) => {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          maxWidth: 450,
          gap:2,
          m:2,
          justifyContent:'space-around',
        }}>
          {foodItems}
        </Box>
    )
  }

  return (
    <Dialog
      open={ifSearched}
      onClose={closeModal}
      aria-labelledby="search results"
      aria-describedby="the results of your search are shown here"
      onClick={closeModal}
    >
      {searchResults.length === 0 ? (
        <Box sx={{ p:2 }}>
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
