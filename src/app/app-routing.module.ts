import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProfilesComponent } from './pages/all-profiles/all-profiles.component';
import { ProfileListingComponent } from './pages/profile-listing/profile-listing.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/all-profiles', pathMatch: 'full'
  },
  {
    path: 'all-profiles',
    component: AllProfilesComponent
  },
  {
    path: 'profile-details/:id',
    component: ProfileDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
