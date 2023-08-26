import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FullComponent } from "./layouts/full/full.component";
import { NavigationComponent } from "./shared/header/navigation.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { Approutes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpinnerComponent } from "./shared/spinner.component";
import { LoginComponent } from "./login/login.component";
import { ApiService } from "./shared/services/api.service";
import { ToastrModule } from "ngx-toastr";
import { AuthGuard } from "./shared/guards/auth.guard";
import { PaginationComponent } from "./shared/pagination/pagination.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RefreshTokenInterceptorInterceptor } from "./refresh-token-interceptor.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: "your-app-id" }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, {
      useHash: false,
      initialNavigation: "enabledBlocking",
    }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    ApiService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
