import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {FuseNavigationService} from '../../@fuse/components/navigation/navigation.service';
import { navigation } from 'app/navigation/navigation';
import { navigationNonSG } from 'app/navigation/navigationNonSG';
import {ApplicationUserModel} from '../models/applicationUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    loginUrl = environment.backendUrl + '/login';
    userDetailsUrl = environment.backendUrl + '/users/user-details';
    navigation: any;

  constructor( public jwtHelper: JwtHelperService, private httpClient: HttpClient,
               private router: Router, private _fuseNavigationService: FuseNavigationService) { }


    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    public login(username: string, password: string): Observable<HttpResponse<any>>{

      return this.httpClient.post<HttpResponse<any>>(this.loginUrl,
          {username: username.toLocaleLowerCase(), password: password},
          {observe: 'response'});

    }

    public logout(): void{
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        this._fuseNavigationService.unregister('main');
        this.router.navigate(['login']);
    }

    public getToken(): string {
        return localStorage.getItem('token');

    }

    loadUserDetails(): void {
        this.httpClient.get(this.userDetailsUrl).subscribe(
            ( userDetails: ApplicationUserModel) => {
                localStorage.setItem('user', JSON.stringify(userDetails));

                if (userDetails != null && userDetails.fonction === 'FONCTION_SG') {
                    this.navigation = navigation;
                } else {
                    this.navigation = navigationNonSG;
                }
                this._fuseNavigationService.register('main', this.navigation);
            },
            error => console.log('Error while loading user details and roles')
            );
    }
}
