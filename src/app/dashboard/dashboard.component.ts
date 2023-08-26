import { Component, AfterViewInit, OnInit } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements AfterViewInit, OnInit {
  subtitle: string;
  profileDetails: any = {};
  constructor(private api: ApiService, private toastr: ToastrService) {
    this.subtitle = "This is some text within a card block.";
  }

  ngOnInit() {
    this.getProfileDetails();
  }
  getProfileDetails() {
    this.api.details().subscribe(
      ({ data }) => {
        this.profileDetails = data;
      },

      (err) => {
        this.toastr.error(err.error.error, "Error");
      }
    );
  }

  ngAfterViewInit() {}
}
