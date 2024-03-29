import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AutoGenParamsModel} from '../models/auto-gen-params.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ArrivedMailModel} from '../models/arrived-mail.model';
import {StepsModel} from '../models/stepsModel';
import {DepartureMailModel} from '../models/departure-mail.model';


@Injectable()
export class InitMailService implements Resolve<any>{

    autoGeneratedFieldsURI = environment.backendUrl + '/mailing/arrived/auto-gen-params';
    addNewArrivedMailURI = environment.backendUrl + '/mailing/arrived/add/new';
    getAllArrivedMAilsURI = environment.backendUrl + '/mailing/arrived/all';
    getAllArrivedMAilURI = environment.backendUrl + '/mailing/arrived/';
    uploadScanFileURI = environment.backendUrl + '/mailing/arrived/upload-scan';
    getActiveUserURI = environment.backendUrl + '/mailing/getuser';


    // Departutre URI
    autoGeneratedDepartureFieldsURI = environment.backendUrl + '/mailing/depart/auto-gen-params';
    addNewDepartureMailURI = environment.backendUrl + '/mailing/depart/add';
    getAllDepartureMAilsURI = environment.backendUrl + '/mailing/depart/all';
    getAllDepartureMAilByIdURI = environment.backendUrl + '/mailing/depart/';
    uploadScanFileDepartureURI = environment.backendUrl + '/mailing/depart/upload-scan';




    arrivedMails: ArrivedMailModel[];
    departureMails: DepartureMailModel[];
    onarrivedMailsChanged: BehaviorSubject<any>;
    onDepartureMailsChanged: BehaviorSubject<any>;

    departureMail: DepartureMailModel;

    constructor(private httpClient: HttpClient){

        this.onarrivedMailsChanged = new BehaviorSubject<any>({});
        this.onDepartureMailsChanged = new BehaviorSubject<any>({});

    }

    getAutoGeneratedParamsFromBackend(): Observable<AutoGenParamsModel> {
        return this.httpClient
            .get<AutoGenParamsModel>(this.autoGeneratedFieldsURI);
    }

    sendArrivedMailFormToBackend(arrivedMail: ArrivedMailModel): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewArrivedMailURI, arrivedMail);
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getArrivedMailsSC(),

            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    getArrivedMailsSC(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.httpClient.get<ArrivedMailModel[]>(this.getAllArrivedMAilsURI)
                .subscribe((response: any) => {
                    this.arrivedMails = response;

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

    annotateAndVentilate(arrivedMail: ArrivedMailModel, step: StepsModel): Observable<any> {

        const arrivedMailAnnotateUri = environment.backendUrl + '/mailing/arrived/' + arrivedMail.idEntry + '/annotate';
        return this.httpClient.post(arrivedMailAnnotateUri, step);

    }


    // Departure services
    getAutoGeneratedParamsDepartureFromBackend(): Observable<AutoGenParamsModel> {
        return this.httpClient
            .get<AutoGenParamsModel>(this.autoGeneratedDepartureFieldsURI);
    }

    sendDepartureMailFormToBackend(arrivedMail: ArrivedMailModel): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewDepartureMailURI, arrivedMail);
    }



    getAllDepartureMails(): DepartureMailModel[]{
        this.httpClient.get<DepartureMailModel[]>(this.getAllDepartureMAilsURI).subscribe(departureMails => {
                console.log('get all departures');
                this.onDepartureMailsChanged.next(departureMails);

                this.departureMails = departureMails;

                console.log(this.departureMails);
            },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' Message is : ' + error.message);
            });
        return this.departureMails;
    }

    getDepartureMail(idEntry: string): Observable<DepartureMailModel> {
        if (!idEntry){

        }
        return this.httpClient
            .get<DepartureMailModel>(this.getAllDepartureMAilByIdURI + idEntry) ;
    }


    closeMail(idEntry: string, step: StepsModel): Observable<any> {
        const closeMailURI = environment.backendUrl + `/mailing/arrived/${idEntry}/terminate`;
        return this.httpClient.post(closeMailURI, step);
    }
}


