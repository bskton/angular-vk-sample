import { Subject } from "rxjs";

export interface AuthService {
  login(): void;

  logout(): void;

  authChanged(): Subject<boolean>;

  handleAuthentication(): void;

  isAuthenticated(): boolean;

  getAccessToken(): string;

  getUserId(): number;
}
