import { Component, AfterViewInit, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { NgbDropdownModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../services/api.service";
import { StorageService } from "../services/storage.service";
import { ToastrService } from "ngx-toastr";

declare var $: any;

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: "./navigation.component.html",
})
export class NavigationComponent implements AfterViewInit {
  userName: any;
  userNameLogo: any;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private apiService: ApiService,
    private storageService: StorageService,
    private toastrService: ToastrService
  ) {
    if (this.userName == "superAdmin") {
      this.userName = "Super Admin";
      this.checkIfNew(this.userName);
    }
  }

  logOut() {
    this.apiService.logout;

    this.apiService.logout().subscribe(
      () => {
        this.storageService.clearStorage();
        this.router.navigateByUrl("/login");
      },
      (err) => {
        this.toastrService.error(err.error.error, "Error");
      }
    );
  }

  checkIfNew(title: string) {
    if (this.userNameLogo == title.charAt(0).toLowerCase()) {
      return false;
    } else {
      this.userNameLogo = title.charAt(0).toLowerCase();
      return true;
    }
  }

  ngAfterViewInit() {}
}
