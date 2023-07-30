import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { UsersService } from '@services/users/users.service';
import { ColumnService } from '@shared/uwb-table/column.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  users: any[] = [];
  date = new Date();
  selectedUser?: any;

  constructor(
    private dialogService: DialogService,
    private transalteService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private usersService: UsersService,
    private columnService: ColumnService
  ) { }

  ngOnInit() {
    this.columns = this.columnService.getUserColumns();
    this.loadUsers();
  }


  loadUsers(): void {
    this.usersService.findAll().subscribe(
      (response) => {
        this.users = response;
      }
    );
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
