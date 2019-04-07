import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { AlertService, UserService } from '../_services';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  about;
  constructor (
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.getAbout()
  }

  getAbout(): void {
    this.userService.getAbout().subscribe(about => {

      // this.questions = questions.data;
      this.about = about;
      // this.about=test;
      console.log('about', about);
      return this.about;
    });
  }



}
