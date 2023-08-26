import { Routes } from "@angular/router";
import { FullComponent } from "./layouts/full/full.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/guards/auth.guard";

export const Approutes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/login",
  },
];
