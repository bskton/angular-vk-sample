import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AuthService } from "../auth/auth.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private url = "https://api.vk.com/method/";

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      let url =
        "https://api.vk.com/method/" +
        "users.get?" +
        "user_ids=" +
        this.auth.getUserId() +
        "&v=" +
        environment.vk.version +
        "&access_token=" +
        this.auth.getAccessToken();
      this.http.jsonp(url, "callback").subscribe(data => console.log(data));
      url =
        "https://api.vk.com/method/" +
        "friends.search?" +
        "count=5" +
        "&v=" +
        environment.vk.version +
        "&access_token=" +
        this.auth.getAccessToken();
      this.http.jsonp(url, "callback").subscribe(data => console.log(data));
    }
  }
}
