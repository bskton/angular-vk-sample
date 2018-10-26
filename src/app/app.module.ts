import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthService } from "./auth/auth.service";
import { HomeComponent } from "./home/home.component";
import { CallbackComponent } from "./callback/callback.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, CallbackComponent],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, HttpClientJsonpModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
