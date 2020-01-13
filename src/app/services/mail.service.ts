import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ArrivedMailModel} from '../models/arrived-mail.model';
import {InitMailService} from './init-mail.service';

@Injectable()
export class MailService implements Resolve<any> {


    constructor( private initmailService: InitMailService ){

    }
    mail: ArrivedMailModel;
    routeParams: any;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        this.routeParams = route.params;

        console.log('_ _______________  resolve  ______________');
        return new Promise((resolve, reject) => {

            Promise.all([

                // this.getArrivedMail(this.routeParams.id)
            ]).then(
                () => {

                    resolve();
                },
                reject
            );
        });
    }

}