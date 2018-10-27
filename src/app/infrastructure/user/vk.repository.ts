import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { AuthService } from "../../domain/model/auth/auth.service";
import { User } from "../../domain/model/user/user";
import { UserRepository } from "../../domain/model/user/user.repository";
import { environment } from "../../../environments/environment";

@Injectable()
export class VkRepository implements UserRepository {
  private baseUrl = "https://api.vk.com/method/";

  constructor(
    private http: HttpClient,
    @Inject("AuthService") private auth: AuthService
  ) {}

  getById(id: number): Observable<User> {
    const url =
      this.baseUrl +
      "users.get?" +
      "user_ids=" +
      id +
      "&v=" +
      environment.vk.version +
      "&access_token=" +
      this.auth.getAccessToken();
    return this.http.jsonp(url, "callback").pipe(
      map((data: UserResponse) => {
        return {
          id: data.response[0].id,
          firstName: data.response[0].first_name,
          lastName: data.response[0].last_name
        };
      })
    );
  }

  getFriends(limit: number): User[] {
    const url =
      this.baseUrl +
      "friends.search?" +
      "count=" +
      limit +
      "&v=" +
      environment.vk.version +
      "&access_token=" +
      this.auth.getAccessToken();
    this.http.jsonp(url, "callback").subscribe(data => console.log(data));
    return [];
  }
}

interface UserResponse {
  response: [
    {
      id: number;
      first_name: string;
      last_name: string;
    }
  ];
}
