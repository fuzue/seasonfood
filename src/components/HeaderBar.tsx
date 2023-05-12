import { useRef, useEffect } from "react";
import {
  AppBar,
  styled,
  alpha,
  Toolbar,
  IconButton,
  Typography,
  InputBase
}  from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  ifSearched: boolean
  food: Food
  onSearch: (query: string, food: Food) => void
  toggleDrawer: () => void
}

export default function HeaderBar(props: Props) {
  const query = useRef() as React.MutableRefObject<HTMLFormElement>;

  useEffect(() => {
    if (props.ifSearched === false) {
      query.current.value = "";
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const foundFoods = searchFilterFood(props.food);
    props.onSearch(query.current.value, foundFoods);
    event.preventDefault();
  };

  const searchFilterFood = (food: Food) => {
    if (query.current.value === "") {
      return food;
    }
    return food.filter((item) => {
      return item.nameEng
        .toLowerCase()
        .includes(query.current.value.trim().toLowerCase());
    });
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "8em",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,

      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const StyledAppBar = styled(AppBar)(() => ({
    borderRadius: "2%",
    background: "#13bf8d",
    marginTop: "0",
  }));

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ height: "62px" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          In season in Italy
        </Typography>
        <Search>
          <SearchIconWrapper>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <SearchIcon type="submit" />
            </IconButton>
          </SearchIconWrapper>
          <form onSubmit={e => handleSubmit(e)}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              inputRef={query}
              id="search-bar"
            />
          </form>
        </Search>
      </Toolbar>
    </StyledAppBar>
  );
}
