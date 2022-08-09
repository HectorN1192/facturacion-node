import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [PrivateComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    PrivateRoutingModule,
  ],
})
export class PrivateModule {}
