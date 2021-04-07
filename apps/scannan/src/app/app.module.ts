import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NzSwitchModule,
    NzButtonModule,
    NzTableModule,
    NzLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
