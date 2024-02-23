import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DetailRoutingModule } from "./detail-routing.module";
import { MaterialModule } from "src/app/material/material.module";
import { HeroImagePipe } from "./pipes/hero-image.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DetailComponent } from "./container/detail.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";


@NgModule({
  declarations: [
    DetailComponent,
    HeroImagePipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    FormsModule,
    MaterialModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule
  ]
})

export class DetailModule { }
