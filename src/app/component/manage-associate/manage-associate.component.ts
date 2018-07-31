import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../../service/associate.service';
import { Associate } from '../../model/associate';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditAssociateComponent } from '../edit-associate/edit-associate.component';

@Component({
  selector: 'app-manage-associate',
  templateUrl: './manage-associate.component.html',
  styleUrls: ['./manage-associate.component.css']
})
export class ManageAssociateComponent implements OnInit {

  public associateObj: Associate = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

  constructor(private associateService: AssociateService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAssociatesList();
  }

  getAssociatesList(){
    this.associateObj = new Associate(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.associateService.getAssociatesList().subscribe(responseData => {
      this.associateObj = responseData;
    });
  }

  addAssociate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "1024px";
    dialogConfig.width = "1280px";
    dialogConfig.data =
      {
        popupMode: "CREATE"
      }
    this.dialog.open(EditAssociateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getAssociatesList();
    });
  }

  editAssociate(recordId: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "1024px";
    dialogConfig.width = "1280px";
    dialogConfig.data =
      {
        popupMode: "EDIT",
        id: recordId
      }
    this.dialog.open(EditAssociateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getAssociatesList();
    });
  }

  viewAssociate(recordId: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "1024px";
    dialogConfig.width = "1280px";
    dialogConfig.data =
      {
        popupMode: "VIEW",
        id: recordId
      }
    this.dialog.open(EditAssociateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getAssociatesList();
    });
  }

  deleteAssociate(associateToDeleteObj: Associate): void{
    if(confirm("Are you sure you want to delete this Associate?")){
      this.associateService.deleteAssociate(associateToDeleteObj.id).subscribe(responseData => { 
        let index = this.associateObj.associatesList.indexOf(associateToDeleteObj);
        if(index != -1){
          this.associateObj.associatesList.splice(index,1);
        }
      });
    }
  }

}
