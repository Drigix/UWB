import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateService {
  constructor() { }

  public formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours).padStart(2, '0');
    const minutes = String(date.getHours).padStart(2, '0');
    const seconds = String(date.getSeconds).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  public formatDateWithoutTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public checkIfDateEquals(firstDate: Date, secondDate: Date): boolean {
    return firstDate.toDateString() === secondDate.toDateString();
  }
}
