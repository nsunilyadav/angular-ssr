import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { ApiService } from "../services/api.service";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: ApiService,
    private router: Router,
    private storageService: StorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Promise<boolean> {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
