import { TeacherInfo } from 'src/app/account/domain/teacher';
import { AccountService } from 'src/app/account/services/account.service';
import { Router } from '@angular/router';
import { Instant } from './../../../booking/domain/general';
import { Lesson } from 'src/app/booking/domain/reservation';
import { ClassService } from 'src/app/booking/services/class.service';
import { NewLesson, Place } from './../../../booking/domain/reservation';
import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-add-lesson-page',
  templateUrl: './add-lesson.page.html',
  styleUrls: ['./add-lesson.page.scss'],
})
export class AddLessonPage {

  places: Place[];
  teacher: TeacherInfo;

  constructor(private classService: ClassService,
              private placeService: PlaceService,
              private userService: AccountService,
              private router: Router) { }

  async ionViewDidEnter() {
    this.teacher = await this.userService.getTeacherInfo();
    this.places = await this.placeService.list();
  }

  async addLesson(lesson: NewLesson) {
    const added = await this.classService.register(lesson);
    this.router.navigate(['admin', 'lesson', added.id, 'schedule']);
  }

}
