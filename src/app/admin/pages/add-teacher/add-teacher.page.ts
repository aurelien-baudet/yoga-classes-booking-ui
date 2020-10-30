import { NotificationService } from './../../../common/components/notification/notification.service';
import { ApplicationError } from 'src/app/booking/domain/general';
import { AccountService } from 'src/app/account/services/account.service';
import { TeacherRegistration, Teacher } from './../../../account/domain/teacher';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.page.html',
  styleUrls: ['./add-teacher.page.scss'],
})
export class AddTeacherPage {
  errors: ApplicationError[];
  teacher: Teacher;
  newTeacher: Teacher;
  displaySuccessMessage = false;

  @ViewChild('teacherAdded', { static: true })
  private teacherAdded: TemplateRef<any>;

  constructor(private userService: AccountService,
              private notificationService: NotificationService) { }

  async registerTeacher(teacher: TeacherRegistration) {
    try {
      const newTeacher = await this.userService.registerTeacher(teacher);
      this.notificationService.success(this.teacherAdded, {newTeacher}, {toastClass: `teacher-added`});
      this.resetForm();
    } catch (e) {
      this.errors = [e];
    }
  }

  resetForm() {
    this.teacher = null;
  }
}
