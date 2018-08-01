import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateFilter'
})
export class AssociatePipe implements PipeTransform {

  transform(value: any, searchName: any, searchId: any, searchEmail: any, searchMobile: any, searchSkill: any): any {
    if(!value) return [];
    if(!searchName && !searchId && !searchEmail && !searchMobile && !searchSkill) return value;

    return value.filter(associateObj => {
      let nameResult: boolean = true;
      let idResult: boolean = true;
      let emailResult: boolean = true;
      let mobileResult: boolean = true;
      let skillResult: boolean = true;
      if(searchName){
        nameResult = associateObj.associateName.toLowerCase().includes(searchName.toLowerCase());
      }
      if(searchId){
        let text: string = associateObj.associateId.toString();
        idResult = text.includes(searchId);
      }
      if(searchEmail){
        emailResult = associateObj.email.toLowerCase().includes(searchEmail.toLowerCase());
      }
      if(searchMobile){
        let text: string = associateObj.mobile.toString();
        mobileResult = text.includes(searchMobile);
      }
      if(searchSkill){
        skillResult = associateObj.skills.toLowerCase().includes(searchSkill.toLowerCase());
      }
      if(nameResult && idResult && emailResult && mobileResult && skillResult){
        return true;
      }
      return false;
    });
  }
}
