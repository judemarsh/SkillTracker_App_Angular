import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EditSkillComponent } from './edit-skill.component';
import { Skill } from '../../model/skill';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SkillService } from '../../service/skill.service';
import { By } from '@angular/platform-browser';
import { AppSettings } from '../../app-settings';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ManageSkillComponent } from '../manage-skill/manage-skill.component';
import { SkillPipe } from '../../pipe/skill.pipe';

describe('EditSkillComponent', () => {
  let component: EditSkillComponent;
  let fixture: ComponentFixture<EditSkillComponent>;

  const mockSkillData: Skill = new Skill(1, "Skill 1");

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  let mockSkillService = {
    getSkillById(skillId: number) : Observable<Skill>{
      return of(mockSkillData);
    },
    updateSkill(skillObj: Skill): Observable<number>{
      return of(1);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSkillComponent, ManageSkillComponent, SkillPipe ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, MatDialogModule, MatInputModule],
      providers: [{provide: SkillService, useValue: mockSkillService},{provide: MatDialogRef, useValue: mockDialogRef}, {provide: MAT_DIALOG_DATA, useValue: ""}, AppSettings]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get skill by id', async(inject([SkillService], (skillService: SkillService) => {
    let skillObj: Skill = new Skill(null,null);
    skillService.getSkillById(1).subscribe(data => {
      skillObj = data;
    });
    fixture.detectChanges();
    expect(skillObj.skillName).toEqual(mockSkillData.skillName);
  })));

  it('should update the skill', async(inject([SkillService, Router, Location], (skillService: SkillService, router: Router, location: Location) => {
    const element = fixture.nativeElement;
    element.querySelector('#skillName').value = "Skill 2";
    fixture.detectChanges();
    expect(element.querySelector('#skillName').value).toEqual("Skill 2");
    let buttonClick = fixture.debugElement.query(By.css('.update')).nativeElement.click();
    fixture.detectChanges();
    expect(mockDialogRef.close()).toHaveBeenCalled();
    let updatedSkill: Skill = {
      skillId: 1,
      skillName: "Skill 2"
    };
    let responseData: Skill = new Skill(null,null);
    fixture.detectChanges();
    skillService.updateSkill(updatedSkill).subscribe(data => { 
      responseData.skillId = data;
    });
    fixture.detectChanges();

  })));

});
