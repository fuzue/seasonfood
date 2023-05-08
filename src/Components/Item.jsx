import { Link } from "react-router-dom"
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Typography from "@mui/material/Typography";


const ImgBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  width: '6em',
  boxShadow: '3px 4px 8px #888888',
  textAlign: 'center',
  [theme.breakpoints.down('xs')]: {
    width: '115px',
  },
}));

function Item(props) {
  let image = props.image.toLowerCase()
  return (
    <Link to={`/foodpage/${props.id}`}>
      <ImgBox>
        <img className="food-image" src={`../images/${image}.png`} alt={`image of ${image}`} />
        <Typography sx={{ paddingBottom: '0.25em' }}>
          {props.nameEng}
        </Typography>
      </ImgBox>
    </Link>
  )
}

export default Item

