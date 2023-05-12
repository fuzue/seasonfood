import { Outlet } from "react-router-dom";
import { useState } from "react";
import AppBar from "../components/AppBar";
import SearchResult from "../components/SearchResult";

/* MUI IMPORTS */
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#13bf8d",
      light: "#f4fbeb",
      dark: "#555766"
    },
    secondary: {
      main: "#ff7664", //red
      dark: "#4071d8"
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

function Layout({food} : {food: Food}) {
  const [ifSearched, setIfSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const closeModal = () => setIfSearched(false);
  const openModal = () => setIfSearched(true);

  const onSearch = (query: string, food: Food) => {
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

  //side drawer code
  const [state, setState] = useState(false);

  const toggleDrawer = () => {
    setState(!state);
  };

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
          <ListItemButton>
            <ListItemText primary="about the app" />
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
            <ListItemText primary="contact" />
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
          <AppBar
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
              openModal={openModal}
            />
          ) : null}
          <Outlet />
        </div>
      </MainBox>
    </ThemeProvider>
  );
}

export default Layout;
