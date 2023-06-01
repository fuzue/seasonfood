import { DialogTitle, DialogContent, DialogContentText, Link}
  from "@mui/material";

//dialog box that opens with each element clicked
export default function ContributeDialog() {
  return (
    <>
      <DialogTitle id="about-dialog-title">
        {"Contribute"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="about-dialog-description">
          This is an open source project, that means you can clone this repository, write issues, make your own changes and submit your own pull requests.           
          <p>For this, use our&nbsp; 
          <Link underline="hover" href="https://github.com/fuzue/seasonfood">
            github Page.
          </Link></p>
        </DialogContentText>
      </DialogContent>
    </>


  )
}