import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginModule } from '@pages/login/login.module';


@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    LoginModule
  ],
  exports: [
    MainComponent,
    MenuComponent
  ],
  declarations: [
    MainComponent,
    MenuComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
  ],
})
export class LayoutsModule { }
