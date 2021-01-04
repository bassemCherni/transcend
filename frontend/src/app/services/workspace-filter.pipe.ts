import { Affiliation } from './../models/affiliation';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workspaceFilter'
})
export class WorkspaceFilterPipe implements PipeTransform {

  transform(affiliation: Affiliation[], search: string, role: string): Affiliation[] {
    if (search == null || search === '') {
      if (role == null || role === '' || role === 'all') {
        return affiliation;
      } else {
        if (role !== 'admin') {
          return affiliation.filter(n => n.role.includes('s.m') || n.role.includes('dev') || n.role.includes('p.o'));
        }
        return affiliation.filter(n => n.role.includes(role));
      }
    } else {
      if (role == null || role === '' || role === 'all') {
        return affiliation.filter(n => n.workSpace.name.includes(search));
      } else {
        if (role !== 'admin') {
          return affiliation.filter(n =>
            (n.role.includes('s.m') ||
            n.role.includes('dev') ||
            n.role.includes('p.o')) &&
            n.workSpace.name.includes(search));
        }
        return affiliation.filter(n => n.role.includes(role) && n.workSpace.name.includes(search));
      }
    }
  }

}
