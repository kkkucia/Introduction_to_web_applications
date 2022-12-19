import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Student } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  customer: Student = new Student();
  submitted: boolean;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  newStudent(): void {
    this.submitted = false;
  }

  save(value: any) {
    this.studentService.createStudent(value);
  }

  onSubmit(f :NgForm) {
    this.submitted = true;
    this.save(f.value);
  }

}
