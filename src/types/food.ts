export type Food = FoodObject[]

export type FoodObject = {
  id: string
  category: string
  description: FoodDescription[]
  image: string
  months: boolean[]
}

export type FoodDescription = {
  name: string
  slug: string
  lang: string
}