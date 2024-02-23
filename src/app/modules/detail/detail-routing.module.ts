import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./container/detail.component";

const routes: Routes = [
    {
        path: '',
        component: DetailComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class DetailRoutingModule { }
