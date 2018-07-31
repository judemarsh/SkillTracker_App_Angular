import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders }  from  '@angular/common/http';
import { Skill } from '../model/skill';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skillList: Skill[];

  constructor(private httpClient: HttpClient) {
    this.skillList = [];
   }

  public getSkillsList() : Observable<any> {
    return this.httpClient.get<Skill[]>(AppSettings.SKILL_SERVICE_BASE_URL + '/');
  }

  public getSkillById(skillId: number) : Observable<Skill>{
    return this.httpClient.get<Skill>(AppSettings.SKILL_SERVICE_BASE_URL + '/'+ skillId);
  }

  public saveSkill(skillObj: Skill): Observable<number>{
    return this.httpClient.post<number>(AppSettings.SKILL_SERVICE_BASE_URL + '/', skillObj);
  }

  public updateSkill(skillObj: Skill): Observable<number>{
    return this.httpClient.put<number>(AppSettings.SKILL_SERVICE_BASE_URL + '/', skillObj);
  }

  public deleteSkill(skillId: number): Observable<boolean>{
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.delete<boolean>(AppSettings.SKILL_SERVICE_BASE_URL + '/'+skillId, {headers: httpHeaders});
  }
}
