import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@servicesPublic/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin = this.fb.nonNullable.group({
    username: ['hh@hh.es', [Validators.required, Validators.minLength(6)]],
    password: ['12345678', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  login() {
    this.authService.login(this.formLogin.getRawValue()).subscribe({
      next: (res) => this.router.navigate([`private/resume`]),
      error(err) {
        console.error(err.error.message);
      },
    });
  }
}
