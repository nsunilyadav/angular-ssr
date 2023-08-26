import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { ApiService } from "./shared/services/api.service";
import { StorageService } from "./shared/services/storage.service";

@Injectable()
export class RefreshTokenInterceptorInterceptor implements HttpInterceptor {
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.storageService.getItem("accessToken");

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.refreshTokenSubject.next(null);

    const payload = {
      refresh_token: this.storageService.getItem("refreshToken"),
    };
    return this.apiService.refreshToken(payload).pipe(
      switchMap(({ data }) => {
        this.storageService.setAuthInfo(data);
        this.refreshTokenSubject.next(data.accessToken);
        return next.handle(this.addToken(request, data.accessToken));
      }),
      catchError((error: any) => {
        this.router.navigateByUrl("/");
        return throwError(error);
      })
    );
  }
}
