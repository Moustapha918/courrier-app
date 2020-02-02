import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';



import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DirectionModel} from '../models/direction.model';
import {ArrivedMailModel} from "../models/arrived-mail.model";



@Injectable({
  providedIn: 'root'
})
export class ReferentialService {
    getAllDirectionURI = environment.backendUrl + '/referential/direction/all';
    addNewDirectionURI = environment.backendUrl + '/referential/direction/add/new';
    directions: DirectionModel[];
    onDirectionChanged: BehaviorSubject<any>;

    constructor(private httpClient: HttpClient) {

        this.onDirectionChanged = new BehaviorSubject<any>({});
    }


    getAllDirections(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get<DirectionModel[]>(this.getAllDirectionURI)
                .subscribe((response: any) => {
                    this.directions = response;
                    console.log('this.Direction from service', this.directions);
                    this.onDirectionChanged.next(this.directions);

                    resolve(response);
                }, reject);
        });
    }

    sendDirectionFormToBackend(direction: DirectionModel): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewDirectionURI, direction);
    }


    getAllDirectionsFromBackend(): Observable<DirectionModel[]> {

        // if (!this.directions ){
        //
        // }
        return this.httpClient
            .get<DirectionModel[]>(this.getAllDirectionURI) ;
    }

}
