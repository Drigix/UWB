import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatetime'
})

export class FormatDatetimePipe implements PipeTransform {
  transform(date: Date): string {
    return this.formatDate(date);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }
}
