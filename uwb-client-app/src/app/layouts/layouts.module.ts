import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  imports: [
    ComponentsModule,
    SharedModule
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
    ConfirmationService
  ],
})
export class LayoutsModule { }
