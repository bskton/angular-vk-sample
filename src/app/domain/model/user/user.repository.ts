import { Observable } from "rxjs";

import { User } from "./user";

export interface UserRepository {
  getById(id: number): Observable<User>;

  getFriends(limit: number): Observable<User[]>;
}