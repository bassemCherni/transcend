import { SprintService } from './sprint.service';
import { Sprint } from './../models/sprint';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(private fireStore: AngularFirestore,
              private sprintService: SprintService) { }

  createSprintRecord(sprint: Sprint, records: any[]) {
    return this.fireStore.collection('sprints').doc(`${sprint.id_sprint}`).set({record: records});
  }

  updateRecord(sprint: Sprint, records: any[]) {
    return this.fireStore.collection('sprints').doc(`${sprint.id_sprint}`).set({record: records});
  }

  getSprintRecord(sprint: Sprint) {
    return this.fireStore.collection('sprints').doc(`${sprint.id_sprint}`).get();
  }

  sprintRecordLiveChange(sprint: Sprint) {
    return this.fireStore.collection('sprints').doc(`${sprint.id_sprint}`).valueChanges();
  }

  updateSprintRrecords(activeSprint: Sprint) {
    this.getSprintRecord(activeSprint).subscribe(
      res => {
        let r : string[] = res.data()['record'];
        let v: string[] = r[r.length - 1].split('.', 2);
        const today = new Date();
        const lastRec = new Date(v[0]);
        if (today.getDate() === lastRec.getDate()
        && today.getFullYear() === lastRec.getFullYear()
        && today.getMonth() === lastRec.getMonth()) {
          this.sprintService.remainingPoints(activeSprint.id_sprint).subscribe(
            rp => {
              let rmp = rp;
              if (rmp === null) {
                rmp = 0;
              }
              r[r.length - 1] = v[0] + '.' + rmp;
              this.updateRecord(activeSprint, r);
            },
            error => {
              console.log('err in sprint record');
            }
          );
        } else if (today.getDate() > lastRec.getDate()
        || today.getFullYear() > lastRec.getFullYear()
        || today.getMonth() > lastRec.getMonth()) {
          let holderDate = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
          const numDays = Math.floor((holderDate.getTime() - lastRec.getTime()) / 86400000);
          console.log('days: ', numDays);

          this.sprintService.remainingPoints(activeSprint.id_sprint).subscribe(
            rp => {
              let rmp = rp;
              if (rmp === null) {
                rmp = 0;
              }

              for (let index = 0; index < numDays; index++) {
                holderDate = new Date(lastRec.getTime() + (86400000 * (index + 1)));
                let rec = holderDate.getFullYear() + '-' + (holderDate.getMonth() + 1) + '-' + holderDate.getDate() + '.' + rmp;
                r.push(rec);
              }
              this.updateRecord(activeSprint, r);
            },
            error => {
              console.log('err in sprint record');
            }
          );
        }
      },
      err => {
        console.log('err in sprint record');
      }
    );
  }
}
