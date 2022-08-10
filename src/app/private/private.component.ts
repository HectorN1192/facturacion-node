import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@servicesPublic/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent {
  constructor(private router: Router, public authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.router.navigate([`/public/login`]);
  }
}
