import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap, first} from 'rxjs/operators';
// import { AlertService,AuthenticationService } from '../_services';
import {User} from '../_models';
import {DataService} from './data.service';

@Injectable()
export class UserService {
  token;
  userToken;

  constructor(private http: HttpClient,
              private dataService: DataService) {
  }

  private currentUser = new Subject<User>();

  public userEmitter = this.currentUser.asObservable();

  userEmitChange(usr: User) {
    this.currentUser.next(usr);
  }

  // if (localStorage.getItem('token')) {
  //     // logged in so return true
  //     return true;
  // }
  // headerUser = {
  //     headers: {
  //         Authorization: `bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*"
  //       }
  //   };
  // token
  getToken() {
    const res = this.http.post(`${environment.apiUrlCall}token`, '');
    return res.subscribe(token => {
      localStorage.setItem('token', JSON.parse(JSON.stringify(token)).token);
      this.token = localStorage.getItem('token');
      return;
    });
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrlCall}/users`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrlCall}/users/` + id);
  }

  sendAnswer(question: any): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http
      .post<any>(
        `${environment.apiUrlCall}answers`,
        {QuestionId: question.id, Answer: question.result, ResponseTime: 1},
        header
      )
      .pipe(
        tap((_question: any) => console.log('5', _question)),
        catchError(this.handleError<any>('sendAnswer'))
      );
  }

  sendUserQuestion(userQuestion, channelId): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http
      .post<any>(
        `${environment.apiUrlCall}channels/${channelId}/userquestion`,
        {'Text': userQuestion.Text, 'Answer': userQuestion.Answer},
        header
      )
      .pipe(
        tap((_question: any) => console.log('5', _question)),
        catchError(this.handleError<any>('sendUserQuestion'))
      );
  }

  editAnswer(question: any): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http
      .put<any>(`${environment.apiUrlCall}answers?id=${question.id}`, {Answer: question.result}, header)
      .pipe(
        tap((_question: any) => console.log('5', _question)),
        catchError(this.handleError<any>('editAnswer'))
      );
  }

  register(user: User): Observable<User> {
    this.token = localStorage.getItem('token');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<User>(`${environment.apiUrlCall}signup`, user, header).pipe(
      tap((_user: User) => this.userEmitChange(_user)),
      // tap((user: User) => console.log("5", user)),
      catchError(this.handleError<User>('registrUser'))
    );
  }

  putUser(
    firstName: string,
    lastName: string,
    email: string,
    isReadTerms: boolean,
    isMarketingSubscribe: boolean
  ): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    if (!isMarketingSubscribe) {
      isMarketingSubscribe = false;
    }
    return this.http
      .put<any>(
        `${environment.apiUrlCall}users`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          isReadTerms: isReadTerms,
          isMarketingSubscribe: isMarketingSubscribe
        },
        header
      )
      .pipe(catchError(this.handleError<any>('putUser')));
  }

  registerPhone(userPhone: any): Observable<any> {
    this.token = localStorage.getItem('token');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http
      .post<any>(`${environment.apiUrlCall}signup`, userPhone, header)
      .pipe(catchError(this.handleError<any>('registerPhone')));
  }

  verifyPhone(userVerify: any): Observable<User> {
    this.token = localStorage.getItem('token');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<User>(`${environment.apiUrlCall}signup/verify`, userVerify, header).pipe(
      tap((user: User) => this.userEmitChange(user)),
      // tap((user: User) => console.log("5", user)),
      catchError(this.handleError<User>('verifyPhone'))
    );
  }

  email(email): Observable<any> {
    this.token = localStorage.getItem('token');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<User>(`${environment.apiUrlCall}email`, email, header).pipe(
      tap((user: User) => console.log('5', email)),
      catchError(this.handleError<User>('email'))
    );
  }

  getAnswerId(questionId): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}questions/${questionId}/view`, '', header).pipe(
      tap((_questionId: any) => console.log('5', _questionId)),
      catchError(this.handleError<any>('getAnswerId'))
    );
  }

  channelInvitationByPhone(phone, channel): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}channels/${channel}/invites/${phone}`, '', header).pipe(
      tap((phone: any) => console.log('phone', phone)),
      catchError(this.handleError<any>('channelInvitationByPhone'))
    );
  }

  channelInvitationConfirmation(guid): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}channels/invites/${guid}`, '', header).pipe(
      tap((channelInvitationConfirmation: any) =>
        console.log('channelInvitationConfirmation', channelInvitationConfirmation)
      ),
      catchError(this.handleError<any>('channelInvitationConfirmation'))
    );
  }

  getAbout() {
    this.token = localStorage.getItem('token');
    console.log('userToken', this.token);
    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.get<any>(`${environment.apiUrlCall}about`, header).pipe(
      // tap(questions => console.log("6", questions)),

      catchError(this.handleError<any>('getAbout'))
    );
  }

  getMe() {
    this.token = localStorage.getItem('userToken');
    console.log('userToken', this.token);
    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.get<any>(`${environment.apiUrlCall}users`, header).pipe(
      // tap(questions => console.log("6", questions)),

      catchError(this.handleError<any>('getMe'))
    );
  }

  deleteChannel(channelId) {
    this.token = localStorage.getItem('userToken');
    console.log('userToken', this.token);
    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.delete<any>(`${environment.apiUrlCall}channels/${channelId}/delete`, header).pipe(
      // tap(questions => console.log("6", questions)),

      catchError(this.handleError<any>('deleteChannel'))
    );
  }

  getTerms() {
    this.token = localStorage.getItem('token');
    console.log('userToken', this.token);
    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.get<any>(`${environment.apiUrlCall}terms`, header).pipe(
      // tap(questions => console.log("6", questions)),

      catchError(this.handleError<any>('getAbout'))
    );
  }

  postAnswer1(id, type, time): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}questions/${id}/types/${type}/time/${time}`, '', header).pipe(
      tap((_id: any) => console.log('6', _id)),
      catchError(this.handleError<any>('postAnswer'))
    );
  }

  postAnswer(id, type): Observable<any> {
    console.log('id from postAnswer', id);
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}answer/${id}/types/${type}`, '', header).pipe(
      tap((_id: any) => console.log('6', _id)),
      catchError(this.handleError<any>('postAnswer'))
    );
  }

  postDataAnswer(channelId, id, type): Observable<any> {
    console.log('id from postAnswer', id);
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}channels/${channelId}/questions/${id}/type/${type}`, '', header).pipe(
      // tap((_id: any) => console.log('6', _id)),
      catchError(this.handleError<any>('postDataAnswer'))
    );
  }

  postSeenQuetion(id, channelId): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}channels/${channelId}/questions/${id}/view`, '', header).pipe(
      tap((_id: any) => console.log('6', _id)),
      catchError(this.handleError<any>('postSeenQuetion'))
    );
  }

  channellInvitesVerify(guid): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}channels/invites/${guid}`, '', header).pipe(
      tap((id: any) => console.log('6', id)),
      catchError(this.handleError<any>('channellInvitesVerify'))
    );
  }

  getChannelByID(channelID): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.get<any>(`${environment.apiUrlCall}channels/${channelID}/users`, header).pipe(
      tap((_channelID: any) => console.log('channelID', _channelID)),
      catchError(this.handleError<any>('getChannelByID'))
    );
  }

  getChannelIdByIdPaging(channelID, size = 20, page = 1): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.get<any>(`${environment.apiUrlCall}channels/${channelID}/users?offset=${page}&limit=${size}`, header).pipe(
      tap((_channelID: any) => console.log('channelID', _channelID)),
      catchError(this.handleError<any>('getUsersByChannelIdPaging'))
    );
  }

  putAnswer(answerId, type): Observable<any> {
    this.token = localStorage.getItem('userToken');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.put<any>(`${environment.apiUrlCall}answers/${answerId}/types/${type}`, '', header).pipe(
      tap((_answerId: any) => console.log('6', _answerId)),
      catchError(this.handleError<any>('putAnswer'))
    );
  }

  login(email: string, password: string): Observable<any> {
    this.token = localStorage.getItem('token');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.post<any>(`${environment.apiUrlCall}signin`, {Email: email, Password: password}, header).pipe(
      tap((user: User) => this.userEmitChange(user)),
      catchError(this.handleError<User>('registrUser'))
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('userToken');
  }

  getAllQuestions(size = 200, page = 1, channalId: string) {
    this.userToken = localStorage.getItem('userToken');
    console.log('userToken', this.userToken);
    const header = {
      headers: {
        Authorization: `bearer ${this.userToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http
      .get<any>(`${environment.apiUrlCall}channels/${channalId}/questions?offset=${page}&limit=${size}`, header)
      .pipe(
        tap(questions => console.log('6', questions)),

        catchError(this.handleError<any>('getAllQuestions'))
      );
  }

  getDataQuestions(size = 200, page = 1, channalId: string) {
    this.userToken = localStorage.getItem('userToken');
    console.log('userToken', this.userToken);
    const header = {
      headers: {
        Authorization: `bearer ${this.userToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http
      .get<any>(`${environment.apiUrlCall}channels/${channalId}/databasequestions?offset=${page}&limit=${size}`, header)
      .pipe(
        tap(questions => console.log('getDataQuestions from service', questions)),

        catchError(this.handleError<any>('getDataQuestions'))
      );
  }

  getAllChannels(size = 120, page = 1) {
    this.userToken = localStorage.getItem('userToken');
    console.log('userToken', this.userToken);
    const header = {
      headers: {
        Authorization: `bearer ${this.userToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.get<any>(`${environment.apiUrlCall}channels?offset=${page}&limit=${size}`, header).pipe(
      tap(channels => console.log('6', channels)),

      catchError(this.handleError<any>('getAllChannels'))
    );
  }

  getAllAnswers(size = 300, page = 1, channalId: string) {
    this.userToken = localStorage.getItem('userToken');
    console.log('userToken', this.userToken);
    const header = {
      headers: {
        Authorization: `bearer ${this.userToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http
      .get<any>(`${environment.apiUrlCall}channels/${channalId}/answers?offset=${page}&limit=${size}`, header)
      .pipe(
        tap(answers => console.log('6', answers)),

        catchError(this.handleError<any>('getAllAnswers'))
      );
  }

  getDataAnswers(size = 300, page = 1, channalId: string) {
    this.userToken = localStorage.getItem('userToken');
    console.log('userToken', this.userToken);
    const header = {
      headers: {
        Authorization: `bearer ${this.userToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http
      .get<any>(`${environment.apiUrlCall}channels/${channalId}/databaseanswers?offset=${page}&limit=${size}`, header)
      .pipe(
        tap(answers => console.log('6', answers)),

        catchError(this.handleError<any>('getAllAnswers'))
      );
  }

  //   update(user: User) {
  //     return this.http.put(`${environment.apiUrlCall}/users/` + user.id, user);
  //   }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrlCall}/users/` + id);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //   this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
