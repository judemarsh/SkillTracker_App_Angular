import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillFilter'
})
export class SkillPipe implements PipeTransform {

  transform(value: any, searchTxt: any): any {
    if(!value) return [];
    if(!searchTxt) return value;

    return value.filter(skillObj => {
      return skillObj.skillName.toLowerCase().includes(searchTxt.toLowerCase());
    });
  }

}
