import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class InitMailService{

    initParams: any[];
    private _unsubscribeAll: Subject<any>;



    constructor(private httpClient: HttpClient){
        this._unsubscribeAll = new Subject();
    }


    getInitParamsFromBackend(): void {
        this.httpClient
            .get<any[]>('http://localhost:8080/init-params/') // url to be defined
            .subscribe(
                (response) => {
                    this.initParams = response;
                    // this.emitInitMailSubject();
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }

    saveArrivedMailToBackend(arrivedMailForm): void {
        this.httpClient
            .post('http://localhost:8080/add/new', arrivedMailForm)
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


