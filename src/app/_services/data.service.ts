import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {
  }

  private subjectChannel = new BehaviorSubject<any>('');
  private subjectSpinner = new BehaviorSubject<any>('');

  private subjectadminArea = new BehaviorSubject<any>('');
  private subjectAdmin = new BehaviorSubject<any>('');
  private subjectSignUpForm = new BehaviorSubject<any>('');
  private subjectUrl = new BehaviorSubject<any>('');

  sendUrl(url) {
    console.log(this.subjectUrl);
    this.subjectUrl.next(url);
  }

  getUrl(): Observable<any> {
    console.log(this.subjectUrl);

    return this.subjectUrl.asObservable();
  }

  sendSpinner(spinner) {
    console.log('spinner', spinner);
    this.subjectSpinner.next(spinner);
  }

  getSpinner(): Observable<any> {
    console.log(this.subjectSpinner);
    return this.subjectSpinner.asObservable();
  }

  sendChannel(sendChannel) {
    console.log(this.subjectChannel);
    this.subjectChannel.next(sendChannel);
  }

  getChannel(): Observable<any> {
    console.log(this.subjectChannel);
    return this.subjectChannel.asObservable();
  }

  sendAdminArea(adminArea) {
    console.log(this.subjectadminArea);
    this.subjectadminArea.next(adminArea);
  }

  getAdminArea(): Observable<any> {
    console.log(this.subjectadminArea);

    return this.subjectadminArea.asObservable();
  }

  sendAdmin(admin) {
    console.log(this.subjectAdmin);

    this.subjectAdmin.next(admin);
  }

  getAdmin(): Observable<any> {
    console.log(this.subjectAdmin);

    return this.subjectAdmin.asObservable();
  }

  sendForm(form) {
    console.log(this.subjectSignUpForm);

    this.subjectSignUpForm.next(form);
  }

  getForm(): Observable<any> {
    return this.subjectSignUpForm.asObservable();
  }
}
