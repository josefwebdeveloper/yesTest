import {Component, OnInit} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import {AlertService, UserService} from '../_services';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService
  ) {
    router.events.subscribe(val => {
      console.log({val});
    });
  }

  temp: Observable<any>;
  responseChannel;

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      // this.catName=routeParams;
      this.sendInvitation(routeParams.id);
      console.log('routeParams.id', routeParams.id);
    });
    // console.log( this.temp,"temp111");
  }

  sendInvitation(guid): void {
    this.userService.channelInvitationConfirmation(guid).subscribe(
      channel => {
        this.responseChannel = channel;
        if (!channel) {
          this.router.navigate(['/main']);
        } else {
          console.log('channel', this.responseChannel);
          if (this.responseChannel.channelid !== undefined && this.responseChannel.channelid) {
            this.router.navigate(['/main', this.responseChannel.channelid]);
          }
        }
      },
      error => {
        this.alertService.error(error);
      }
    );
  }
}
