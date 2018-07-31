import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateFilter'
})
export class AssociatePipe implements PipeTransform {

  transform(value: any, searchName: any, searchId: number, searchEmail: any, searchMobile: number, searchSkill: any): any {
    if(!value) return [];
    if(!searchName && !searchId && !searchEmail && !searchMobile && !searchSkill) return value;

    return value.filter(associateObj => {
      if(searchName){
        associateObj = associateObj.associateName.toLowerCase().includes(searchName.toLowerCase());
      }
      if(searchId && associateObj.associateId.indexOf(searchId) > -1){
        associateObj = associateObj;
      }
      if(searchEmail){
        associateObj = associateObj.email.toLowerCase().includes(searchEmail.toLowerCase());
      }
      if(searchMobile){
        associateObj = associateObj.mobile.filter(searchMobile);
      }
      if(searchSkill){
        associateObj = associateObj.skills.toLowerCase().includes(searchSkill.toLowerCase());
      }
      return associateObj;
    });
  }
}
