import { Injectable, Inject } from "@angular/core";
import { Subject, Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";
import { User } from "./user";
import { UserRepository } from "./user.repository";

Injectable();
export class UserService {
  private userStateChanged = new Subject<User>();

  constructor(
    @Inject("UserRepository") private repo: UserRepository,
    @Inject("AuthService") private auth: AuthService
  ) {
    this.auth.authChanged().subscribe(() => {
      this.getUser();
    });
  }

  getUser(): void {
    if (this.isAuthenticated()) {
      this.repo
        .getById(this.auth.getUserId())
        .pipe(take(1))
        .subscribe((user: User) => {
          this.userStateChanged.next(user);
        });
    } else {
      this.userStateChanged.next(null);
    }
  }

  getFiveFriends(): User[] {
    return this.repo.getFriends(5);
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }

  userChanged(): Subject<User> {
    return this.userStateChanged;
  }
}
