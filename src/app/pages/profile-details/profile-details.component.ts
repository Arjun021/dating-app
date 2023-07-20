import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profiles } from 'src/app/shared/models/profile.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit{

  userId: string | null = '';

  userDetails: Profiles = {};

  favoriteList: any = [];

  loggedInUserId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    const getUser = this.commonService.getLocalStorageData('user');
    if (getUser) {
      this.loggedInUserId = getUser.UID;
    } else {
      this.router.navigate(['/'])
    }

  }

  async ngOnInit(): Promise<void> {

    if (this.userId) {
      await this.getProfileDetails()
    }
    if (this.loggedInUserId) {
      await this.getFavorits();
    }

  }

  /**
   * Get all profile details
   */
  async getProfileDetails() {
    try {
      const result = await this.apiService.getUserDetails(this.userId);
      if (result) {
        this.userDetails = result;
      }
    } catch(e) {
      this.commonService.showErrorToaster('Error', 'Something went wrong')
    }
  }

  /**
   * Get all favorites
   */
  async getFavorits() {
    try {
      const result = await this.apiService.getFavourites();
      if (result && result.favorites[this.loggedInUserId].includes(this.userDetails.id)) {
        this.userDetails['is_favorite'] = true;
      } else {
        this.userDetails['is_favorite'] = false;
      }
    } catch (e) {
      this.commonService.showErrorToaster('Error', 'Something went wrong');
    }
  }

  /**
   * Update favorite
   */
   async updateFavorite() {
    try {
      const property: any = {
        profileId: this.userDetails.id
      }
      const favoriteResult = this.userDetails.is_favorite ? await this.apiService.deleteFavorite(property) : await this.apiService.addToFavorite(property);
      if (favoriteResult) {
        this.userDetails.is_favorite = !this.userDetails.is_favorite;
        this.commonService.showSuccessToaster('Success', favoriteResult.message)
      }
    } catch(e) {
      this.commonService.showErrorToaster('Error', 'Something went wrong');
    }
  }


}
