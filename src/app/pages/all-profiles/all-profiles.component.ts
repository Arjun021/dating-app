import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss']
})
export class AllProfilesComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private commonService: CommonService
  ) {

  }

  async ngOnInit() {
      await this.getUserAccounts();
  }

  /**
   * Get user accounts
   */
  async getUserAccounts(): Promise<void> {
    try {
      const result = await this.apiService.getUserAccount();
      if (result) {
        this.commonService.setLocalStorageData('user', result);
      }
    } catch(e) {
      this.commonService.showErrorToaster('Error','Something went wrong');
    }
  }

}
