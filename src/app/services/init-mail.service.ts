import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AutoGenParamsModel} from '../models/auto-gen-params.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ArrivedMailModel} from '../models/arrived-mail.model';
import {StepsModel} from '../models/stepsModel';


const annotations  = [
    {code: '1' , labelFR: 'M’en Parler', labelAR: 'للنقاش'},
    {code: '2', labelFR: 'Suite à Donner', labelAR: 'لإعطاء متابعة'},
    {code: '3', labelFR: 'Exploitation', labelAR: 'إستغلال'},
    {code: '4', labelFR: 'Suivi', labelAR: 'متابعة'},
    {code: '5', labelFR: 'Attribution', labelAR: 'إسناد'},
    {code: '6', labelFR: 'Etude et Avis', labelAR: 'دراسة و رأي'},
    {code: '7', labelFR: 'Disposition à prendre', labelAR: 'اتخاذ ترتيبات'},
    {code: '8', labelFR: 'Faire Nécessaire', labelAR: 'اتخاذ ما يلزم'}
];
const index1 = [0, 1, 2, 3];
const index2 = [4, 5, 6, 7];

@Injectable()
export class InitMailService implements Resolve<any>{

    autoGeneratedFieldsURI = environment.backendUrl + '/mailing/arrived/auto-gen-params';
    addNewArrivedMailURI = environment.backendUrl + '/mailing/arrived/add/new';
    getAllArrivedMAilsURI = environment.backendUrl + '/mailing/arrived/all';
    getAllArrivedMAilsSCURI = environment.backendUrl + '/mailing/arrived/all/sc';
    getAllArrivedMAilURI = environment.backendUrl + '/mailing/arrived/';
    uploadScanFileURI = environment.backendUrl + '/mailing/arrived/upload-scan';
    getActiveUserURI = environment.backendUrl + '/mailing/getuser';



    arrivedMails: ArrivedMailModel[];
    onarrivedMailsChanged: BehaviorSubject<any>;

    annotations: any;
    index1: any;
    index2: any;

    constructor(private httpClient: HttpClient){

        this.onarrivedMailsChanged = new BehaviorSubject<any>({});
        this.annotations = annotations;
        this.index1 = index1;
        this.index2 = index2;
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
                this.getArrivedMailsSC()
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
                    // setTimeout(() => { console.log('____________'); this.onarrivedMailsChanged.next(this.arrivedMails); resolve(response); }, 10000)
                    this.onarrivedMailsChanged.next(this.arrivedMails);
                    resolve(response);
                }, reject);
        });
    }

    getArrivedMailsSC(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.httpClient.get<ArrivedMailModel[]>(this.getAllArrivedMAilsURI)
                .subscribe((response: any) => {
                    this.arrivedMails = response;
                    console.log('this.arrivedMails from service', this.arrivedMails);
                    // setTimeout(() => { console.log('____________'); this.onarrivedMailsChanged.next(this.arrivedMails); resolve(response); }, 10000)
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


}


