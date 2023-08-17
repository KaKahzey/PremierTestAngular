import { Injectable } from '@angular/core';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private _tracks : Track[] = [
    { id : 1, title : 'Brother', duration : 182,  cover : 'https://i1.sndcdn.com/artworks-000154427194-ou4khr-t500x500.jpg', artists : ['Rilès'], genre : 'Pop'},
    { id : 2, title : 'VOICES', duration : 156,  cover : 'https://i1.sndcdn.com/artworks-000627185959-vukj0q-t500x500.jpg', artists : ['Skye', 'XXXTENTACION'], genre : 'Rap'},
  ]

  constructor() { }

  getAll() : Track[] {
    return []
  }

  getById(id : number) : Track {
    return {} as Track
  }

  create(track : Track) : void {

  }

  update(id : number, track : Track) : void {

  }

  delete(id : number) : void {
    
  }

}
