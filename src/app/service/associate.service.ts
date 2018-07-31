import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders }  from  '@angular/common/http';
import { Associate } from '../model/associate';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  constructor(private httpClient: HttpClient) { }

  public getAssociatesList() : Observable<any> {
    return this.httpClient.get<Associate>(AppSettings.ASSOCIATE_SERVICE_BASE_URL + '/');
  }

  public getAssociateById(associateId: number) : Observable<Associate>{
    return this.httpClient.get<Associate>(AppSettings.ASSOCIATE_SERVICE_BASE_URL + '/'+ associateId);
  }

  public saveAssociate(associateObj: Associate): Observable<number>{
    return this.httpClient.post<number>(AppSettings.ASSOCIATE_SERVICE_BASE_URL + '/', associateObj);
  }

  public updateAssociate(associateObj: Associate): Observable<number>{
    return this.httpClient.put<number>(AppSettings.ASSOCIATE_SERVICE_BASE_URL + '/', associateObj);
  }

  public deleteAssociate(associateId: number): Observable<boolean>{
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.delete<boolean>(AppSettings.ASSOCIATE_SERVICE_BASE_URL + '/'+associateId, {headers: httpHeaders});
  }

  public getAssociatesSkills() : Observable<any> {
    return this.httpClient.get<Associate>(AppSettings.ASSOCIATE_SERVICE_BASE_URL + '/skills/');
  }
}
