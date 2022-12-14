import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { first } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  daneRef: Observable<any[]>;
  private nextKey: number = 0;

  constructor(private db: AngularFireDatabase) {
    this.daneRef = this.db.list('students').valueChanges();
  }

  createStudent(student: any): void {
    let newStudent: Student = {
      "key": this.nextKey,
      "age": student.age,
      "name": student.name
    }
    this.nextKey += 1;
    this.db.list('students').push(newStudent);

  }

  deleteStudent(student: Student) {
    let key: any;
    this.db.list('students').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().name == student.name && i.payload.val().key == student.key && i.payload.val().age == student.age) {
          key = i.payload.key;
          this.db.list('students').remove(key);
          break;
        }
      }
    })
  }

  getStudentsList(): Observable<any[]> {
    this.daneRef = this.db.list('students').valueChanges();
    return this.daneRef
  }

  deleteAll() {
    const daneRef = this.db.list('students');
    daneRef.remove();
  }
}
