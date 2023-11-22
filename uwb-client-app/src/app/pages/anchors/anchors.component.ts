import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '@auth/authority.service';
import { IAnchor } from '@entities/anchor/anchor.model';
import { IBackground } from '@entities/background/background.model';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { TranslateService } from '@ngx-translate/core';
import { AnchorsService } from '@services/anchors/anchors.service';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { ClientsService } from '@services/clients/clients.service';
import { ArrayBufferService } from '@shared/array-buffer-converter/array-buffer.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { SizeScreenService } from '@shared/screen/size-screen.service';
import { ToastService } from '@shared/toast/toast.service';

@Component({
  selector: 'app-anchors',
  templateUrl: './anchors.component.html',
  styleUrls: ['./anchors.component.scss']
})
export class AnchorsComponent implements OnInit {

  treeSelectItems: IClientUnit[] = [];
  backgrounds: IBackground[] = [];
  anchors: IAnchor[] = [];
  selectedBackground?: IBackground;
  selectedAnchor?: IAnchor;
  treeSelectItemSelected?: IClientUnit;
  selectedOrganizationUnit?: IClient;
  userOrganizationUnitId?: number;
  isDialogOpen = false;
  isEditDialog = false;
  smallScreen = false;
  mapClickMode: 'add' | 'edit' | 'else' = 'else';

  constructor(
    private backgroundsService: BackgroundsService,
    private anchorsService: AnchorsService,
    private confirmDialogService: ConfirmDialogService,
    private authorityService: AuthorityService,
    private arrayBufferService: ArrayBufferService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private clientsService: ClientsService,
    private sizeScreenService: SizeScreenService
  ) { }

  ngOnInit() {
    this.sizeScreenService.smallScreen$.subscribe((smallScreen) => {
      this.smallScreen = smallScreen;
    });
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.loadOrganizationUnits();
    this.loadBackgrounds();
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.userOrganizationUnitId!)!;
        this.selectedOrganizationUnit = this.treeSelectItemSelected.data;
      }
    );
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAllByUserOrganizationUnit(this.selectedOrganizationUnit?.id ?? this.userOrganizationUnitId!).subscribe(
      (res: HttpResponse<IBackground[]>) => {
        this.backgrounds = res.body ?? [];
        this.backgrounds.forEach(b => b.fullPath = this.arrayBufferService.convertImage(b.pathArrayBuffer!));
      }
    );
  }

  loadAnchors(backgroundId?: number): void {
    this.anchorsService.findAllByBackground(backgroundId!).subscribe(
      (res: HttpResponse<IAnchor[]>) => {
        this.anchors = res.body ?? [];
      }
    );
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    if(this.selectedOrganizationUnit?.id !== organizationUnit.id) {
      this.selectedOrganizationUnit = organizationUnit;
      this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedOrganizationUnit.id!)!;
      this.selectedBackground = undefined;
      this.selectedAnchor = undefined;
      this.loadBackgrounds();
    }
  }

  onBackgroundSelect(background: IBackground): void {
    this.selectedBackground = background;
    this.loadAnchors(this.selectedBackground.id);
  }

  onAnchorSelect(anchor: IAnchor): void {
    this.selectedAnchor = anchor;
    if(!this.selectedAnchor) {
      this.isDialogOpen = false;
      this.mapClickMode = 'else';
    }
  }

  onAddNewPoint(anchor: IAnchor) {
    anchor.x! /= this.selectedBackground?.scale!;
    anchor.y! /= this.selectedBackground?.scale!;
    this.selectedAnchor = anchor;
  }

  openDialog(edit = false, selectedAnchor?: IAnchor): void {
    this.isEditDialog = edit;
    this.isEditDialog ? this.mapClickMode = 'edit' : this.mapClickMode = 'add';
    this.selectedAnchor = selectedAnchor;
    this.isDialogOpen = true;
  }

  openDeleteDialog(anchor?: IAnchor): void {
    this.confirmDialogService.openDeleteDialog({}, (confirmed: boolean) => {
      confirmed ? this.handleDeleteDialog(anchor?.id) : null;
    });
  }

  handleDialogResponse(response: any) {
    this.mapClickMode = 'else';
    this.isDialogOpen = false;
    if(response) {
      this.selectedAnchor = undefined;
      this.anchors = [];
      this.loadAnchors(this.selectedBackground?.id);
    }
  }

  handleDeleteDialog(anchorId?: number): void {
    this.anchorsService.delete(anchorId!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('anchor.dialog.deleteSuccess')});
          this.handleDialogResponse(true);
        },
        error: (err) => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('anchor.dialog.deleteError')});
        }
      }
    );
  }
}
