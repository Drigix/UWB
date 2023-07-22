import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';

interface IConfirmDialogOption {
  key?: string;
  header?: string;
  message?: string;
  icon?: string;
}

@Injectable({providedIn: 'root'})
export class ConfirmDialogService {

  private confirmDialogOption: IConfirmDialogOption = {
    key: 'mainDeleteConfirmDialog',
    header: this.translateService.instant('global.dialog.deleteHeader'),
    message: this.translateService.instant('global.dialog.deleteMessage'),
    icon: 'pi pi-exclamation-triangle',
  };

  constructor(
    private confirmationService: ConfirmationService,
    private translateService: TranslateService
  ) { }

  openDeleteDialog(confirmDialogOption: IConfirmDialogOption = {}, callback: (confirmed: boolean) => void ): void {
    this.confirmDialogOption =  {
      key: confirmDialogOption.key ?? this.confirmDialogOption.key,
      header: confirmDialogOption.header ?? this.confirmDialogOption.header,
      message: confirmDialogOption.message ?? this.confirmDialogOption.message,
      icon: confirmDialogOption.icon ?? this.confirmDialogOption.icon,
    };
    this.confirmationService.confirm({
      key: confirmDialogOption.key ?? this.confirmDialogOption.key,
      header: confirmDialogOption.header ?? this.confirmDialogOption.header,
      message: confirmDialogOption.message ?? this.confirmDialogOption.message,
      icon: confirmDialogOption.icon ?? this.confirmDialogOption.icon,
      accept: () => {
        //DELETE ELEMENT
        callback(true);
      },
      reject: () => {
        //CLOSE DIALOG
        callback(false);
      }
    });
  }
}
