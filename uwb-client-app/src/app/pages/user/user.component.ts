import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { UsersService } from '@services/users/users.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { IUser } from '@entities/user/user.model';
import { ToastService } from '@shared/toast/toast.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  users: IUser[] = [];
  selectedUser?: IUser;
  loading = false;

  constructor(
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private usersService: UsersService,
    private columnService: ColumnService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.columns = this.columnService.getUserColumns();
    this.loadUsers();
  }


  loadUsers(): void {
    this.loading = true;
    this.usersService.findAll().subscribe(
      (response) => {
        this.users = response;
        this.loading = false;
      }
    );
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(UserDialogComponent, {
      header: this.translateService.instant(edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'),
      data: {
        edit,
        selectedUser: this.selectedUser
      },
      width: '40%'
    });
    ref.onClose.subscribe((response) => this.handleDialogResponse(response));
  }

  openDeleteDialog(): void {
    this.confirmDialogService.openDeleteDialog({}, (confirmed: boolean) => {
      confirmed ? this.handleDeleteDialog() : null;
    });
  }

  handleDialogResponse(response: any) {
    if(response) {
      this.selectedUser = undefined;
      this.loadUsers();
    }
  }

  handleDeleteDialog(): void {
    this.usersService.delete(this.selectedUser?.id!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('user.dialog.deleteSuccess')});
          this.handleDialogResponse(true);
        },
        error: (err) => {
          console.log(err);
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('user.dialog.deleteError')});
        }
      }
    );
  }
}
