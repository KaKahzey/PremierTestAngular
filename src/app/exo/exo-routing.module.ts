import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Exo1Component } from './exo1/exo1.component';
import { Exo2Component } from './exo2/exo2.component';
import { Exo3Component } from './exo3/exo3.component';
import { Exo5Component } from './exo5/exo5.component';
import { CreateFanComponent } from './exo5/create-fan/create-fan.component';

const routes: Routes = [
  { path : "exo1", component : Exo1Component },
  { path : "exo2", component : Exo2Component },
  { path : "exo3", component : Exo3Component },
  { path : "exo4" , redirectTo : "/"},
  { path : "exo5" , component : Exo5Component },
  { path : "exo5/create" , component : CreateFanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExoRoutingModule { }
