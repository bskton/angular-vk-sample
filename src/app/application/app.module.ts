import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CallbackComponent } from "./callback/callback.component";
import { HomeComponent } from "./home/home.component";
import { MaterialModule } from "./material.module";
import { VkService } from "../infrastructure/auth/vk.service";
import { VkRepository } from "../infrastructure/user/vk.repository";
import { UserService } from "../domain/model/user/user.service";

@NgModule({
  declarations: [AppComponent, HomeComponent, CallbackComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MaterialModule
  ],
  providers: [
    {
      provide: "AuthService",
      useClass: VkService
    },
    {
      provide: "UserRepository",
      useClass: VkRepository
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
