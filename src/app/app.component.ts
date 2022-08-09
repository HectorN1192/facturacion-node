import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-back';

  constructor(private http: HttpClient) {
    this.login().subscribe({
      next: (res) => console.log(res),
    });
  }

  login = (): Observable<any> => {
    return this.http.post('http://localhost:3000/auth/login', {
      username: 'hh@hh.es',
      password: '12345678',
    });
  };
}
