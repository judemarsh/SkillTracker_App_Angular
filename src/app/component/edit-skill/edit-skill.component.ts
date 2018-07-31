import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SkillService } from '../../service/skill.service';
import { Skill } from '../../model/skill';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  public skillObj: Skill = new Skill(null, null);

  constructor(private dialogRef: MatDialogRef<EditSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, 
    private route: ActivatedRoute, 
    private skillService: SkillService) { 
      if(data.skillId != null && data.skillId != undefined && data.skillId != "") {
        this.getSkillById(data.skillId);
      }
    }

  ngOnInit() {}

  getSkillById(skillId: number){
    this.skillService.getSkillById(skillId).subscribe(responseData => { 
      this.skillObj = responseData;
    });
  }

  updateSkill(){
    this.skillService.updateSkill(this.skillObj).subscribe(responseData => { 
      //this.router.navigate(['/','manageSkills']);
      //this.router.navigateByUrl('/manageSkills');
      this.dialogRef.close();
      //window.location.reload();
    });
  }

  cancel(){
    //this.router.navigate(['/manageSkills']);
    this.dialogRef.close();
  }


}
