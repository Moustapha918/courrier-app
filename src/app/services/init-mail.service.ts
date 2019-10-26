import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AutoGenParamsModel} from '../models/auto-gen-params.model';
import {Subject} from 'rxjs';

@Injectable()
export class InitMailService{

    autoGenParamsModel = new AutoGenParamsModel(
        'AR201900025',
        'Dossier-1',
        '01/09/2019 14:30:20');
    private autoGenParamsJson = [
        {
            idEntry: 'AR201900025',
            idDirectory: 'Dossier-1',
            receptionDate: '01/09/2019 14:30:20'
        }
    ];

    autoGenParams2: AutoGenParamsModel;
    urlFirebase = 'https://courrier-backend.firebaseio.com/auto-gen-params.json';
    urlBackend = 'http://localhost:8080/mailing/arrived/auto-gen-params';
    autIdEntry: string; // 'AR20190013';
    autoGenParamsSubject = new Subject<AutoGenParamsModel>();
    headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});

    getAutoIdEntry(): string{
        return  this.autIdEntry = 'AR20190091';
    }

    emitAuoGenParams(): void {
        this.autoGenParamsSubject.next(this.autoGenParams2);
    }



    constructor(private httpClient: HttpClient){
        // this._unsubscribeAll = new Subject();
        // this.autoGenParams2 = this.httpClient.get(this.urlFirebase).map(res => res.json());
    }


    saveAutoGenParamsToFirebase(): void {
        // only for test purpose
        this.httpClient
            .post(this.urlFirebase, this.autoGenParamsModel)
            .subscribe(
                () => {
                    console.log('Enregistrement terminé !');
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }

//     this.courses$ = this.http
//         .get<Course[]>("/courses.json")
//         .map(data => _.values(data))
//         .do(console.log);
// }

    getAutoGenParamsFromFirebase(urlPath: string): void {
        this.httpClient
            .get<AutoGenParamsModel>(urlPath, {headers:this.headers})
            .subscribe(
                (data) => {
                    this.autoGenParams2 = data['-Ls2brEz3-XXlszbiC1r'];
                    this.emitAuoGenParams();
                    console.log(this.autoGenParams2);
                    console.log('this is the idEntry ' + this.autoGenParams2.idEntry);
                    // autoGenParamsModelParam = this.autoGenParams2;
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
        // this.emitAuoGenParams();
        console.log(this.autoGenParams2);
        // this.autIdEntry = 'AR20190078';
    }



    getInitParamsFromBackend(): void {
        this.httpClient
            .get<AutoGenParamsModel>(this.urlBackend) // url to be defined
            .subscribe(
                (response) => {
                    // this.autoGenParams = response;
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }

    saveArrivedMailToBackend(arrivedMailForm): void {
        this.httpClient
            .post(this.urlBackend, arrivedMailForm)
            .subscribe(
                () => {
                    console.log('Arrrived mail sent to backend !');
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }

}


