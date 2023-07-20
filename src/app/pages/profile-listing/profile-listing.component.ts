import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profiles } from 'src/app/shared/models/profile.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-profile-listing',
  templateUrl: './profile-listing.component.html',
  styleUrls: ['./profile-listing.component.scss']
})
export class ProfileListingComponent implements OnInit {

  profileList: Profiles[] = [];

  favoriteList: any = [];

  userId: string = '';

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private router: Router
  ) {
  }

  async ngOnInit() {
      const userData = this.commonService.getLocalStorageData('user');
      this.userId = userData.UID;
      console.log(this.userId);
      Promise.all([
        await this.getFavorits(),
        await this.getAllProfiles()
      ])

  }

  /**
   * Get all profiles
   */
  async getAllProfiles() {
    try {
      const result = await this.apiService.getAllProfiles();
      if (result) {
        this.profileList = result.profiles;
        for (let profile of this.profileList) {
          if (this.favoriteList.includes(profile.id)) {
            profile['is_favorite'] = true;
          }
        }
      }
    } catch (e) {
      this.commonService.showErrorToaster('Error', 'Something went wrong');
    }
  }

  /**
   * Get all favorites
   */
  async getFavorits() {
    try {
      const result = await this.apiService.getFavourites();
      if (result) {
        this.favoriteList = result.favorites[this.userId];
      }
    } catch (e) {
      this.commonService.showErrorToaster('Error', 'Something went wrong');
    }
  }

  /**
   * Update favorite
   */
  async updateFavorite(data: Profiles) {
    try {
      const property: any = {
        profileId: data.id
      }
      const favoriteResult = data.is_favorite ? await this.apiService.deleteFavorite(property) : await this.apiService.addToFavorite(property);
      console.log(favoriteResult)
      if (favoriteResult) {
        data.is_favorite = !data.is_favorite;
        this.commonService.showSuccessToaster('Success', favoriteResult.message)
      }
    } catch(e) {
      this.commonService.showErrorToaster('Error', 'Something went wrong');
    }
  }

  openProfileDetails(data: Profiles) {
    this.router.navigate(['profile-details', data.id])
  }

}
