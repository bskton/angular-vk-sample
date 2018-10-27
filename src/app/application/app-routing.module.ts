import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { CallbackComponent } from "./callback/callback.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "callback", component: CallbackComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}