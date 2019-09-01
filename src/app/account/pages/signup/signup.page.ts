import { Component, OnInit } from '@angular/core';
import { StudentRegistration } from '../../domain/student';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
  }

  async registerStudent(student: StudentRegistration) {
    await this.accountService.registerStudent(student);
    this.router.navigate(['']);
  }
}
