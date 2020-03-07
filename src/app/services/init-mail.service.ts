import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AutoGenParamsModel} from '../models/auto-gen-params.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ArrivedMailModel} from '../models/arrived-mail.model';

@Injectable()
export class InitMailService implements Resolve<any>{

    autoGeneratedFieldsURI = environment.backendUrl + '/mailing/arrived/auto-gen-params';
    addNewArrivedMailURI = environment.backendUrl + '/mailing/arrived/add/new';
    getAllArrivedMAilsURI = environment.backendUrl + '/mailing/arrived/all';
    getAllArrivedMAilURI = environment.backendUrl + '/mailing/arrived/';
    uploadScanFileURI = environment.backendUrl + '/mailing/arrived/upload-scan';


    arrivedMails: ArrivedMailModel[];
    onarrivedMailsChanged: BehaviorSubject<any>;

    constructor(private httpClient: HttpClient){

        this.onarrivedMailsChanged = new BehaviorSubject<any>({});
    }

    getAutoGeneratedParamsFromBackend(): Observable<AutoGenParamsModel> {
        return this.httpClient
            .get<AutoGenParamsModel>(this.autoGeneratedFieldsURI);
    }

    sendArrivedMailFormToBackend(arrivedMail: ArrivedMailModel): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewArrivedMailURI, arrivedMail);
    }

    getAllArrivedMailsFromBackend(): Observable<ArrivedMailModel[]> {

        if (!this.arrivedMails ){

        }
        return this.httpClient
            .get<ArrivedMailModel[]>(this.getAllArrivedMAilsURI) ;
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getArrivedMails()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getArrivedMails(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.httpClient.get<ArrivedMailModel[]>(this.getAllArrivedMAilsURI)
                .subscribe((response: any) => {
                    this.arrivedMails = response;
                    console.log('this.arrivedMails from service', this.arrivedMails);
                    this.onarrivedMailsChanged.next(this.arrivedMails);

                    resolve(response);
                }, reject);
        });
    }

    getArrivedMail(idEntry: string): Observable<ArrivedMailModel> {
        if (!idEntry){

        }
        return this.httpClient
            .get<ArrivedMailModel>(this.getAllArrivedMAilURI + idEntry) ;
    }

    annotate(arrivedMail: ArrivedMailModel): Observable<any> {

        const arrivedMailAnnotateUri = environment.backendUrl + '/mailing/arrived/' + arrivedMail.idEntry + '/annotate';
        return this.httpClient.post(arrivedMailAnnotateUri, arrivedMail);

    }
}


