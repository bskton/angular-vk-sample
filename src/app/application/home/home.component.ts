import { Component, OnInit, OnDestroy } from "@angular/core";
import { take, switchMap } from "rxjs/operators";

import { UserService } from "../../domain/model/user/user.service";
import { User } from "../../domain/model/user/user";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User;

  friends: User[];

  private userSubscription: Subscription;

  private friendsSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userSubscription = this.userService
      .userChanged()
      .subscribe((user: User) => {
        this.user = user;
      });
    this.userService.getUser();
    this.friendsSubscription = this.userService
      .friendsChanged()
      .subscribe((friends: User[]) => {
        this.friends = friends;
      });
    this.userService.getFiveFriends();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.friendsSubscription) {
      this.friendsSubscription.unsubscribe();
    }
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
