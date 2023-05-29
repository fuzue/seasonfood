import type { FoodList } from "../types/food";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SearchResult from "../components/SearchResult";

/* MUI IMPORTS */
import {
  createTheme, styled, Box, Drawer, ListItemButton,
  ListItem, ThemeProvider, Typography, Button,
  Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
} from "@mui/material";

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
  const [ifSearched, setIfSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([] as FoodList);

  const closeModal = () => setIfSearched(false);

  const onSearch = (query: string, food: FoodList) => {
    if (query != "") {
      setIfSearched(true);
      setSearchResults(food);
    }
  };

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

  // open side drawer code
  const [state, setState] = useState(false);
  const toggleDrawer = () => {
    setState(!state);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    console.log('click works')
  };
  const handleClose = () => {
    setOpen(false)
  };
  //dialog box that opens with each element clicked
  function SimpleDialog() {
    return (
      <Dialog open={open}
        onClose={handleClose}
        aria-labelledby="about"
        aria-describedby="about the app"
      >
        <DialogTitle id="drawer-dialog-title">
          {"About the app"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This project came from a personal doubt: I had recently moved to Italy and didn't know when I could find fruits and vegetables I like in the supermarket, when each food was in season. After looking for sources of it, and finding very hard to read tables, I decided to build my own app to do it.

            The idea was to create it as a scalable project, so it is simple to change the database to another country, or region.

            It is also an objective of this app to encourage local the consumption of local produce - that was also a thing I noticed here in Italy: here many products publicize the region they are from, I believe that it is caused by the strong regionalism that exists in Italy. There are many products that read: "cheese from Piedmont", "oranges from Sicily" or "Olive oil from Liguria". That really motivated and boosted me look for more information about local produce and to consume fruits and vegetables from local producers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  const list = (
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
          <ListItemButton onClick={handleClickOpen}>
            <Typography variant="button" display="block" gutterBottom>
              about the app
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography variant="button" display="block" gutterBottom>
              contribute
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography variant="button" display="block" gutterBottom>
              contact us
            </Typography>
          </ListItemButton>
        </ListItem>
      </nav>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <MainBox bgcolor="primary.white" className="main-container">
        <Drawer open={state} onClose={toggleDrawer}>
          {list}
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

          {open ? <SimpleDialog /> : null}
          <Outlet />
        </div>
      </MainBox>
    </ThemeProvider>
  );
}

export default Layout;
