import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private url = "https://api.vk.com/method/";

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.getProfileInfo();
  }

  getProfileInfo() {
    if (this.auth.isAuthenticated()) {
      const url =
        this.url +
        "account.getProfileInfo?access_token=" +
        this.auth.getAccessToken() +
        "&v=5.87";
      this.http.jsonp(url, 'callback').subscribe(data => {
        console.log('JSONP Data', data);
      });
    }
  }
}
