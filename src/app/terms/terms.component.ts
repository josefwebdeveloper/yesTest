import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService, UserService } from '../_services';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  terms;
  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {}

  ngOnInit() {
    this.getTerms();
  }
  getTerms(): void {
    this.userService.getTerms().subscribe(terms => {
      // this.getFile(about.fileUrl);
      //   console.log(about.fileUrl);
      //   this.http.get(about.fileUrl).subscribe(data => {
      //     console.log(data);
      // })
      // this.questions = questions.data;
      this.terms = terms;
      console.log('terms', terms);
      return this.terms;
    });
  }
}
