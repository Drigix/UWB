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
import { SizeScreenService } from '@shared/screen/size-screen.service';
import { ClientsService } from '@services/clients/clients.service';
import { HttpResponse } from '@angular/common/http';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { AuthorityService } from '@auth/authority.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  users: IUser[] = [];
  treeSelectItems: IClientUnit[] = [];
  treeSelectItemSelected?: IClientUnit;
  selectedOrganizationUnit?: IClient;
  handleSelectedOrganizationUnit?: IClient;
  selectedUser?: IUser;
  userOrganizationUnitId?: number;
  loading = false;

  constructor(
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private usersService: UsersService,
    private columnService: ColumnService,
    private toastService: ToastService,
    private clientsService: ClientsService,
    private authorityService: AuthorityService,
    private sizeScreenService: SizeScreenService
  ) { }

  ngOnInit(): void {
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.loading = true;
    this.columns = this.columnService.getUserColumns();
    this.loadOrganizationUnits();
    this.loadUsers();
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.userOrganizationUnitId!)!;
        this.selectedOrganizationUnit = this.treeSelectItemSelected.data;
        this.handleSelectedOrganizationUnit = this.treeSelectItemSelected.data;
      }
    );
  }

  loadUsers(): void {
    this.loading = true;
    this.usersService.findAllByUserOrganizationUnit(this.selectedOrganizationUnit?.id! ?? this.userOrganizationUnitId).subscribe(
      (res: HttpResponse<IUser[]>) => {
        this.users = res.body ?? [];
        this.loading = false;
      }
    );
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    if(this.selectedOrganizationUnit?.id !== organizationUnit.id) {
      this.selectedOrganizationUnit = organizationUnit;
      this.handleSelectedOrganizationUnit = organizationUnit;
      this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedOrganizationUnit.id!)!;
      this.selectedUser = undefined;
      this.loadUsers();
    }
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(UserDialogComponent, {
      header: this.translateService.instant(edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'),
      data: {
        edit,
        selectedUser: this.selectedUser
      },
      width: this.sizeScreenService.smallScreen ? '100%' : '40%'
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
