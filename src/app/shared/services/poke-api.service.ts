import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  url : string = "https://pokeapi.co/api/v2/pokemon"
  frUrl : string = "https://api-pokemon-fr.vercel.app/api/v1/pokemon"

  constructor(private _httpClient : HttpClient) { }

  getAll() {
    return this._httpClient.get<any>(this.url)
  }
  getDetails(url : string) {
    return this._httpClient.get<Pokemon>(url)
  }
  getFr() {
    return this._httpClient.get<any>(this.frUrl)
  }

}

 