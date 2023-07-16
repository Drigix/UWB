import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

interface IToastOptions {
  key?: string;
  summary?: string;
  detail?: string;
  severity?: 'success' | 'warning' | 'error' | 'info';
}

@Injectable({providedIn: 'root'})
export class ToastService {

  private toastOption: IToastOptions = {
    key: 'mainToast'
  };

  constructor(
    private messageService: MessageService,
    private translateService: TranslateService
  ) { }

  showSuccessToast(toastOption: IToastOptions): void {
    this.toastOption.severity = 'success';
    this.toastOption.summary = toastOption.summary ?? this.translateService.instant('message.success');
    this.toastOption.detail = toastOption.detail ?? this.translateService.instant('message.success');
    this.messageService.add({
      key: this.toastOption.key,
      severity: this.toastOption.severity,
      summary: this.toastOption.summary,
      detail: this.toastOption.detail
    });
  }

  showErrorToast(toastOption: IToastOptions): void {
    this.toastOption.severity = 'error';
    this.toastOption.summary = toastOption.summary ?? this.translateService.instant('message.error');
    this.toastOption.detail = toastOption.detail ?? this.translateService.instant('message.error');
    this.messageService.add({
      key: this.toastOption.key,
      severity: this.toastOption.severity,
      summary: this.toastOption.summary,
      detail: this.toastOption.detail
    });
  }

  showInfoToast(toastOption: IToastOptions): void {
    this.toastOption.severity = 'info';
    this.toastOption.summary = toastOption.summary ?? this.translateService.instant('message.info');
    this.toastOption.detail = toastOption.detail ?? this.translateService.instant('message.info');
    this.messageService.add({
      key: this.toastOption.key,
      severity: this.toastOption.severity,
      summary: this.toastOption.summary,
      detail: this.toastOption.detail
    });
  }

  showWarningToast(toastOption: IToastOptions): void {
    this.toastOption.severity = 'warning';
    this.toastOption.summary = toastOption.summary ?? this.translateService.instant('message.warning');
    this.toastOption.detail = toastOption.detail ?? this.translateService.instant('message.warning');
    this.messageService.add({
      key: this.toastOption.key,
      severity: this.toastOption.severity,
      summary: this.toastOption.summary,
      detail: this.toastOption.detail
    });
  }
}
