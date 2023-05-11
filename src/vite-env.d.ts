/// <reference types="vite/client" />

declare module "*.csv" {
  export default <{[key: string]: any}>[];
}

type Food = FoodObject[]

type FoodObject = {
  type: string
  nameEng: string
  nameIta: string
  image: string
  id: string
  month_0: string
  month_1: string
  month_2: string
  month_3: string
  month_4: string
  month_5: string
  month_6: string
  month_7: string
  month_8: string
  month_9: string
  month_10: string
  month_11: string
}