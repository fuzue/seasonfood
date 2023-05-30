
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
          This project came from a personal doubt: I had recently moved to Italy and didn't know when I could find fruits and vegetables I like in the supermarket, when each food was in season. After looking for sources of it, and finding very hard to read tables, I decided to build my own app to do it.

          The idea was to create it as a scalable project, so it is simple to change the database to another country, or region.

          It is also an objective of this app to encourage local the consumption of local produce - that was also a thing I noticed here in Italy: here many products publicize the region they are from, I believe that it is caused by the strong regionalism that exists in Italy. There are many products that read: "cheese from Piedmont", "oranges from Sicily" or "Olive oil from Liguria". That really motivated and boosted me look for more information about local produce and to consume fruits and vegetables from local producers.
        </DialogContentText>
      </DialogContent>
    </>


  )
}