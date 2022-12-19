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

  constructor(private db: AngularFireDatabase) {
    this.daneRef = this.db.list('students').valueChanges();
  }

  createStudent(student: any): void {
    let newStudent: Student = {
      "age": student.age,
      "name": student.name
    }
    this.db.list('students').push(newStudent);

  }

  getStudentsList(): Observable<any[]> {
    this.daneRef = this.db.list('students').valueChanges();
    return this.daneRef
  }

  changeStudentAge(student: Student, age: number){
    this.db.list('students').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().name == student.name && i.payload.val().age == student.age) {
          this.db.list('students').update(i.payload.key, {age: age})
          break;
        }
      }
    })
  }

  deleteStudent(student: Student) {
    this.db.list('students').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().name == student.name  && i.payload.val().age == student.age) {
          this.db.list('students').remove(i.payload.key);
          break;
        }
      }
    })
  }

  deleteAll() {
    const daneRef = this.db.list('students');
    daneRef.remove();
  }
}
