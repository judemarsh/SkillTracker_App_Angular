import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skill } from '../../model/skill';
import { SkillService } from '../../service/skill.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditSkillComponent } from '../edit-skill/edit-skill.component';

@Component({
  selector: 'app-manage-skill',
  templateUrl: './manage-skill.component.html',
  styleUrls: ['./manage-skill.component.css']
})
export class ManageSkillComponent implements OnInit {

  public skillList: Skill[];
  public skillObj: Skill;

  constructor(private router: Router,private route: ActivatedRoute,private skillService: SkillService, private dialog: MatDialog) {
    this.skillObj = new Skill(null,null);
   }

  ngOnInit() {
    this.getSkillsList();
  }

  getSkillsList(){
    this.skillList = [];
    this.skillService.getSkillsList().subscribe(responseData => {
      this.skillList = responseData;
    });
  }

  editSkill(skillId: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data =
      {
        contentHeader: "Update Skill",
        skillId: skillId
      }
    this.dialog.open(EditSkillComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(() => {
      this.getSkillsList();
    });
  }

  addSkill(){
    if(this.skillObj.skillName == null || this.skillObj.skillName.trim() == ""){
      alert("Please enter Skill name.");
    } else {
      this.skillService.saveSkill(this.skillObj).subscribe(responseData => { 
        this.skillObj.skillId= responseData;
        this.skillList.push(this.skillObj);
        this.skillObj = new Skill(null,null);
      });
    }
  }

  deleteSkill(delSkillObj: Skill): void{
    if(confirm("Are you sure you want to delete this Skill?")){
      this.skillService.deleteSkill(delSkillObj.skillId).subscribe(responseData => { 
        let index = this.skillList.indexOf(delSkillObj);
        if(index != -1){
          this.skillList.splice(index,1);
        }
      });
    }
  
  }

}
