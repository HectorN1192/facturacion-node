import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@servicesPublic/auth.service';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckloginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => isLogged)
    );
  }
}
