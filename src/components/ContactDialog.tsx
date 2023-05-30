
import { DialogTitle, DialogContent, DialogContentText, }
  from "@mui/material"

//dialog box that opens with each element clicked
export default function ContactDialog() {
  return (
    <>
      <DialogTitle id="about-dialog-title">
        {"Contact"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="about-dialog-description">
          contact
        </DialogContentText>
      </DialogContent>
    </>


  )
}