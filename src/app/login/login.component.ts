import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../shared/services/api.service";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "../shared/services/storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: any = FormGroup;
  submitted: boolean = false;
  spinner = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner = true;
    this.apiService.login(this.loginForm.value).subscribe(
      ({ data }) => {
        this.spinner = false;
        if (data.accessToken) {
          this.storageService.setAuthInfo(data);
        }
        this.router.navigateByUrl("/dashboard");
      },
      (err) => {
        this.spinner = false;
        this.toastrService.error(err.error.error, "Error");
      }
    );
  }
}
