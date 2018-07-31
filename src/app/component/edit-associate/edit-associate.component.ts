import { Component, OnInit, Inject } from '@angular/core';
import { Associate } from '../../model/associate';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AssociateService } from '../../service/associate.service';
import { AssociateSkills } from '../../model/associate-skills';

@Component({
  selector: 'app-edit-associate',
  templateUrl: './edit-associate.component.html',
  styleUrls: ['./edit-associate.component.css']
})
export class EditAssociateComponent implements OnInit {

  public popupMode: string;
  public viewLevel: string;
  public viewStatus: string;
  public viewGender: string;
  public recordId: number;

  public associateObj: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

  constructor(private dialogRef: MatDialogRef<EditAssociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, 
    private route: ActivatedRoute,
    private associateService: AssociateService
  ) {
      this.popupMode = data.popupMode;
      if(this.popupMode == "CREATE"){
        this.associateService.getAssociatesSkills().subscribe(responseData => {
          this.associateObj.associateSkillsList = responseData.associateSkillsList; 
        });
      } else {
        this.recordId = data.id;
        this.getAssociateById(this.recordId);
      }
    }

    getAssociateById(id: number){
      this.associateService.getAssociateById(id).subscribe(responseData => {
        this.associateObj = responseData; 
        if(this.associateObj.level == "LEVEL_1"){
          this.viewLevel = "L1";
        } else if(this.associateObj.level == "LEVEL_2"){
          this.viewLevel = "L2";
        } else if(this.associateObj.level == "LEVEL_3"){
          this.viewLevel = "L3";
        }
        if(this.associateObj.status == "green"){
          this.viewStatus = "Status Green";
        } else if(this.associateObj.status == "blue"){
          this.viewStatus = "Status Blue";
        } else if(this.associateObj.status == "red"){
          this.viewStatus = "Status Red";
        }
        if(this.associateObj.gender == "MALE"){
          this.viewGender = "Male";
        } else if(this.associateObj.gender == "FEMALE"){
          this.viewGender = "Female";
        }
      });
    }

  ngOnInit() {
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }

  addAssociate(){
    if(this.validate()){
      this.associateService.saveAssociate(this.associateObj).subscribe(responseData => { 
        this.associateObj.id = responseData;
        this.dialogRef.close();
      });
    }
  }

  updateAssociate(){
    if(this.validate()){
      this.associateService.updateAssociate(this.associateObj).subscribe(responseData => { 
        this.associateObj.id = responseData;
        this.dialogRef.close();
      });
    }
  }

  editAssociate(){
    this.popupMode = "EDIT";
  }

  deleteAssociate(): void{
    if(confirm("Are you sure you want to delete this Associate?")){
      this.associateService.deleteAssociate(this.recordId).subscribe(responseData => { 
        this.dialogRef.close();
      });
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  private validate(): boolean{
    if(this.associateObj.associateName == null || this.associateObj.associateName == undefined){
      alert("Please enter Associate Name.");
      return false;
    } else if(this.associateObj.associateId == null || this.associateObj.associateId == undefined){
      alert("Please enter Associate ID.");
      return false;
    } else if(this.associateObj.email == null || this.associateObj.email == undefined){
      alert("Please enter email.");
      return false;
    } else if(this.associateObj.mobile == null || this.associateObj.mobile == undefined){
      alert("Please enter mobile number.");
      return false;
    } else if(this.associateObj.gender == null || this.associateObj.gender == undefined){
      alert("Please select gender.");
      return false;
    } else if(this.associateObj.level == null || this.associateObj.level == undefined){
      alert("Please select level.");
      return false;
    } else if(this.associateObj.status == null || this.associateObj.status == undefined){
      alert("Please select status.");
      return false;
    }
    return true;
  }

}
