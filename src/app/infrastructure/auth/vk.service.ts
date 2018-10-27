import { DOCUMENT } from "@angular/common";
import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthService } from "../../domain/model/auth/auth.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class VkService implements AuthService {
  private authenticationStateChanged = new Subject<boolean>();

  private baseUrl = "https://oauth.vk.com/authorize?";

  constructor(public router: Router, @Inject(DOCUMENT) private document: any) {}

  login(): void {
    const url =
      this.baseUrl +
      "client_id=" +
      environment.vk.clientId +
      "&display=page&redirect_uri=" +
      environment.vk.redirectUri +
      "&scope=" +
      environment.vk.scope +
      "&response_type=" +
      environment.vk.responseType +
      "&v=" +
      environment.vk.version +
      "&revoke=1";
    this.document.location.href = url;
  }

  logout(): void {
    this.removeSession();
    this.router.navigate(["/"]);
  }

  authChanged(): Subject<boolean> {
    return this.authenticationStateChanged;
  }

  handleAuthentication(): void {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    const params = fragment.split("&");
    const authResult: AuthResult = params.reduce(
      (result, item) => {
        const a = item.split("=");
        result[this.snakeToCamel(a[0])] = a[1];
        return result;
      },
      {
        accessToken: null,
        userId: null,
        expiresIn: null
      }
    );
    if (
      authResult.accessToken !== null &&
      authResult.userId !== null &&
      authResult.expiresIn !== null
    ) {
      this.setSession(authResult);
    } else {
      this.removeSession();
    }
    this.router.navigate(["/home"]);
  }

  isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at") || "{}");
    return new Date().getTime() < expiresAt;
  }

  getAccessToken(): any {
    return localStorage.getItem("access_token");
  }

  getUserId(): any {
    return localStorage.getItem("user_id");
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("user_id", authResult.userId);
    localStorage.setItem("expires_at", expiresAt);
    this.authenticationStateChanged.next(true);
  }

  private removeSession() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("expires_at");
    this.authenticationStateChanged.next(false);
  }

  private snakeToCamel(s) {
    return s.replace(/(\_\w)/g, function(m) {
      return m[1].toUpperCase();
    });
  }
}

interface AuthResult {
  accessToken: string;
  userId: number;
  expiresIn: number;
}
