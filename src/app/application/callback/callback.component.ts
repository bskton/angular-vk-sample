import { Component, OnInit, Inject } from "@angular/core";

import { AuthService } from "../../domain/model/auth/auth.service";

@Component({
  selector: "app-callback",
  templateUrl: "./callback.component.html",
  styleUrls: ["./callback.component.css"]
})
export class CallbackComponent implements OnInit {
  constructor(@Inject('AuthService') private auth: AuthService) {}

  ngOnInit() {
    this.auth.handleAuthentication();
  }
}
