
import { DialogTitle, DialogContent, DialogContentText, }
  from "@mui/material"

//dialog box that opens with each element clicked
export default function AboutDialog() {
  return (
    <>
      <DialogTitle id="about-dialog-title">
        {"About the app"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="about-dialog-description">
          <p>This is a project that was built on a genuine difficulty: to know when fruits and vegetables  are available in a new country or region. After looking for solutions, and information, everything was not intuitive, or did not do something I wanted.  </p>

          <p>The idea was to create it as a simple and scalable project, so it would be to change and add the database to another country, or region. This app's goal is to encourage the comsumption of local produce, empower small local farmers and, with that, reduce our impact in global warming.
          </p>
        </DialogContentText>
      </DialogContent>
    </>


  )
}