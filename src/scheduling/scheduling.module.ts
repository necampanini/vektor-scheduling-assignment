import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { reducers, effects} from './store'

// components

// containers

// guards

// services
import * as fromServices from './services'

// routes
export const ROUTES: Routes = [
  {
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("scheduling", reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services],
  // exports: [],
  declarations: [],
})
export class SchedulingModule { }
