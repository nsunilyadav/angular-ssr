import { Injectable } from "@angular/core";
import { LocalstorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private localstorageService: LocalstorageService) {}

  isLoggedIn(): boolean {
    const accessToken = this.localstorageService.getItem("accessToken");
    if (accessToken) {
      return true;
    }
    return false;
  }

  setAuthInfo(data: any) {
    this.localstorageService.setItem("accessToken", data.accessToken);
    this.localstorageService.setItem("refreshToken", data.refreshToken);
    this.localstorageService.setItem("expiresIn", data.expiresIn);
  }

  clearStorage() {
    this.localstorageService.clear();
  }

  getItem(itemName: string) {
    return this.localstorageService.getItem(itemName);
  }
}
