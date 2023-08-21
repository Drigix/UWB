import { Component, OnInit } from '@angular/core';
import { IAnchor } from '@entities/anchor/anchor.model';
import { IBackground } from '@entities/background/background.model';
import { AnchorsService } from '@services/anchors/anchors.service';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-anchors',
  templateUrl: './anchors.component.html',
  styleUrls: ['./anchors.component.scss']
})
export class AnchorsComponent implements OnInit {

  backgrounds: IBackground[] = [];
  anchors: IAnchor[] = [];
  selectedBackground?: IBackground;
  selectedAnchor?: IAnchor;
  isDialogOpen = false;
  isEditDialog = false;
  mapClickMode: 'add' | 'else' = 'else';

  constructor(
    private backgroundsService: BackgroundsService,
    private anchorsService: AnchorsService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.loadBackgrounds();
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAll().subscribe((res) => {
      this.backgrounds = res;
    });
  }

  loadAnchors(): void {
    this.anchorsService.findAll().subscribe(
      (res) => {
        const anchors: IAnchor[] = res;
        this.anchors = anchors.filter(a => a.background!.id === this.selectedBackground?.id);
        this.anchors.forEach(a => {
          a.xPx = this.selectedBackground?.scale ? this.selectedBackground?.scale * a.x! : a.x;
          a.yPx = this.selectedBackground?.scale ? this.selectedBackground?.scale * a.y! : a.y;
        });
      }
    );
  }

  onBackgroundSelect(background: IBackground): void {
    this.selectedBackground = background;
    this.loadAnchors();
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
    this.isEditDialog ? this.mapClickMode = 'else' : this.mapClickMode = 'add';
    this.selectedAnchor = selectedAnchor;
    this.isDialogOpen = true;
  }

  openDeleteDialog(): void {
    this.confirmDialogService.openDeleteDialog({}, (confirmed: boolean) => {
      confirmed ? this.handleDeleteDialog() : null;
    });
  }

  handleDialogResponse(response: any) {
    this.mapClickMode = 'else';
    this.isDialogOpen = false;
    if(response) {
      this.selectedAnchor = undefined;
      this.anchors = [];
      this.loadAnchors();
    }
  }

  handleDeleteDialog(): void {
    console.log('DELETE');
  }
}
