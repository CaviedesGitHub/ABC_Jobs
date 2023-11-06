import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './Auth.component';
import { LoginComponent } from './Login/Login.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [AuthComponent, LoginComponent, SignUpComponent],
  exports: [AuthComponent, LoginComponent, SignUpComponent],
})
export class AuthModule { }
