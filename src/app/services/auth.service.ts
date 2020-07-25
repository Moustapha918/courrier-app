import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    loginUrl = environment.backendUrl + '/login';
    userDetailsUrl = environment.backendUrl + '/users/user-details';

  constructor( public jwtHelper: JwtHelperService, private httpClient: HttpClient,
               private router: Router) { }


    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    public login(username: string, password: string): Observable<HttpResponse<any>>{
      return this.httpClient.post<HttpResponse<any>>(this.loginUrl,
          {username: username, password: password},
          {observe: 'response'});
    }

    public logout(): void{
        localStorage.clear();
        this.router.navigate(['login']);
    }

    public getToken(): string {
        return localStorage.getItem('token');

    }

    loadUserDetails(): void {
        this.httpClient.get(this.userDetailsUrl).subscribe(
            userDetails => localStorage.setItem('user', JSON.stringify(userDetails)),
            error => console.log('Error while loading user details and roles')
            );
    }
}
