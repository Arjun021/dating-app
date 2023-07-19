import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'all-profiles',
        component: AllProfilesComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
