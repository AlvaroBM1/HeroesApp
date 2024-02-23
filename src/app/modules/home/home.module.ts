import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './container/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeroesService } from '../services/heroes.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  providers: [HeroesService]
})
export class HomeModule { }
