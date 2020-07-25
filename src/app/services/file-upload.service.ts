import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    downloadFileUrl = environment.backendUrl + '/mailing/arrived/download-scan/';

  constructor(private httpClient: HttpClient) { }

  downLoadFile(idDirectory: string, idScanFile: string): Observable<any>{

      return this.httpClient.get(this.downloadFileUrl + idDirectory + '/' + idScanFile, { responseType: 'blob' });
  }


}
