import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function NotFound() {
  const { t } = useTranslation();
  const backBtn = useNavigate();
  return (
    <Box sx={{ margin: '20px auto' }}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h5">Not Found</Typography>
      <Button variant='outlined' onClick={() => backBtn('/')}> {t('back')} </Button>
    </Box>
  )
}

