import { Component, OnInit } from "@angular/core";
import { take, switchMap } from "rxjs/operators";

import { UserService } from "../../domain/model/user/user.service";
import { User } from "../../domain/model/user/user";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userChanged().subscribe((user: User) => {
        this.user = user;
    });
    this.userService.getUser();
    // this.friends = this.userService.getFiveFriends();
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout();
  }
}
