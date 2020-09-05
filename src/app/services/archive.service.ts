import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ArchiveModel} from '../models/archive.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ArchiveService implements Resolve<any>{
    getAllArchiveURI = environment.backendUrl + '/archive/all';

    onArchiveMailsChanged: BehaviorSubject<any>;

    archiveMails: ArchiveModel[];

    constructor(private httpClient: HttpClient){

        this.onArchiveMailsChanged = new BehaviorSubject<any>({});
    }

    getAllArchiveMails(): Observable<ArchiveModel[]>{

        return  this.httpClient.get<ArchiveModel[]>(this.getAllArchiveURI);

        /*.subscribe(archiveMails => {

                this.onArchiveMailsChanged.next(archiveMails);

                this.archiveMails = archiveMails;

                console.log(this.archiveMails);
            },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' Message is : ' + error.message);
            });
        return null;*/
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArchiveModel[]> {
        return this.getAllArchiveMails();
    }
}
