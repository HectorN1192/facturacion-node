import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import {
  UserInterface,
  UserResponseInterface,
} from '@modelsPublic/user.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';

const helper = new JwtHelperService();
@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData: UserInterface): Observable<UserResponseInterface | void> {
    return this.httpClient
      .post<UserResponseInterface>(
        `${environment.api_url}/auth/login`,
        authData
      )
      .pipe(
        map((res: UserResponseInterface) => {
          this.saveToken(res.token);
          this.loggedIn.next(true);
          return res;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token') ?? '';
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logout() : this.loggedIn.next(true);
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
