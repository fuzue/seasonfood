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

/* 
export function Fallback() {
  return <p>HELLO</p>;
}

export function RootErrorBoundary() {
  let error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/")}>
        Click here to reload the app
      </button>
    </div>
  );
} 

  let error = useRouteError();
  console.log(error)

  // We only care to handle 401's at this level, so if this is not a 401
  // ErrorResponse, re-throw to let the RootErrorBoundary handle it
  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error;
  } */