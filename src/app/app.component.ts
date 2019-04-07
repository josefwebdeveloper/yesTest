import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, UserService} from './_services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptionSpinner: Subscription;
  spinner = true;

  constructor(private userService: UserService,
              private dataService: DataService) {
    this.subscriptionSpinner = this.dataService.getSpinner().subscribe(spinner => {
      //
      if (spinner) {
        this.spinner = spinner;
        console.log('spinner', this.spinner);

      }
    });
  }

  token;

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.token = this.userService.getToken();

      setTimeout(() => {
      }, 1500);
    }
  }

  ngOnDestroy() {
    this.subscriptionSpinner.unsubscribe();
  }
}
