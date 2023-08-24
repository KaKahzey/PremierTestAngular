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
  pokemonActuel : Pokemon = {
    id : 0, name : "", weight : 0, height : 0, types : [{slot : 0,
    type : {name : "", url : ""}}], sprites : {front_default : "", back_default : ""}
  }
  list : Pokemon[] = []
  dataAPIFr :  [] = []
  nomsFrancais : Object[] = [{name : {fr : ""}}]
  offsetValue : number = 0
  type : string = "normal"
  doubleBars : string = "--"
  displayGif : string = "block"
  displayImages : string = "none"


  constructor(private _pokeapiService : PokeApiService, private _http : HttpClient) {}

  ngOnInit(): void {

    this._pokeapiService.getAll().subscribe(data => {
      this.pokeList = data.results;
      let obs : Observable<Pokemon>[] = [];
      this.pokeList.forEach(elem => obs.push(this._pokeapiService.getDetails(elem.url)) );
      forkJoin(obs).subscribe({
        next : (value) => {
          this.list = value;
        },
        complete : () => {
          console.log(this.list); 
        }
      })
    });
    this._pokeapiService.getFr().subscribe(data => {
      console.log(data);
      
    
    })
    console.log(this.dataAPIFr);
    
    }

  changePokemon(id : number) : void {
    if(this.pokemonActuel.id == 0){
      this.displayGif = "none"
      this.displayImages = "block"
    }
    let listTemp = this.list.filter(element => element.id == id)
    let pokemonTemp = listTemp[0]
    this.pokemonActuel = {id : pokemonTemp.id, name : pokemonTemp.name, weight : pokemonTemp.weight, height : pokemonTemp.height, types : pokemonTemp.types, sprites : pokemonTemp.sprites}
    this.type = ""
    this.type += `${this.pokemonActuel.types[0].type.name}`
    // this.pokemonActuel.types.forEach(element => {
    //   this.type += `--${element.type.name} `
    // });
  }

  displayBefore() : void {
    this._pokeapiService.url = `https://pokeapi.co/api/v2/pokemon/?offset=${this.offsetValue - 20}&limit=20`
    this._pokeapiService.getAll().subscribe(data => {
      this.pokeList = data.results;
      let obs : Observable<Pokemon>[] = [];
      this.pokeList.forEach(elem => obs.push(this._pokeapiService.getDetails(elem.url)) );
      forkJoin(obs).subscribe({
        next : (value) => {
          this.list = value;
        },
        complete : () => {
          console.log(this.list);
          
        }
      })
    })
    this.offsetValue -= 20
    
  }

  displayAfter() : void {
    this._pokeapiService.url = `https://pokeapi.co/api/v2/pokemon/?offset=${this.offsetValue + 20}&limit=20`
    this._pokeapiService.getAll().subscribe(data => {
      this.pokeList = data.results;
      let obs : Observable<Pokemon>[] = [];
      this.pokeList.forEach(elem => obs.push(this._pokeapiService.getDetails(elem.url)) );
      forkJoin(obs).subscribe({
        next : (value) => {
          this.list = value;
        },
        complete : () => {
          console.log(this.list);
          
        }
      })
  })
  this.offsetValue += 20
  }
}

