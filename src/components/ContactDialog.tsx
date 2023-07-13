
import { DialogTitle, DialogContent, DialogContentText, Link, Typography }
  from "@mui/material"

//dialog box that opens with each element clicked
export default function ContactDialog() {
  return (
    <>
      <DialogTitle id="contact-dialog-title">
        {"Contact"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="contact-dialog-description">
          You can talk to us via email and/or check our repository in github.
          <p>
          <Typography variant="subtitle2" gutterBottom>contact@fuzue.site</Typography>
          <Link underline="hover" href="https://github.com/fuzue/seasonfood" target="_blank"> <Typography variant="subtitle2" gutterBottom>Github</Typography></Link>
          </p>
        </DialogContentText>
      </DialogContent>
    </>


  )
}