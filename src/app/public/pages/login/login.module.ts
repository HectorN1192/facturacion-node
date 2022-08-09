import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MatInputModule, MatButtonModule, LoginRoutingModule],
})
export class LoginModule {}
