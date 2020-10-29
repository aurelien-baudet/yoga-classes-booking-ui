import { ApplicationError } from 'src/app/booking/domain/general';
import { AccountService } from 'src/app/account/services/account.service';
import { TeacherRegistration } from './../../../account/domain/teacher';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.page.html',
  styleUrls: ['./add-teacher.page.scss'],
})
export class AddTeacherPage {
  errors: ApplicationError[];

  constructor(private userService: AccountService) { }

  async registerTeacher(teacher: TeacherRegistration) {
    try {
      await this.userService.registerTeacher(teacher);
    } catch (e) {
      this.errors = [e];
    }
  }

}
