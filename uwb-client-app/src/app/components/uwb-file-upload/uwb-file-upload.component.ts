import { Component, Input, OnInit } from '@angular/core';
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
  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit() { }

  onUpload(event: UploadEvent) {
    // for(let file of event.currentFiles) {
    //     this.uploadedFiles.push(file);
    // }
  }

  onSelect(event: UploadEvent): void {
    this.uploadedFiles = event.currentFiles;
    console.log(this.uploadedFiles);
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
}
