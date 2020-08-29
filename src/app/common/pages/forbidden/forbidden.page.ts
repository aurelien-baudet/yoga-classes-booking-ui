import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.page.html',
  styleUrls: ['./forbidden.page.scss'],
})
export class ForbiddenPage {

  constructor(private router: Router) { }

  home() {
    this.router.navigate(['']);
  }

}
