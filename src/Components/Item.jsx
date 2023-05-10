import { Link } from "react-router-dom"
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import Typography from "@mui/material/Typography";


const ImgGrid = styled(Grid)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: '3px 4px 8px #888888',
  textAlign: 'center',
/*   [theme.breakpoints.down('xs')]: {
    width: '115px',
  }, */
  [theme.breakpoints.up('md')]: {
   
  },
}));

function Item(props) {
  let image = props.image.toLowerCase()
  return (
    <Link to={`/foodpage/${props.id}`}>
      <ImgGrid item xs={10}>
        <img className="food-image" src={`../images/${image}.png`} alt={`image of ${image}`} />
        <Typography sx={{ paddingBottom: '0.25em' }}>
          {props.nameEng}
        </Typography>
      </ImgGrid>
    </Link>
  )
}

export default Item

