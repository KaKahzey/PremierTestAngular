import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { PokeApiService } from 'src/app/shared/services/poke-api.service';
import { PokemonType } from 'src/app/shared/models/pokemonType';
@Component({
  selector: 'app-exo6',
  templateUrl: './exo6.component.html',
  styleUrls: ['./exo6.component.scss']
})
export class Exo6Component {

  pokeList : any[] =  []
  // pokemonActuel : Pokemon = {
  //   id : 0, name : "Sacha and Pikachu", weight : 0, height : 0, types : [{slot : 0,
  //   type : {name : "", url : ""}}], sprites : {front_default : "", back_default : ""}, description : {flavor_text_entries : [{flavor_text : ""}]}
  // }
  pokemonActuel! : Pokemon
  descriptionActuelle : {flavor_text_entries : [{flavor_text : string}]} = {flavor_text_entries : [{flavor_text : ""}]}
  list : Pokemon[] = []
  nomsFrancais : Object[] = [{name : {fr : ""}}]
  offsetValue : number = 0
  type : string = "normal"
  displayGif : string = "block"
  displayImages : string = "none"


  constructor(private _pokeapiService : PokeApiService, private _http : HttpClient) {}

  ngOnInit(): void {

    this._pokeapiService.getAll().subscribe(data => {
      this.pokeList = data.results
      let obs : Observable<Pokemon>[] = []
      this.pokeList.forEach(elem => obs.push(this._pokeapiService.getDetails(elem.url)) )
      forkJoin(obs).subscribe({
        next : (value) => {
          this.list = value
        },
        complete : () => {
          console.log(this.list)
        }
      })
      
    });    
    }

  changePokemon(id : number) : void {
    if(this.pokemonActuel.id == 0){
      this.displayGif = "none"
      this.displayImages = "block"
    }
    let pokemonTemp = this.list.find(element => element.id == id)
    this.pokemonActuel = pokemonTemp ?? this.pokemonActuel
    this.type = ""
    this.type += `${this.pokemonActuel.types[0].type.name}`
    console.log(this.pokemonActuel);
    
  }

  display(value : number) : void {
    this._pokeapiService.url = `https://pokeapi.co/api/v2/pokemon/?offset=${this.offsetValue + value}&limit=20`
    this._pokeapiService.getAll().subscribe(data => {
      this.pokeList = data.results
      let obs : Observable<Pokemon>[] = []
      this.pokeList.forEach(elem => obs.push(this._pokeapiService.getDetails(elem.url)) )
      forkJoin(obs).subscribe({
        next : (value) => {
          this.list = value
        },
        complete : () => {
          console.log(this.list)
          
        }
      })
    })
    this.offsetValue -= 20
    
  }
}

