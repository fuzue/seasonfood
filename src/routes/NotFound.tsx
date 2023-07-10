import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const backBtn = useNavigate();
  return (
    <Box sx={{ margin: '20px auto' }}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h5">Not Found</Typography>
      <Button variant='outlined' onClick={() => backBtn('/')}> Back  </Button>
    </Box>
  )
}

