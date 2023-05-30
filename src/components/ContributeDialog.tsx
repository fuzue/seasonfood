
import { DialogTitle, DialogContent, DialogContentText, }
  from "@mui/material"

//dialog box that opens with each element clicked
export default function ContributeDialog() {
  return (
    <>
      <DialogTitle id="about-dialog-title">
        {"Contribute"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="about-dialog-description">
          contribute
        </DialogContentText>
      </DialogContent>
    </>


  )
}