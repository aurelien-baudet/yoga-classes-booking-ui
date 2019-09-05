import { CurrentRoute } from 'src/app/common/util/router.util';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/services/account.service';
import { ClassService } from 'src/app/booking/services/class.service';
import { Lesson, Place } from 'src/app/booking/domain/reservation';
import { Component, OnInit } from '@angular/core';
import { TeacherInfo } from 'src/app/account/domain/teacher';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-edit-lesson-page',
  templateUrl: './edit-lesson.page.html',
  styleUrls: ['./edit-lesson.page.scss'],
})
export class EditLessonPage {

  lesson: Lesson;
  places: Place[];

  constructor(private classService: ClassService,
              private placeService: PlaceService,
              private userService: AccountService,
              private router: Router,
              private route: CurrentRoute) { }

  async ionViewDidEnter() {
    const lessonId = this.route.getPathParam('lessonId');
    this.lesson = await this.classService.getLessonInfo({id: lessonId});
    this.places = await this.placeService.list();
  }

  async updateLessonInfo(lesson: Lesson) {
    // TODO: ask to update one or all occurences
  }

  async changePlace(lesson: Lesson) {
    // TODO: ask to update one or all occurences
  }
}
