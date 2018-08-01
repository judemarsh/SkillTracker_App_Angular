import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { EditAssociateComponent } from './edit-associate.component';
import { Associate } from '../../model/associate';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatRadioModule, MatSliderModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AssociateService } from '../../service/associate.service';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AppSettings } from '../../app-settings';
import { Router, Routes } from '@angular/router';
import { ManageAssociateComponent } from '../manage-associate/manage-associate.component';
import { ManageSkillComponent } from '../manage-skill/manage-skill.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { Location } from '@angular/common';
import { AppModule } from '../../app.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('EditAssociateComponent', () => {
  let component: EditAssociateComponent;
  let fixture: ComponentFixture<EditAssociateComponent>;
  let dialog: MatDialog;
  let mockDialogRef:MatDialogRef<EditAssociateComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssociateComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, MatDialogModule, MatInputModule, MatRadioModule, MatSliderModule],
      providers: [{provide: AssociateService, useValue: mockAssociateService}, {provide: MAT_DIALOG_DATA, useValue: ""},{provide: MatDialogRef, useValue: mockDialogRef}, AppSettings]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [EditAssociateComponent],
      },
    })
    .compileComponents();
  }));

  beforeEach(inject([MatDialog],(_dialog:MatDialog) => {
    fixture = TestBed.createComponent(EditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = _dialog;
    mockDialogRef = dialog.open(EditAssociateComponent,{data: {popupMode: "CREATE"}});
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get associate by id',async(inject([AssociateService], (associateService: AssociateService) => {
    let associateObj: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    associateService.getAssociateById(1000).subscribe(data => {
      associateObj = data;
    });
    fixture.detectChanges();
    expect(associateObj.associateName).toEqual(mockAssociateObj.associateName);
  })));

  it('should add new associate',fakeAsync(inject([AssociateService,Router, Location], (associateService: AssociateService,router: Router, location: Location) => {
    component.popupMode = "CREATE";
    fixture.detectChanges();
    const element = fixture.nativeElement;
    element.querySelector('#associateName').value = "MARSHAL";
    element.querySelector('#associateId').value = "1245";
    element.querySelector('#email').value = "marshal@abc.in";
    element.querySelector('#mobile').value = "9870654321";
    element.querySelector('#remark').value = "Remark";
    let buttonClick = fixture.debugElement.query(By.css('.create')).nativeElement.click();
    fixture.detectChanges();
    tick();
    expect(mockDialogRef.close).toBeTruthy();
    const associateData: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    associateData.id = null;
    associateData.associateId = 1245;
    associateData.associateName = "MARSHAL";
    associateData.email = "marshal@abc.in";
    associateData.mobile = 9870654321;
    associateData.remark = "Remark";
    associateData.strength = "Strength";
    associateData.weakness = "weakness";
    associateData.gender = "MALE";
    associateData.level = "LEVEL_3"
    associateData.status = "blue";    
    fixture.detectChanges();
    associateService.saveAssociate(associateData).subscribe(data => { 
      associateData.id = data;
    });
    fixture.detectChanges();
  })));

  it('should update new associate',fakeAsync(inject([AssociateService,Router, Location], (associateService: AssociateService,router: Router, location: Location) => {
    component.popupMode = "EDIT";
    fixture.detectChanges();
    const element = fixture.nativeElement;
    element.querySelector('#associateName').value = "MARSHAL";
    element.querySelector('#associateId').value = "1245";
    element.querySelector('#email').value = "marshal@abc.in";
    element.querySelector('#mobile').value = "9870654321";
    element.querySelector('#remark').value = "Remark";
    let buttonClick = fixture.debugElement.query(By.css('.update')).nativeElement.click();
    fixture.detectChanges();
    tick();
    expect(mockDialogRef.close).toBeTruthy();
    const associateData: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    associateData.id = 1001;
    associateData.associateId = 1245;
    associateData.associateName = "ABC";
    associateData.email = "abc@abc.in";
    associateData.mobile = 9870654321;
    associateData.remark = "Remark";
    associateData.strength = "Strength";
    associateData.weakness = "weakness";
    associateData.gender = "FEMALE";
    associateData.level = "LEVEL_2"
    associateData.status = "red";    
    fixture.detectChanges();
    associateService.updateAssociate(associateData).subscribe(data => { 
      associateData.id = data;
    });
    fixture.detectChanges();
  })));

  it('it should delete associate', fakeAsync(inject([AssociateService], (associateService: AssociateService) => {
    const element = fixture.nativeElement;
    let responseData: boolean;
    associateService.deleteAssociate(1001).subscribe(data => {
      responseData = data;
    });
    fixture.detectChanges();
    tick();
    expect(mockDialogRef.close).toBeTruthy();
  }))); 

  it('it should close the dialog on cancelling', fakeAsync(() => {
    component.cancel();
    tick();
    expect(mockDialogRef.close).toBeTruthy();
  })); 
});
