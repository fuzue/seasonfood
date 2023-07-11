import type { FoodList } from "../types/food";
import { Outlet } from "react-router-dom";
import {  useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SearchResult from "../components/SearchResult";
import SideBarDialog from "../components/SideBarDialog"

/* MUI IMPORTS */
import {
  createTheme, styled, Box, Drawer, ListItemButton,
  ListItem, ThemeProvider, Typography
} from "@mui/material";


//BASIC MUI COLORS AND BREAKPOINTS
const theme = createTheme({
  palette: {
    primary: {
      main: "#13bf8d",
      light: "#f4fbeb",
      dark: "#555766",
    },
    secondary: {
      main: "#ff7664", //red
      dark: "#4071d8", //blue
    },
  },
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Layout({ food }: { food: FoodList }) {
  const MainBox = styled(Box)(() => ({
    width: "100%",
    maxWidth: "450px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    paddingBottom: "1em",
    minHeight: "100%",
    boxShadow: "3px 4px 8px #888888",
  }));

  //search bar code
  const [ifSearched, setIfSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([] as FoodList);
  const closeModal = () => setIfSearched(false);

  const onSearch = (query: string, food: FoodList) => {
    if (query != "") {
      setIfSearched(true);
      setSearchResults(food);
    }
  };

  // open side bar code
  const [state, setState] = useState(false);
  const toggleDrawer = () => setState(!state);

  const sideBarList = (
    <Box
      sx={{
        width: 250,
        textTransform: "uppercase",
        color: "#3e3e3e",
        fontWeight: "bold",
      }}
      role="presentation"
      onClick={toggleDrawer}
    >
      <nav>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClickOpen('about')}>
            <Typography variant="button" display="block" gutterBottom>
              about the app
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClickOpen('contribute')}>
            <Typography variant="button" display="block" gutterBottom>
              contribute
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClickOpen('contact')}>
            <Typography variant="button" display="block" gutterBottom>
              contact us
            </Typography>
          </ListItemButton>
        </ListItem>
      </nav>
    </Box>
  );

  //Side bar dialog code that opens with each element clicked
  const [open, setOpen] = useState(false)
  const [dialogType, setDialogType] = useState('')

  const handleClose = () => setOpen(false);
  const handleClickOpen = (itemClickedName:string) => {
    setOpen(true);
    setDialogType(itemClickedName);
  }

  return (
    <ThemeProvider theme={theme}>
      <MainBox bgcolor="primary.white" className="main-container">
        <Drawer open={state} onClose={toggleDrawer}>
          {sideBarList}
        </Drawer>
        <div className="main-layout">
          <HeaderBar
            onSearch={onSearch}
            toggleDrawer={toggleDrawer}
            food={food}
            ifSearched={ifSearched}
          />
          {ifSearched ? (
            <SearchResult
              searchResults={searchResults}
              ifSearched={ifSearched}
              closeModal={closeModal}
            />
          ) : null}
          <SideBarDialog open={open} dialogType={dialogType} handleClose={handleClose} />

          <Outlet />
        </div>
      </MainBox>
    </ThemeProvider>
  );
}

export default Layout;
