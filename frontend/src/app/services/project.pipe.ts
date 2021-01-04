import { MembershipResponse } from './../models/MembershipResponse';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectFilter'
})
export class ProjectPipe implements PipeTransform {

  transform(membershipResponses: MembershipResponse[], search: string): MembershipResponse[] {
    if (search == null || search === '') {
      return membershipResponses;
    }
    return membershipResponses.filter(n => n.project.title.includes(search) || n.project.descreption.includes(search));
  }

}
