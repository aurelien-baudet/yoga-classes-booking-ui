import { Teacher } from 'src/app/account/domain/teacher';
import { AccountService } from 'src/app/account/services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  teachers: Teacher[];

  constructor(private userService: AccountService) { }

  async ionViewDidEnter() {
    this.teachers = await this.userService.listTeachers();
  }
}
