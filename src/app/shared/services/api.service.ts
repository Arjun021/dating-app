import { Injectable } from '@angular/core';
import { ApiInterfaceService } from './api-interface.service';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apiInterfaceService: ApiInterfaceService) {}

  /**
   * Get user account
   */
  async getUserAccount() {
    try {
      const result = await (<any>(
        this.apiInterfaceService.get(AppConfig.ACCOUNT, true).toPromise()
      ));
      if (result) {
        return result;
      }
      return false;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Get all profiles
   */
  async getAllProfiles() {
    try {
      const result = await (<any>(
        this.apiInterfaceService.get(AppConfig.PROFILES, false).toPromise()
      ));
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get all favourites
   */
  async getFavourites() {
    try {
      const result = await (<any>(
        this.apiInterfaceService.get(AppConfig.FAVORITES, false).toPromise()
      ));
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Add to favorite
   */
  async addToFavorite(data: {profileId: number}) {
    try {
      const result = await (<any>(
        this.apiInterfaceService
          .post(AppConfig.FAVORITES, data, false)
          .toPromise()
      ));
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Delete favorite from list
   */
  async deleteFavorite(data: {profileId: number}) {
    try {
      const result = await (<any>(
        this.apiInterfaceService
          .delete(AppConfig.FAVORITES,false,null, data)
          .toPromise()
      ));
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get user details
   */
  async getUserDetails(profileId: string | null) {
    try {
      const result = await (<any>(
        this.apiInterfaceService.get(AppConfig.PROFILES + '/' + profileId, false).toPromise()
      ));
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
