import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    loginUrl = environment.backendUrl + '/login'

  constructor( public jwtHelper: JwtHelperService, private httpClient: HttpClient) { }


    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }

    public login(username: string, password: string): Observable<HttpResponse<any>>{
      this.httpClient.post<HttpResponse<any>>(this.loginUrl,
          {username: username, password: password},
          {observe: 'response'})
          .subscribe((res) => {
              localStorage.setItem('token', res.body['Authorization']);
              console.log(res.body);
        }, error => console.log(error.status));
      return null;
    }
}
