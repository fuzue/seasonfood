import RenderFoods from "./RenderFoods";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function SearchResult(props) {
  const { searchResults, ifSearched, closeModal } = props;

  const location = useLocation();

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
          }}
        >
          <Typography variant="h6">ITEM NOT FOUND</Typography>
        </Box>
      ) : (
        RenderFoods(searchResults)
      )}
    </Dialog>
  );
}

export default SearchResult;
