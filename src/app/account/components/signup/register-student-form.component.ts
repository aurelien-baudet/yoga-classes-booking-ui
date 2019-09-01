import { ContactInfo } from './../../domain/student';
import { Student, StudentRegistration } from 'src/app/account/domain/student';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-student-form',
  templateUrl: './register-student-form.component.html',
  styleUrls: ['./register-student-form.component.scss'],
})
export class RegisterComponent {
  @Output()
  register = new EventEmitter<StudentRegistration>();

  student: StudentRegistration = {
    displayName: '',
    credentials: {
      login: '',
      password: ''
    },
    contact: {
      email: '',
      phoneNumber: ''
    },
    preferences: {
      visibleByOtherStudents: true,
      agreesToBeAssisted: true,
      addBookedClassesToCalendar: true
    }
  };
}
