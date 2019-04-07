import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Mymessages} from '../data';
import {DataService, UserService} from '../_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  channelId: string;
  fakeUsers;
  channel;
  users;
  currentPage: number;
  totalPages;
  loading = false;
  showButton = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.currentPage = 1;
    console.log('users works');
    this.activatedRoute.params.subscribe(routeParams => {
      // this.catName=routeParams;
      this.fakeUsers = Mymessages;
      console.log('routeParams.id', routeParams.id);
      this.channelId = routeParams.id;
      if (routeParams.id) {
        this.getChannel(this.channelId, 10, this.currentPage);
      }
    });
  }

  moreUsersPaging() {
    // this.getChannel(this.channelId, 2, this.currentPage);

    this.currentPage += 1;

    if (this.currentPage <= this.totalPages) {
      this.loading = true;

      this.getChannel(this.channelId, 10, this.currentPage);
      if (this.currentPage === this.totalPages) {
        this.showButton = false;
      }
    }
  }

  sendChannel(channel): void {
    console.log('channel ', channel);
    this.dataService.sendChannel(channel);
  }

  getChannel(channelId, size, page): void {
    this.userService.getChannelIdByIdPaging(channelId, size, page).subscribe(channel => {
      const currUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log('currUser', currUser.id);
      const channelAdminId = channel.admin;
      // users.admin === currUser.id ? (this.isAdmin = true) : (this.isAdmin = false);
      this.sendChannel(channel);
      this.totalPages = channel.userslist.value.meta.totalpages;
      if (this.currentPage === 1) {
        this.channel = channel;
      } else {
        // this.channel.push(...res.data);
        this.channel.userslist.value.data.push(...channel.userslist.value.data);

      }
      if (this.currentPage === this.totalPages) {
        this.showButton = false;
      }
      // console.log('channel from settings', this.users);
      // console.log('this.isAdmin', this.isAdmin);
      // if (channel.userslist) {
      //   channel.userslist.value.data.map(el => {
      //     channelAdminId === el.userId ? (el.admin = true) : (el.admin = false);
      //     return el;
      //   });
      //   this.dataService.sendAdmin(this.isAdmin);
      // }
      this.loading = false;

      console.log('channel', this.channel);

      // return this.channel;
    });
  }

}
