import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {
  private auth0;

  private baseUrl = "https://oauth.vk.com/authorize?";

  constructor(
    public router: Router,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: any
  ) {}

  public login(): void {
    // https://oauth.vk.com/authorize?client_id=5490057&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52
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

  handleAuth(): void {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    const params = fragment.split("&");
    const authResult = params.reduce((result, item) => {
      const a = item.split("=");
      result[this.snakeToCamel(a[0])] = a[1];
      return result;
    }, {});
    this.setSession(authResult);
    this.router.navigate(["/home"]);
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("user_id", authResult.userId);
    localStorage.setItem("expires_at", expiresAt);
  }

  private snakeToCamel(s) {
    return s.replace(/(\_\w)/g, function(m) {
      return m[1].toUpperCase();
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";
        this.setSession(authResult);
        this.router.navigate(["/home"]);
      } else if (err) {
        this.router.navigate(["/home"]);
        console.log(err);
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // Go back to the home route
    this.router.navigate(["/"]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at") || "{}");
    return new Date().getTime() < expiresAt;
  }

  getAccessToken(): any {
    return localStorage.getItem("access_token");
  }

  getUserId(): any {
    return localStorage.getItem("user_id");
  }
}
