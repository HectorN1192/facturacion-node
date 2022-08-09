import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate([`/public/login`]);
  }
}
