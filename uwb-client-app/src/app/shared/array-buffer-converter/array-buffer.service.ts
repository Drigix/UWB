import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ArrayBufferService {
  constructor() { }

  convertImage(pathArrayBuffer: string): string {
    const arrayBuffer = this.stringArrayBufferToArrayBuffer(pathArrayBuffer);
    return this.arrayBufferToImage(arrayBuffer);
  }

  private stringArrayBufferToArrayBuffer(stringArrayBuffer: string): ArrayBuffer {
    const binaryString = atob(stringArrayBuffer);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array.buffer;
  }

  private arrayBufferToImage(arrayBuffer: ArrayBuffer): string {
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    return url;
  }
}
