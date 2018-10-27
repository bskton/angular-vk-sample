import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CallbackComponent } from "./callback/callback.component";
import { HomeComponent } from "./home/home.component";
import { VkService } from "../infrastructure/auth/vk.service";
import { VkRepository } from "../infrastructure/user/vk.repository";
import { UserService } from "../domain/model/user/user.service";

@NgModule({
  declarations: [AppComponent, HomeComponent, CallbackComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule
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
