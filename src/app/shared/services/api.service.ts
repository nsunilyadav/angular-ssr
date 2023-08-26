import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { environment } from "environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl = environment.api;
  constructor(private http: HttpClient) {}

  login(item: any) {
    return this.http.post(this.baseUrl + "/login", item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  details() {
    return this.http.get(this.baseUrl + "/user/me").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  refreshToken(payload: any) {
    return this.http.post(this.baseUrl + "/refresh_token", payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  logout() {
    return this.http.post(this.baseUrl + "/logout", {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
