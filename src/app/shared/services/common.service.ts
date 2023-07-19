import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastr: ToastrService,
  ) { }

  /**
   * show success toaster
   * @param title -> title for toaster
   * @param message -> message for toaster
   * @param isShowCloseButton -> close button show/hide default true
   */
  showSuccessToaster(title: string, message: string, isShowCloseButton = true) {
    this.toastr.success(message, title, {
      closeButton: isShowCloseButton,
      tapToDismiss: false,
    });
    this.toastr.toastrConfig.preventDuplicates = true;
  }

  /**
   * show error toaster
   * @param title -> title for toaster
   * @param message -> message for toaster
   * @param isShowCloseButton -> close button show/hide default true
   */
  showErrorToaster(title: string, message: string, isShowCloseButton = true) {
    this.toastr.error(message, title, {
      closeButton: isShowCloseButton,
      tapToDismiss: false,
    });
    this.toastr.toastrConfig.preventDuplicates = true;
  }
}
