import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorityService } from '@auth/authority.service';
import { Observable, Observer } from 'rxjs';
import Stomp, { Client } from 'webstomp-client';
import * as SockJS from 'sockjs-client';

@Injectable({providedIn: 'root'})
export class LocalizationsService {

  private resourceUrl = '../../../assets/data/data-localization.json';
  private websocketUrl = '//localhost:8080/ws';
  private connection?: Promise<any>;
  private stompClient?: Client;
  private connectedPromise?: any;
  private socket: any;
  private reconnectAttempt?: number;
  private listenerObserver?: Observer<any>;
  private listener?: Observable<any>;

  constructor(
    private http: HttpClient,
    private authorityService: AuthorityService
  ) {
    this.listener = this.createListener();
  }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  connect(): void {
    this.connection = this.createConnection();
    this.socket = new SockJS(this.websocketUrl);
    this.stompClient = Stomp.over(this.socket, { debug: false });

    const headers = {};
    this.stompClient.connect(headers, () => {
      this.reconnectAttempt = 0;
      this.connectedPromise('success');
    });
  }

  disconnect(): void {
    if(this.stompClient !== null) {
      if(this.connectedPromise !== null) {
        this.connection?.then(() => {
          this.stompClient?.send('/app/stop/localizactions/tag');
          this.stompClient?.disconnect();
          this.stompClient = undefined;
        });
      } else {
        this.stompClient?.disconnect();
        this.stompClient = undefined;
      }
    }
  }

  subscribe(backgroundId: number): void {
    this.connection?.then(() => {
      this.stompClient?.send('/app/send/localizactions/tag', backgroundId.toString());
      this.stompClient?.subscribe('/topic/localizactions/tag', (data) => {
        this.listenerObserver!.next(JSON.parse(data.body));
      });
    });
  }

  unsubscribe(): void {
    if(this.stompClient?.connected) {
      this.stompClient?.send('/app/stop/localizactions/tag');
      this.stompClient?.unsubscribe('');
    }
  }

  receive(): Observable<any> {
    return this.listener!;
  }

  private createListener(): Observable<any> {
    return new Observable((observer) => {
      this.listenerObserver = observer;
    });
  }

  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => ( this.connectedPromise = resolve ));
  }

}
