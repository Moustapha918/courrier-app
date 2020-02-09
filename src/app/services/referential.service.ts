import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';



import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DirectionModel} from '../models/direction.model';
import {ArrivedMailModel} from "../models/arrived-mail.model";
import {ServiceEntityModel} from "../models/service-entity.model";
import {DepartmentModel} from "../models/departement.model";

import {DivisionModel} from '../models/division.model';




@Injectable({
  providedIn: 'root'
})
export class ReferentialService {
    getAllDirectionURI = environment.backendUrl + '/referential/direction/all';
    getAllServicesEntityURI = environment.backendUrl + '/referential/service/all';
    getAllDepartmentURI = environment.backendUrl + '/referential/department/all';


    directions: DirectionModel[];
    onDirectionChanged: BehaviorSubject<any>;

    serviceEntity: ServiceEntityModel;
    onServiceEntityChanged: BehaviorSubject<any>;


    addNewDirectionURI = environment.backendUrl + '/referential/direction/add/new';
    addNewServiceEntityURI = environment.backendUrl + '/referential/service/add/new';
    addNewDepartementURI = environment.backendUrl + '/referential/department/add/new';


    deleteDirectionURI = environment.backendUrl + '/referential/direction/delete/';
    deleteServiceEntityURI = environment.backendUrl + '/referential/service/delete/';
    deleteDivisionURI = environment.backendUrl + '/referential/division/delete/';
    deleteDepartmentURI = environment.backendUrl + '/referential/department/delete/';



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
            this.httpClient.get<ServiceEntityModel[]>(this.getAllServicesEntityURI)
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

    sendServiceEntityFormToBackend(serviceEntity: ServiceEntityModel): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewServiceEntityURI, serviceEntity);
    }

    sendDepartementFormToBackend(departement: DepartmentModel): Observable<any> {
        return this.httpClient
            .post<any>(this.addNewDepartementURI, departement);
    }




    getAllDirectionsFromBackend(): Observable<DirectionModel[]> {

        // if (!this.directions ){
        //
        // }
        return this.httpClient
            .get<DirectionModel[]>(this.getAllDirectionURI) ;
    }


    getAllServiceEntityFromBackend(): Observable<ServiceEntityModel[]> {
        return this.httpClient
            .get<ServiceEntityModel[]>(this.getAllServicesEntityURI) ;
    }

    getAllDepartmentFromBackend(): Observable<DepartmentModel[]> {
        return this.httpClient
            .get<DepartmentModel[]>(this.getAllDepartmentURI) ;
    }


    deleteDirection(code: string): Observable<DirectionModel> {
        console.log(this.deleteDirectionURI + code );
        return this.httpClient
            .delete<DirectionModel>(this.deleteDirectionURI  + code ) ;
    }

    deleteServiceEntity(code: string): Observable<ServiceEntityModel> {
        console.log(this.deleteServiceEntityURI + code );
        return this.httpClient
            .delete<ServiceEntityModel>(this.deleteServiceEntityURI  + code ) ;
    }

    deleteDepartement(code: string): Observable<DepartmentModel> {
        console.log(this.deleteDepartmentURI + code );
        return this.httpClient
            .delete<DepartmentModel>(this.deleteDepartmentURI  + code ) ;
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
