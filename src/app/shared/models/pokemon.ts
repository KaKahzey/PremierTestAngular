import { PokemonType } from "./pokemonType"
export interface Pokemon {
    id : number
    name : string
    weight : number
    height : number
    types : PokemonType[]
    sprites : {front_default : string, back_default : string}
    description : {flavor_text_entries : [{flavor_text : string}]}
}