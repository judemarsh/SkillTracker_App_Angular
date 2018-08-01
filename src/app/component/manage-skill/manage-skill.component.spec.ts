import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { ManageSkillComponent } from './manage-skill.component';
import { Skill } from '../../model/skill';
import { Observable, of } from 'rxjs';
import { SkillPipe } from '../../pipe/skill.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material';
import { SkillService } from '../../service/skill.service';
import { By } from '@angular/platform-browser';
import { AppSettings } from '../../app-settings';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { EditSkillComponent } from '../edit-skill/edit-skill.component';

describe('ManageSkillComponent', () => {
  let component: ManageSkillComponent;
  let fixture: ComponentFixture<ManageSkillComponent>;
  let dialog: MatDialog;

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

  const mockSkillData: Skill = new Skill(2, "Skill 2");

  let mockSkillService = {
    getSkillsList(): Observable<any>{
      return of(mockSkillList);
    },
    saveSkill(skillObj: Skill): Observable<number>{
      mockSkillList.unshift(skillObj);
      return of(4);
    },
    deleteSkill(skillId: number): Observable<boolean>{
      let skillObj: Skill = mockSkillList.find(x => x.skillId == skillId);
      let index = mockSkillList.indexOf(skillObj);
      mockSkillList.splice(index, 1);
      return of(true);
    },
    getSkillById(skillId: number) : Observable<Skill>{
      return of(mockSkillData);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSkillComponent,EditSkillComponent, SkillPipe ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, MatDialogModule],
      providers: [{provide: SkillService, useValue: mockSkillService}, AppSettings]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [EditSkillComponent],
      },
    })
    .compileComponents();
  }));

  beforeEach(inject([MatDialog],(_dialog:MatDialog) => {
    fixture = TestBed.createComponent(ManageSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = _dialog;   
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should get all the skills', () => {
    component.ngOnInit();
    expect(component.skillList).toEqual(mockSkillList);
  });

  it('it should render the skill list', () => {
    const element = fixture.nativeElement;
    fixture.detectChanges();
    expect(element.querySelectorAll('div.skillRow').length).toBe(3);
  });

  it('it should add new skill', async(inject([SkillService], (skillService: SkillService) => {
    component.skillObj = new Skill(null,null);
    const element = fixture.nativeElement;
    element.querySelector('#skillName').value = "Skill 4";
    fixture.detectChanges();
    expect(element.querySelector('#skillName').value).toEqual("Skill 4");
    let buttonClick = fixture.debugElement.query(By.css('.form-horizontal button[type="submit"]')).nativeElement.click();
    fixture.detectChanges();
    let newSkill: Skill = {
      skillId: null,
      skillName: "Skill 4"
    };
    let responseData: Skill = new Skill(null,null);
    fixture.detectChanges();
    skillService.saveSkill(newSkill).subscribe(data => { 
      responseData.skillId = data;
    });
    fixture.detectChanges();
    expect(component.skillList).toEqual(mockSkillList);
    expect(element.querySelectorAll('div.skillRow').length - 1).toBe(3);
  })));

  it('it should delete skill', async(inject([SkillService], (skillService: SkillService) => {
    const element = fixture.nativeElement;
    let responseData: boolean;
    skillService.deleteSkill(3).subscribe(data => {
      responseData = data;
    });
    fixture.detectChanges();
    expect(component.skillList).toEqual(mockSkillList);
    expect(element.querySelectorAll('div.skillRow').length - 1).toBe(2);
  })));

  it('it should add new dialog for editing skill', async(() => {
    component.editSkill(2);
    const dialogRef = dialog.open(EditSkillComponent, {data: {contentHeader: "Update Skill",skillId: 2}});
    const spy = jasmine.createSpy('afterAllClosed spy');
    dialog.afterAllClosed.subscribe(spy);
    fixture.detectChanges();
    
    dialogRef.close();
    fixture.detectChanges();
    expect(spy).toBeTruthy();
  }));

});
