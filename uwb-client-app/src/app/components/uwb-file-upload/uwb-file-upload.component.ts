import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { IBackground } from '@entities/background/background.model';
import { IIcon } from '@entities/icon/icon.model';
import { UploadEvent } from '@entities/uwb-file-upload/upload-event.model';

@Component({
  selector: 'uwb-file-upload',
  templateUrl: './uwb-file-upload.component.html'
})

export class UwbFileUploadComponent implements OnInit {

  @Input() showUploadButton = true;
  @Input() showCancelButton = true;
  @Input() fileSize = 1000000;
  @Input() multiple = false;
  @Input() requestName = 'file';
  @Input() urlPath = '';
  @Input() urlMethod = 'post';
  @Output() emitSelectItems = new EventEmitter<IBackground[] | IIcon[]>();
  @Output() emitSelectItem = new EventEmitter<IBackground | IIcon>();
  @Output() emitUploadedItems = new EventEmitter<any>();
  uploadedFiles: any[] = [];
  url = API_URL;

  constructor() { }

  ngOnInit() {
    this.url += this.urlPath;
  }

  onUpload(event: UploadEvent) {
    for(let file of event.currentFiles) {
        this.uploadedFiles.push(file);
    }
  }

  onSelect(event: UploadEvent): void {
    this.uploadedFiles = event.currentFiles;
    if(!this.multiple) {
      const uploadedBackground = this.changeFileToBackground(this.uploadedFiles[0]);
      this.emitSelectItem.emit(uploadedBackground);
      this.emitUploadedItems.emit(this.uploadedFiles[0]);
    }
  }

  onRemove(event: any): void {
    console.log(event);
    this.uploadedFiles.forEach((file, index) => {
      if(event.file === file) {
        console.log(file);
        this.uploadedFiles.splice(index, 1);
      }
    });
    console.log(this.uploadedFiles);
  }

  private changeFileToBackground(uploadedFile: any): IBackground {
    const background = { fileName: uploadedFile.name, fileSize: uploadedFile.size };
    return background;
  }
}
