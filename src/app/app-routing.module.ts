import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProfilesComponent } from './pages/all-profiles/all-profiles.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/all-profiles', pathMatch: 'full'
  },
  {
    path: 'all-profiles',
    component: AllProfilesComponent

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
