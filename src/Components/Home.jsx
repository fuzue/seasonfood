import { FoodOfTheMonth  } from "./FoodOfTheMonth"

const date = new Date()
const currentMonth = date.getMonth()

function Home() {
  return (
    <div > 
      <FoodOfTheMonth />
    </div>
  );
} 

export { Home, currentMonth }

