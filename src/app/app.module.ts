import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './containers/app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CustomSerializer, effects, reducers } from './store';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'scheduling' },
  {
    path: 'scheduling',
    loadChildren: () => import('../scheduling/scheduling.module').then(module => module.SchedulingModule)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    {
      provide: RouterStateSerializer, useClass: CustomSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
