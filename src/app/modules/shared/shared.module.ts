import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material/material.module";
import { SharedCardComponent } from "./card/container/shared-card.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HaFormComponent } from "./ha-form/ha-form.component";

@NgModule({
  declarations: [SharedCardComponent, HaFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [SharedCardComponent, HaFormComponent],

})

export class SharedModule { }
