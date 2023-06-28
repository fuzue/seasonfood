import { Box, Select, FormControl, InputLabel, MenuItem, SelectChangeEvent, Typography, Button, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const countriesList = [
  {
    id: 'ITA',
    name: 'Italy',
    language: 'Italian'
  }
  ,
  {
    id: 'BRA',
    name: 'Brazil',
    language: 'Portuguese'
  }
  ,
  {
    id: 'POR',
    name: 'Portugal',
    language: 'Portuguese'
  }
]


export default function ChooseCountry() {
  const [country, setCountry] = useState('');
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const [language, setLanguage] = useState('ENG');
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };
  let navigate = useNavigate()
  const handleSubmit = () => {
    let path = `/`;
    navigate(path);
  };
  const GoButton = styled(Button)(() => ({
    backgroundColor: '#13bf8d',
    color: '#fff',
    margin: '2em auto',
    width: '5em',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#13bf8d',
    }
  }));

  const renderCountries =
    countriesList.map((item, id) => {
      return <MenuItem value={id} key={id}>{item.name}</MenuItem>
    })

  const languageSelect = () => {
    return (
      <Box sx={{ my: '1em' }}>
        <Typography variant="h6" sx={{ mb: '1em' }}> Please select a language</Typography>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select variant="outlined"
            sx={{ textAlign: 'start', pl: 1 }}
            labelId="language-select-label"
            id="language-select-label"
            value={language}
            label="Language"
            onChange={handleLanguageChange}
          >
            <MenuItem value={'ENG'}>English</MenuItem>
            <MenuItem value={'ITA'}>Italian</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
  }

  return (
    <Box sx={{ margin: '2em auto', width: '20em' }}>
      <Typography variant="h6"> Please select a country</Typography>
      <Box sx={{ margin: '2em' }}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label" >Country</InputLabel>
          <Select
            sx={{ textAlign: 'start', pl: 1, borderColor: 'red' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="Country"
            onChange={handleCountryChange}
          >
            {renderCountries}
            {/* <MenuItem value={'ITA'}>Italy</MenuItem>
            <MenuItem value={'BRA'}>Brazil</MenuItem>
            <MenuItem value={'POR'}>Portugal</MenuItem> */}
          </Select>
          {languageSelect()}
          <GoButton variant="contained"
            onClick={() => handleSubmit()}
          >Go
          </GoButton>
        </FormControl>

      </Box>
    </Box>
  )
}