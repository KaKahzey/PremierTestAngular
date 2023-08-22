import { Component } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { PokeApiService } from 'src/app/shared/services/poke-api.service';
@Component({
  selector: 'app-exo6',
  templateUrl: './exo6.component.html',
  styleUrls: ['./exo6.component.scss']
})
export class Exo6Component {

  pokeList : any[] =  []
  pokemonActuel : string = ""
  list : Pokemon[] = [
  
  ]

constructor(private _pokeapiService : PokeApiService) {}

ngOnInit(): void {

  this._pokeapiService.getAll().subscribe(data => {
    this.pokeList = data.results;
    this.pokeList.forEach(element => {
      this._pokeapiService.getDetails(element.url).subscribe(poke => {
      this.pokemonActuel = poke.name;
      this.list.push({id : poke.id, name : poke.name, weight : poke.weight, height : poke.height, sprites : poke.sprites})
    });
    });
    
    
  });
}

  bite() {
    console.log(this.list)
  }


}

