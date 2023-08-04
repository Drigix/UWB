import { Component, OnInit } from '@angular/core';
import { UploadEvent } from '@entities/uwb-file-upload/upload-event.model';

@Component({
  selector: 'uwb-file-upload',
  templateUrl: './uwb-file-upload.component.html'
})

export class UwbFileUploadComponent implements OnInit {

  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit() { }

  onUpload(event: UploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }
}
