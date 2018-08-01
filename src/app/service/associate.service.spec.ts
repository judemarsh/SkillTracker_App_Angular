import { TestBed, inject } from '@angular/core/testing';

import { AssociateService } from './associate.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppSettings } from '../app-settings';
import { Observable, of } from 'rxjs';
import { Associate } from '../model/associate';

describe('AssociateService', () => {

  const mockAssociateObj: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  mockAssociateObj.id = 1000;
  mockAssociateObj.associateId = 312256;
  mockAssociateObj.associateName = "JUDE";
  mockAssociateObj.email = "jude@abc.com";
  mockAssociateObj.mobile = 9087654321;
  mockAssociateObj.remark = "Remark";
  mockAssociateObj.strength = "Strength";
  mockAssociateObj.weakness = "weakness";
  mockAssociateObj.gender = "MALE";
  mockAssociateObj.level = "LEVEL_1"
  mockAssociateObj.status = "green";
  mockAssociateObj.associateSkillsList = [
    {
      skillId: 1,
      skillName: "HTML5",
      skillLevel: 0
    },
    {
      skillId: 2,
      skillName: "CSS3",
      skillLevel: 10
    },
    {
      skillId: 3,
      skillName: "JAVA",
      skillLevel: 20
    }
  ];

  let mockAssociateService = {
    getAssociatesSkills() : Observable<any>{
      return of(mockAssociateObj.associateSkillsList);
    },
    getAssociatesList() : Observable<any>{
      return of(mockAssociateObj);
    },
    getAssociateById(associateId: number) : Observable<Associate>{
      return of(mockAssociateObj);
    },
    saveAssociate(associateObj: Associate): Observable<number>{
      return of(1001);
    },
    updateAssociate(associateObj: Associate): Observable<number>{
      return of(1001);
    },
    deleteAssociate(associateId: number): Observable<boolean>{
      return of(true);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AssociateService,AppSettings],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([AssociateService], (service: AssociateService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all Associates', inject([AssociateService], (service: AssociateService) => {
    expect(service.getAssociatesList()).toBeTruthy();
  }));

  it('should get all skills of Associates', inject([AssociateService], (service: AssociateService) => {
    expect(service.getAssociatesSkills()).toBeTruthy();
  }));
  
  it('should get specific Associate', inject([AssociateService], (service: AssociateService) => {
    expect(service.getAssociateById(1000)).toBeTruthy();
  }));

  it('should save Associate', inject([AssociateService], (service: AssociateService) => {
    let associateData: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    associateData.id = null;
    associateData.associateId = 1245;
    associateData.associateName = "MARSHAL";
    associateData.email = "marshal@abc.in";
    associateData.mobile = 9870654321;
    associateData.remark = "Remark";
    associateData.strength = "Strength";
    associateData.weakness = "weakness";
    associateData.gender = "MALE";
    associateData.level = "LEVEL_1"
    associateData.status = "green";    
    let responseData: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    service.saveAssociate(associateData).subscribe(data => { 
      responseData.id = data;
    });
    expect(service.saveAssociate(associateData)).toBeTruthy();
  }));

  it('should update Associate', inject([AssociateService], (service: AssociateService) => {
    let associateData: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    associateData.id = 1001;
    associateData.associateId = 1245;
    associateData.associateName = "JUDE TARUN MARSHAL";
    associateData.email = "marshal@abc.in";
    associateData.mobile = 9870654321;
    associateData.remark = "Remark";
    associateData.strength = "Strength";
    associateData.weakness = "weakness";
    associateData.gender = "MALE";
    associateData.level = "LEVEL_1"
    associateData.status = "green";    
    let responseData: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    service.updateAssociate(associateData).subscribe(data => { 
      responseData.id = data;
    });
    expect(service.updateAssociate(associateData)).toBeTruthy();
  }));

  it('should delete Associate', inject([AssociateService], (service: AssociateService) => {
    expect(service.deleteAssociate(1001)).toBeTruthy();
  }));
  
});
