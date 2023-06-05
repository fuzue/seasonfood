import { Box, Select, FormControl, InputLabel, MenuItem, SelectChangeEvent, Typography, Button, styled } from "@mui/material";
import { useState } from "react";

const countries = [
  {'ITA': {
    country: 'Italy',
    language: 'Italian'
  }},
  {'BRA': {
    country: 'Brazil',
    language: 'Portuguese'
  }},
  {'POR': {
    country: 'Portugal',
    language: 'Portuguese'
  }},
]


export default function ChooseCountry() {
  const [country, setCountry] = useState('');
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const [language, setLanguage] = useState('ENG');
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  }

  const GoButton = styled(Button)(() => ({
    backgroundColor: '#13bf8d',
    color: '#fff',
    margin: '2em',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#13bf8d',
    }
   
  }));

   const languageSelect = () => {
    return (
      <Box sx={{ my: '1em'}}>
        <Typography variant="h6" sx={{mb:'1em'}}> Please select a language</Typography>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select variant="outlined"
            sx={{ textAlign: 'start', pl: 1}}
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" >Country</InputLabel>
          <Select
            sx={{ textAlign: 'start', pl: 1, borderColor: 'red'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="Country"
            onChange={handleCountryChange}
          >
            <MenuItem value={'ITA'}>Italy</MenuItem>
            <MenuItem value={'BRA'}>Brazil</MenuItem>
            <MenuItem value={'POR'}>Portugal</MenuItem>
          </Select>

        </FormControl>
        {languageSelect()}
        <GoButton variant="contained"
        
        > Go
        </GoButton>
      </Box>
    </Box>
  )
}