import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssociateComponent } from './manage-associate.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { AssociateService } from '../../service/associate.service';
import { Observable, of } from 'rxjs';
import { Associate } from '../../model/associate';
import { AppSettings } from '../../app-settings';
import { AssociatePipe } from '../../pipe/associate.pipe';

describe('ManageAssociateComponent', () => {
  let component: ManageAssociateComponent;
  let fixture: ComponentFixture<ManageAssociateComponent>;

  const mockAssociateObj: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  let associateObj1: Associate = new Associate(100,312256, "JUDE", "jude@abc.in", 9087654321, "MALE", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "HTML5, CSS3, JAVA", null, null);
  let associateObj2: Associate = new Associate(101,123, "MARSHAL", "marshal@abc.in", 9087654321, "MALE", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "HTML5, CSS3", null, null);
  mockAssociateObj.associatesList = new Array<Associate>();
  mockAssociateObj.associatesList.push(associateObj1);
  mockAssociateObj.associatesList.push(associateObj2);
  mockAssociateObj.femalePercentage = "0";
  mockAssociateObj.malePercentage = "100";
  mockAssociateObj.maleRatedPercentage = "100";
  mockAssociateObj.femaleRatedPercentage = "0";
  mockAssociateObj.level1Percentage = "50";
  mockAssociateObj.level2Percentage = "50";
  mockAssociateObj.level3Percentage = "0";
  mockAssociateObj.ratedAssociatesCount = "2";
  mockAssociateObj.associatesCount = "2";
  mockAssociateObj.freshersPercentage = "50";

  let mockAssociateService = {
    getAssociatesList() : Observable<any> {
      return of(mockAssociateObj);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAssociateComponent, AssociatePipe ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, MatDialogModule],
      providers: [{provide: AssociateService, useValue: mockAssociateService}, AppSettings]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should get all the associates details and its dashboard data', () => {
    component.ngOnInit();
    expect(component.associateObj).toEqual(mockAssociateObj);
  });
});
