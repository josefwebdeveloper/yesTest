import {Component, OnInit} from '@angular/core';
import {Staticdata} from '../staticContainer';
import {ImageUrl} from '../staticContainer';
// import { Staticdata } from './../staticContainer';
import {UserService} from './../_services/user.service';
import {switchMap} from 'rxjs/operators';
import {Mymessages} from '../data';

@Component({
  selector: 'app-main-start',
  templateUrl: './main-start.component.html',
  styleUrls: ['./main-start.component.scss']
})
export class MainStartComponent implements OnInit {
  questions;
  systemMenu = [
    {
      result: '',
      imgUrl: 'assets/images/05-01.png',
      color: '#BDE3F4',
      confirmed: 'false',
      status: 'fake',
      attributes: {
        text: 'Need help? Mail@mitagdim.co.il',
        ordernumber: '',
        categoryid: ''
      },
      id: ''
    }
  ];
  answers;
  answer;
  pageCAll = 0;
  page = 1;
  mymessages;
  channels;
  channelsTest: any;

  constructor(private userService: UserService) {
    // this.staticDataToShow.push(Staticdata[0]);
    // this.staticDataToShowFix.push(Staticdata[0]);

    console.log('staticDataToShow', this.staticDataToShow);
    console.log('staticData', this.staticData);
    console.log('staticDataToShowFix', this.staticDataToShowFix);
  }

  ngOnInit() {
    this.mymessages = Mymessages;
    this.staticDataToShow = [];
    this.staticDataToShowFix = this.systemMenu;
    this.getAllChannels(100, 1);
  }

  compareKeys(a, b) {
    return a.attributes.ordernumber - b.attributes.ordernumber;
  }


  getAllChannels(sizeCh, pageCh): void {
    this.userService.getAllChannels(sizeCh, pageCh).subscribe(channels => {
      this.channels = channels;
      console.log('channels', channels);
      return this.channels;
    });
  }

  postAnswer(answerId, result): void {
    console.log('postAnswer answerId, result', answerId, result);
    console.log('postAnswer answerId', answerId);
    this.userService.postAnswer(answerId, result).subscribe(answer => {
      this.answer = answer;
      return this.answer;
    });
  }


  getColor(choose) {
    switch (choose) {
      case 'Y':
        return '#bfd6bf';
      case 'N':
        return '#f09f9d';
      case 'S':
        return '#fbe59f';
    }
  }

  getUrlAnswer(choose) {
    console.log('getUrlAnswe', {choose});
    // debugger;
    switch (choose) {
      case 'Y':
        return 'assets/images/yes-choosed.png';

      case 'N':
        return 'assets/images/no-choosed.png';

      case 'S':
        return 'assets/images/skip-choosed.png';
      default:
        return 'assets/images/05-01.png';
    }
  }

  getUrl(choose, confirmed) {
    switch (choose) {
      case 'Y':
        if (confirmed) {
          return 'assets/images/yes-choosed.png';
        } else {
          return 'assets/images/yes-ok.png';
        }
      case 'N':
        if (confirmed) {
          return 'assets/images/no-choosed.png';
        } else {
          return 'assets/images/no-ok.png';
        }
      case 'S':
        if (confirmed) {
          return 'assets/images/skip-choosed.png';
        } else {
          return 'assets/images/skip-ok.png';
        }
    }
  }

  imageUrles = ImageUrl;
  confirm = 'confirm';
  imgUrl1 = 'assets/images/05-01.png';
  newObj;
  staticDataToShow = [];
  staticDataToShowFix = [];
  setClassFixed = {
    animated: true,
    lightSpeedIn: false,
    slideInLeft: true,
    'delay-2s': true,
    'display-hidden': false
  };
  setClassTop = {
    animated: true,
    slideInUp: false,
    // "delay-1s": true,
    overfloyY: false,
    'display-hidden': false
  };
  containerScroll = {
    overfloyY: false
  };
  isShow = true;

  // staticDataToShow.push(Staticdata);
  // staticDataToShow[0]=Staticdata[0];
  staticData = Staticdata;

  // console.log("imageUrles",staticData);

  sortArrayByKey(array, key) {
    return array.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  findObjectByKey(array, key, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  findObjectById(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === value) {
        return array[i];
      }
    }
    return null;
  }

  findObjectByAnswer(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].answerId === value) {
        return array[i];
      }
    }
    return null;
  }

  // sortedQuestion(qustionArr,orderNumber){

  // }

  // /////////////////////////////////////////////////////////////FIX START
  chooseFix(choose, answerId, id, status) {
    if (status != 'fake') {
      // debugger;
      console.log('choose@@,answerId,id', choose, answerId, id);
      this.setClassFixed = {
        animated: false,
        lightSpeedIn: false,
        slideInLeft: false,
        'delay-2s': false,
        'display-hidden': false
      };
      this.setClassTop = {
        animated: false,
        slideInUp: false,
        // "delay-1s": false,
        overfloyY: false,
        'display-hidden': false
      };

      const objStaticData = this.findObjectById(this.questions, id);
      console.log('objStaticData2', objStaticData);
      const index = this.questions.indexOf(objStaticData);

      console.log('index2', index);

      // if (this.staticData[index].isNew) {

      if (choose === 'confirm' && this.questions[index].result) {
        this.questions[index].confirmed = true;
        this.questions[index].imgUrl = this.getUrl(this.questions[index].result, this.questions[index].confirmed);
        this.questions[index].color = this.getColor(this.questions[index].result);
        // this.questions[index].time=this.time;
        // console.log("time",this.time);
        console.log('this.questions[index]', this.questions[index]);
        const answerId = this.questions[index].answerId;
        console.log('answerId', answerId);
        this.postAnswer(this.questions[index].answerId, this.questions[index].result);

        // this.postSeenQuetion(this.questions[index + 1]);

        // if (this.staticData[index].status === "new") {
        this.setClassFixed = {
          animated: false,
          lightSpeedIn: false,
          slideInLeft: false,
          'delay-2s': false,
          'display-hidden': false
        };
        this.setClassTop = {
          animated: false,
          slideInUp: false,
          // "delay-1s": false,
          overfloyY: false,
          'display-hidden': false
        };
        this.containerScroll = {
          overfloyY: false
        };

        if (this.questions[index + 1]) {
          this.staticDataToShowFix[0] = this.questions[index + 1];
          //  this.postSeenQuetion( this.staticDataToShowFix[0].id);
          console.log('this.staticDataToShowFix[0]', this.staticDataToShowFix[0]);
          this.pageCAll = this.pageCAll + 1;
          console.log('10 this.pageCAll', this.pageCAll);
          if (this.pageCAll === 98) {
            console.log('paging', index, this.page);
            this.page += this.page;
            // this.getAllQuestionsPaging(100, this.page);
            this.pageCAll = 0;
          }

          // this.isShow=true;
          console.log('index', index + 1);
        } else {
          this.isShow = false;
          console.log(' this.isShow', this.isShow);
        }
        this.questions[index].status = 'up';
        this.staticDataToShow.unshift(this.questions[index]);
        console.log('staticDataToShow', this.staticDataToShow);
        this.setClassFixed = {
          animated: true,
          lightSpeedIn: false,
          slideInLeft: true,
          'delay-2s': true,
          'display-hidden': false
        };
        this.setClassTop = {
          animated: true,
          slideInUp: true,
          // "delay-1s": true,
          overfloyY: false,
          'display-hidden': false
        };
        this.containerScroll = {
          overfloyY: false
        };
      } else if (choose !== 'confirm') {
        this.questions[index].result = choose;
        this.questions[index].imgUrl = this.getUrl(choose, this.questions[index].confirmed);
        // if (this.staticData[index].status === "new") {
        this.staticDataToShowFix[0] = this.questions[index];
        // }
        //  else if (this.staticData[index].status === "up") {
        // this.staticDataToShow[index] = this.staticData[index];
        // }
      }

      if (choose === 'confirm') {
        console.log('confirm');
      }
    }
  }

}
