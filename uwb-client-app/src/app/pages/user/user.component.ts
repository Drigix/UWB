import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  date = new Date();
  selectedUser?: any;

  constructor(
    private dialogService: DialogService,
    private transalteService: TranslateService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(UserDialogComponent, {
      header: this.transalteService.instant(edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'),
      data: {
        edit,
        selectedUser: this.selectedUser
      }
    });
    ref.onClose.subscribe((response) => this.handleDialogResponse(response));
  }

  openDeleteDialog(): void {
    this.confirmDialogService.openDeleteDialog({}, (confirmed: boolean) => {
      confirmed ? this.handleDeleteDialog() : null;
    });
  }

  handleDialogResponse(response: any) {

  }

  handleDeleteDialog(): void {
    console.log('DELETE');
  }
}
