import { async, ComponentFixture, inject, TestBed, fakeAsync } from '@angular/core/testing';

import { ManageAssociateComponent } from './manage-associate.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssociateService } from '../../service/associate.service';
import { Observable, of } from 'rxjs';
import { Associate } from '../../model/associate';
import { AppSettings } from '../../app-settings';
import { AssociatePipe } from '../../pipe/associate.pipe';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { EditAssociateComponent } from '../edit-associate/edit-associate.component';

describe('ManageAssociateComponent', () => {
  let component: ManageAssociateComponent;
  let fixture: ComponentFixture<ManageAssociateComponent>;
  let dialog: MatDialog;
  let mockDialogRef:MatDialogRef<EditAssociateComponent>;

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
  mockAssociateObj.associateSkillsList = [];

  const mockAssociateData: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  mockAssociateData.id = 100;
  mockAssociateData.associateId = 312256;
  mockAssociateData.associateName = "JUDE";
  mockAssociateData.email = "jude@abc.com";
  mockAssociateData.mobile = 9087654321;
  mockAssociateData.remark = "Remark";
  mockAssociateData.strength = "Strength";
  mockAssociateData.weakness = "weakness";
  mockAssociateData.gender = "MALE";
  mockAssociateData.level = "LEVEL_1"
  mockAssociateData.status = "green";

  let mockAssociateService = {
    getAssociatesList() : Observable<any> {
      return of(mockAssociateObj);
    },
    getAssociatesSkills() : Observable<any>{
      return of(mockAssociateObj.associateSkillsList);
    },
    getAssociateById(associateId: number) : Observable<Associate>{
      return of(mockAssociateData);
    },
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAssociateComponent,EditAssociateComponent, AssociatePipe ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, MatDialogModule],
      providers: [{provide: AssociateService, useValue: mockAssociateService}, AppSettings]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [EditAssociateComponent],
      },
    })
    .compileComponents();
  }));

  beforeEach(inject([MatDialog],(_dialog:MatDialog) => {
    fixture = TestBed.createComponent(ManageAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = _dialog;   
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should get all the associates details and its dashboard data', () => {
    component.ngOnInit();
    expect(component.associateObj).toEqual(mockAssociateObj);
  });

  it('it should add new dialog for adding new associate', async(() => {
    component.addAssociate();
    const dialogRef = dialog.open(EditAssociateComponent, {data: {popupMode: "CREATE"}});
    const spy = jasmine.createSpy('afterAllClosed spy');
    dialog.afterAllClosed.subscribe(spy);
    fixture.detectChanges();
    
    dialogRef.close();
    fixture.detectChanges();
    expect(spy).toBeTruthy();
  }));

  it('it should open dialog for editing associate', async(() => {
    component.editAssociate(100);
    const dialogRef = dialog.open(EditAssociateComponent, {data: {popupMode: "EDIT",id: 100}});
    const spy = jasmine.createSpy('afterAllClosed spy');
    dialog.afterAllClosed.subscribe(spy);
    fixture.detectChanges();
    
    dialogRef.close();
    fixture.detectChanges();
    expect(spy).toBeTruthy();
  }));

  it('it should open dialog for viewing associate', async(() => {
    component.viewAssociate(100);
    const dialogRef = dialog.open(EditAssociateComponent, {data: {popupMode: "VIEW",id: 100}});
    const spy = jasmine.createSpy('afterAllClosed spy');
    dialog.afterAllClosed.subscribe(spy);
    fixture.detectChanges();
    
    dialogRef.close();
    fixture.detectChanges();
    expect(spy).toBeTruthy();
  }));

});
