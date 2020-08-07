import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(public auth: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('intrecept request -----------', request);
        request = request.clone({
            setHeaders: {
                'Authorization': `Bearer ${this.auth.getToken()}`,
                'Access-Control-Allow-Origin': '*'
            }
        });
        return next.handle(request);
    }
}
