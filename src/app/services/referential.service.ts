import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';



import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DirectionModel} from '../models/direction.model';
import {ServiceEntity} from '../models/service-entity.model';
import {DivisionModel} from '../models/division.model';




@Injectable({
  providedIn: 'root'
})
export class ReferentialService {
    getAllDirectionURI = environment.backendUrl + '/referential/direction/all';
    getAllServicesEntityURI = environment.backendUrl + '/referential/service/all';

    directions: DirectionModel[];
    onDirectionChanged: BehaviorSubject<any>;

    serviceEntity: ServiceEntity;
    onServiceEntityChanged: BehaviorSubject<any>;


    addNewDirectionURI = environment.backendUrl + '/referential/direction/add/new';
    addNewServiceEntityURI = environment.backendUrl + '/referential/service/add/new';

    addNewDivisionURI = environment.backendUrl + '/referential/division/add/new';
    getAllDivisionsURI = environment.backendUrl + '/referential/division/all';

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

    getAllServicesEntity(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get<ServiceEntity[]>(this.getAllServicesEntityURI)
                .subscribe((response: any) => {
                    this.serviceEntity = response;
                    console.log('this.Service from service', this.serviceEntity);
                    // this.onServiceEntityChanged.next(this.serviceEntity);

                    resolve(response);
                }, reject);
        });
    }

    sendDirectionFormToBackend(direction: DirectionModel): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewDirectionURI, direction);
    }

    sendServiceEntityFormToBackend(serviceEntity: ServiceEntity): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewServiceEntityURI, serviceEntity);
    }




    getAllDirectionsFromBackend(): Observable<DirectionModel[]> {

        // if (!this.directions ){
        //
        // }
        return this.httpClient
            .get<DirectionModel[]>(this.getAllDirectionURI) ;
    }


    getAllServiceEntityFromBackend(): Observable<ServiceEntity[]> {

        // if (!this.directions ){
        //
        // }
        return this.httpClient
            .get<ServiceEntity[]>(this.getAllServicesEntityURI) ;
    }


    // Division
    sendDivisionFormToBackend(division: DivisionModel): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewDivisionURI, division);
    }

    getAllDivisionsFromBackend(): Observable<DivisionModel[]> {
        return this.httpClient
            .get<DivisionModel[]>(this.getAllDivisionsURI) ;
    }

}
