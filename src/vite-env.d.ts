/// <reference types="vite/client" />

declare module "*.csv" {
  export default <{[key: string]: any}>[];
}

type Food = FoodObject[]

interface FoodObject {
    [prop: string]: string;
}

