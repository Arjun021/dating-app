import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { ProfileListingComponent } from './profile-listing/profile-listing.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

@NgModule({
  declarations: [
    PagesComponent,
    AllProfilesComponent,
    ProfileListingComponent,
    ProfileDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
