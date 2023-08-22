export interface Pokemon {
    id : number
    name : string
    weight : number
    height : number
    types : Object[]
    sprites : {front_default : string, back_default : string}
}