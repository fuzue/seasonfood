export type Food = FoodObject[]

export type FoodObject = {
  category: string
  description: FoodDescription[]
  image: string
  season: boolean[]
}

export type FoodDescription = {
  lang: string
  name: string
  slug: string
}