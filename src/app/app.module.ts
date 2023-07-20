import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { HttpIntercepterService } from './shared/services/http-intercepter.service';
import { SharedModule } from './shared/shared.module';
import { ProfileListingComponent } from './pages/profile-listing/profile-listing.component';
import { AllProfilesComponent } from './pages/all-profiles/all-profiles.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AllProfilesComponent,
    ProfileListingComponent,
    ProfileDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
