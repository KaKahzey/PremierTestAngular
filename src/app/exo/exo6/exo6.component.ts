import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { PokeApiService } from 'src/app/shared/services/poke-api.service';
@Component({
  selector: 'app-exo6',
  templateUrl: './exo6.component.html',
  styleUrls: ['./exo6.component.scss']
})
export class Exo6Component {

  pokeList : any[] =  []
  pokemonActuel : Pokemon = {id : 0, name : "", weight : 0, height : 0, types : [], sprites : {front_default : "", back_default : ""}}
  list : Pokemon[] = []
  offsetValue : number = 0

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
    
    // this.pokeList.forEach(element => {
    //   this._pokeapiService.getDetails(element.url).subscribe(poke => {
    //   this.pokemonActuel = poke.name;
    //   this.list.push({id : poke.id, name : poke.name, weight : poke.weight, height : poke.height, sprites : poke.sprites})
    // });
    //});

  });
}

  changePokemon(id : number) : void {
    let listTemp = this.list.filter(element => element.id == id)
    let pokemonTemp = listTemp[0]
    this.pokemonActuel = {id : pokemonTemp.id, name : pokemonTemp.name, weight : pokemonTemp.weight, height : pokemonTemp.height, types : pokemonTemp.types, sprites : pokemonTemp.sprites}
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

