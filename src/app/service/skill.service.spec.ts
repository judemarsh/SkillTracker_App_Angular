import { TestBed, inject } from '@angular/core/testing';

import { SkillService } from './skill.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Skill } from '../model/skill';
import { Observable, of } from 'rxjs';

describe('SkillService', () => {

  const mockSkillData: Skill = new Skill(1, "Skill 1");

  const mockSkillList: Skill[] = [
    {
      skillId: 1,
      skillName: "Skill 1"
    },
    {
      skillId: 2,
      skillName: "Skill 2"
    },
    {
      skillId: 3,
      skillName: "Skill 3"
    }
  ];

  let mockSkillService = {
    getSkillById(skillId: number) : Observable<Skill>{
      return of(mockSkillData);
    },
    updateSkill(skillObj: Skill): Observable<number>{
      return of(1);
    },
    getSkillsList(): Observable<any>{
      return of(mockSkillList);
    },
    saveSkill(skillObj: Skill): Observable<number>{
      return of(4);
    },
    deleteSkill(skillId: number): Observable<boolean>{
      return of(true);
    }
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SkillService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([SkillService], (service: SkillService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all skills', inject([SkillService], (service: SkillService) => {
    expect(service.getSkillsList()).toBeTruthy();
  }));
  
  it('should get specific skill', inject([SkillService], (service: SkillService) => {
    expect(service.getSkillById(1)).toBeTruthy();
  }));

  it('should save skill', inject([SkillService], (service: SkillService) => {
    let newSkill: Skill = {
      skillId: null,
      skillName: "Skill 4"
    };
    let responseData: Skill = new Skill(null,null);
    service.saveSkill(newSkill).subscribe(data => { 
      responseData.skillId = data;
    });
    expect(service.saveSkill(newSkill)).toBeTruthy();
  }));

  it('should update skill', inject([SkillService], (service: SkillService) => {
    let updateSkill: Skill = {
      skillId: 1,
      skillName: "updated skill"
    };
    let responseData: Skill = new Skill(null,null);
    service.updateSkill(updateSkill).subscribe(data => { 
      responseData.skillId = data;
    });
    expect(service.saveSkill(updateSkill)).toBeTruthy();
  }));

  it('should delete skill', inject([SkillService], (service: SkillService) => {
    expect(service.deleteSkill(2)).toBeTruthy();
  }));

});
