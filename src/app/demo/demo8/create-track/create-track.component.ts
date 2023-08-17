import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TrackService } from 'src/app/shared/services/track.service';

@Component({
  selector: 'app-create-track',
  templateUrl: './create-track.component.html',
  styleUrls: ['./create-track.component.scss']
})
export class CreateTrackComponent {
    trackForm : FormGroup;

    constructor(private _fb : FormBuilder, private _trackService : TrackService) {
      this.trackForm = this._fb.group({
        title : [null],
        duration : [0],
        genre : [''],
        cover : [null],
        artists : this._fb.array([])
      });
    }

    get artists() : FormArray {
      return this.trackForm.get('artists') as FormArray;
    }

    addArtist() : void {
      this.artists.push(this._fb.control(null));
    }

    removeArtist(indice : number) : void {
      this.artists.removeAt(indice);
    }

    addTrack() : void {
      //normalement on vérif si tout valide mais là osef
      this._trackService.create(this.trackForm.value);
    }
}
