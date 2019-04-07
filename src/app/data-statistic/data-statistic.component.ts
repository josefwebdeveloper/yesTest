import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services';
import {ActivatedRoute} from '@angular/router';
import {Staticdata} from '../staticContainer';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-data-statistic',
  templateUrl: './data-statistic.component.html',
  styleUrls: ['./data-statistic.component.scss']
})
export class DataStatisticComponent implements OnInit {

  confirm = 'confirm';
  totalElements: number;
  totalQuestion: number;
  totalAnswers: number;
  questions;
  channalId: string;
  answers;
  answer;
  pageCAll = 0;
  page = 1;
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
  fakeQuestion = [
    {
      result: '',
      imgUrl: 'assets/images/05-01.png',
      color: '',
      confirmed: 'false',
      status: 'fake',
      attributes: {
        text: 'Thank you. No further questions right now. To write a claim click here. To contact us send an email to mail@mitagdim.co.il',
        ordernumber: '',
        categoryid: ''
      },
      id: ''
    }
  ];
  currentUser: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
    console.log('staticDataToShow', this.staticDataToShow);
    console.log('staticData', this.staticData);
    console.log('staticDataToShowFix', this.staticDataToShowFix);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser', this.currentUser);
    this.activatedRoute.params.subscribe(routeParams => {
      console.log('routeParams.id', routeParams.id);
      this.channalId = routeParams.id;
    });
    this.staticDataToShow = [];
    // console.log("TimeStamp", Math.floor(Date.now() / 1000));
    this.staticDataToShowFix = [];
    // this.getAllAnswers();
    this.getDataQuestions(300, 1, this.channalId);
  }

  getDataQuestions(size, page, channelId): void {
    this.userService.getDataQuestions(size, this.page, channelId).subscribe(questions => {
      if (questions.data.length > 0) {
        this.questions = questions.data;

        this.questions.forEach(function (value) {
          value.result = '';
          value.imgUrl = 'assets/images/05-01.png';
          value.color = '';
          value.confirmed = false;
          value.status = 'new';
        });

        console.log('questions[0]10', this.questions[0]);
        console.log('questions[0]111', this.questions[0]);
        console.log('10 staticDataToShowFix', this.staticDataToShowFix[0]);
      } else {
        console.log('questions from getDataQuestions', this.questions);
        this.questions = this.fakeQuestion;
        this.staticDataToShowFix.push(this.questions[0]);
        console.log('questions from getDataQuestions', this.staticDataToShowFix);
      }
      this.getDataAnswers(300, 1, this.channalId);
      console.log('questions from getDataQuestions', this.questions);

      (this.questions[0]) ? this.totalQuestion = this.questions[0].attributes.totalnumber : this.totalQuestion = 0;
      console.log('totalQuestion', this.totalQuestion);
      this.staticDataToShowFix[0] = this.questions[0];
      return this.questions;
    });
  }

  getDataQuestionsPaging(size, page, channelId): void {
    this.userService.getDataQuestions(size, page, channelId).subscribe(questions => {

      if (questions.data.length > 0) {
        const newQuestion = this.questions.concat(questions.data);
        this.questions = newQuestion;
        // this.questions = questions.data;

        this.questions.forEach(function (value) {
          value.result = '';
          value.imgUrl = 'assets/images/05-01.png';
          value.color = '';
          value.confirmed = false;
          value.status = 'new';
        });

        console.log('questions[0]10', this.questions[0]);
        console.log('questions[0]111', this.questions[0]);
        console.log('10 staticDataToShowFix', this.staticDataToShowFix[0]);
      } else {
        console.log('questions from getDataQuestions', this.questions);
        this.questions = this.fakeQuestion;
        this.staticDataToShowFix.push(this.questions[0]);
        console.log('questions from getDataQuestions', this.staticDataToShowFix);
      }
      // this.getDataAnswers(300, 1, this.channalId);
      console.log('questions from getDataQuestions', this.questions);

      (this.questions[0]) ? this.totalQuestion = this.questions[0].attributes.totalnumber : this.totalQuestion = 0;
      console.log('totalQuestion', this.totalQuestion);
      this.staticDataToShowFix[0] = this.questions[0];
      return this.questions;
    });
  }

  // getAllQuestionsPaging(size, page, channelId): void {
  //   this.userService.getAllQuestions(size, page, channelId).subscribe(questions => {
  //     const newQuestion = this.questions.concat(questions.data);
  //     this.questions = newQuestion;
  //
  //     this.questions.forEach(function (value) {
  //       value.result = '';
  //       value.imgUrl = 'assets/images/05-01.png';
  //       value.color = '';
  //       value.confirmed = false;
  //       value.status = 'new';
  //     });
  //     this.staticDataToShowFix.push(this.questions[0]);
  //     //
  //     this.getAllAnswers(300, 1, this.channalId);
  //     return this.questions;
  //   });
  // }

  getDataAnswers(sizeAn, pageAn, channalId): void {
    this.userService.getDataAnswers(sizeAn, pageAn, channalId).subscribe(answers => {
      this.answers = answers.data;
      console.log('15 answers', this.answers);

      this.answers.forEach(function (value) {
        if (value.attributes.useranswer && value.attributes.useranswer !== undefined) {
          console.log('16 answers', value.attributes.useranswer);
          value.result = value.attributes.useranswer;

          // debugger;
          switch (value.attributes.useranswer) {
            case 'Y':
              value.imgUrl = 'assets/images/yes-choosed.png';
              // value.color = '#bfd6bf';
              break;
            case 'N':
              value.imgUrl = 'assets/images/no-choosed.png';
              // value.color = '#f09f9d';
              break;
            case 'S':
              value.imgUrl = 'assets/images/skip-choosed.png';
              // value.color = '#fbe59f';
              break;
            default:
              value.imgUrl = 'assets/images/05-01.png';
              // value.color = '#f1f1f1';
              break;
          }
          // let arr = [{N: value.attributes.countno}, {S: value.attributes.countskip}, {Y: value.attributes.countyes}];

          const arr = [value.attributes.countno, value.attributes.countskip, value.attributes.countyes];
          const max = Math.max.apply(Math, arr.map((o) => {
            return o;
          }));
          const maxArr = [];
          let choose;
          arr.forEach(function (el, i) {
            if (el === max) {
              choose = i;
              maxArr.push(i);
            }
          });
          if (maxArr.length > 1) {
            if (arr[0] === arr[1] === arr[2]) {
              choose = 0;
            } else if (arr[0] === arr[1]) {
              choose = 0;
            } else if (arr[0] === arr[2]) {
              choose = 0;
            } else if (arr[1] === arr[2]) {
              choose = 2;
            }

          }

          console.log('correctanswer', maxArr, arr, choose);
          switch (choose) {
            case 2:
              value.color = '#bfd6bf';
              break;
            case 0:
              value.color = '#f09f9d';
              break;
            case 1:
              value.color = '#fbe59f';
              break;
            default:
              value.color = '#f1f1f1';
              break;
          }
          value.status = 'answer';
        }
        value.confirmed = false;
        // value.answerId = value.id;
      });
      console.log('15 answers', this.answers);
      this.staticDataToShow = this.answers.reverse();
      //  this.questions.push(this.staticDataToShow);
      if (this.answers[0]) {
        this.totalAnswers = this.answers[0].attributes.totalnumber;
        console.log('totalAnswers-', this.totalAnswers);

      } else {
        this.totalAnswers = 0;
      }
      this.totalElements = this.totalAnswers + ((this.totalQuestion !== undefined) ? this.totalQuestion : this.totalQuestion = 0);

      console.log('totalElements-', this.totalElements, this.totalAnswers);
      if (isNaN(this.totalElements)) {
        this.totalElements = 0;
      }
      console.log(' totalElements', this.totalElements);

      return this.answers;
      // return this.questions.concat(this.answers);
    });
  }

  postDataAnswer(channelId, qId, result): void {
    console.log('postAnswer answerId, result', channelId, qId, result);
    // let objStaticData = this.findObjectById(this.questions, id);
    // let index = this.questions.indexOf(objStaticData);
    // console.log("postAnswer objStaticData", objStaticData);
    // let answerId=objStaticData.answerId;
    console.log('postAnswer answerId', qId, result);
    // console.log("postAnswer this.questions[index]", this.questions[index]);
    // console.log("postAnswer this.questions[index].answerId", this.questions[index].answerId);

    this.userService.postDataAnswer(channelId, qId, result).subscribe(answer => {

      this.answer = answer;

      return this.answer;
    });
  }

  postDataAnswerWithGetAnswer(channelId, qId, result): void {
    console.log('postAnswer answerId, result', channelId, qId, result);
    console.log('postAnswer answerId', qId, result);
    this.userService.postDataAnswer(channelId, qId, result).subscribe(answer => {
      this.answer = answer;
      this.getDataAnswers(300, 1, this.channalId);
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

  isShow = true;


  staticData = Staticdata;

  // console.log("imageUrles",staticData);

  sortArrayByKey(array, key) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
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

  findObjectByQustionId(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].attributes.questionid === value) {
        return array[i];
      }
    }
    return null;
  }


  chooseFix(choose, id, status) {
    if (status !== 'fake') {
      // debugger;
      console.log('choose@@,id,status', choose, id, status);
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
        console.log('this.questions[index]', this.questions[index]);
        // dont forget adding staticDataShow in ..
        this.postDataAnswerWithGetAnswer(this.channalId, this.questions[index].id, this.questions[index].result);

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
          // this.postSeenQuetion(this.questions[index + 1], this.channalId);

          this.staticDataToShowFix[0] = this.questions[index + 1];
          console.log('this.staticDataToShowFix[0]', this.staticDataToShowFix[0]);
          this.pageCAll = this.pageCAll + 1;
          console.log('10 this.pageCAll', this.pageCAll);
          if (this.pageCAll === 98) {
            console.log('paging', index, this.page);
            this.page = this.page + 1;
            // size, page, channelId
            this.getDataQuestions(100, this.page, this.channalId);
            this.pageCAll = 0;
          }

          console.log('index', index + 1);
        } else {
          console.log('staticDataToShowFix before', this.staticDataToShowFix);

          this.staticDataToShowFix = this.fakeQuestion;
          console.log('staticDataToShowFix', this.staticDataToShowFix);

          console.log(' this.isShow', this.isShow);
        }
        console.log('im here');
      } else if (choose !== 'confirm' && status !== 'fake') {
        this.questions[index].result = choose;
        this.questions[index].imgUrl = this.getUrl(choose, this.questions[index].confirmed);
        this.staticDataToShowFix[0] = this.questions[index];
      }

      if (choose === 'confirm') {
        console.log('confirm');
      }
    }
  }

// test=false;
  chooseUp(choose, questionid, status) {
    // if(this.test) {


    console.log('answers', this.answers);
    console.log('questions', this.questions);
    console.log('choose', choose);

    if (status === 'new') {
      console.log({choose, questionid, status});
      const objStaticData = this.findObjectByQustionId(this.questions, questionid);
      const objStaticDataShow = this.findObjectByQustionId(this.staticDataToShow, questionid);
      const index = this.questions.indexOf(objStaticData);
      const indexShow = this.staticDataToShow.indexOf(objStaticDataShow);
      console.log('objStaticData', objStaticData);
      console.log('objStaticDataShow', objStaticDataShow);
      console.log('index', index);
      console.log('indexShow', indexShow);

      if (choose === 'confirm') {
        this.questions[index].confirmed = true;
        this.questions[index].imgUrl = this.getUrl(this.questions[index].result, this.questions[index].confirmed);

        // this.questions[index].color = this.getColor(this.questions[index].result);

        this.staticDataToShow[indexShow] = this.questions[index];
        this.postDataAnswer(this.channalId, this.questions[index].id, this.questions[index].result);
        // this.putAnswer(answerId, this.questions[index].result);
      } else if (choose !== 'confirm') {
        this.questions[index].confirmed = false;
        this.questions[index].result = choose;
        this.questions[index].imgUrl = this.getUrl(choose, this.questions[index].confirmed);
        this.staticDataToShow[indexShow] = this.questions[index];
      }

      if (choose === 'confirm') {
        console.log('confirm');
      }
    } else {
      console.log({choose, questionid, status});
      // this.setClassFixed={'animated':false ,'lightSpeedIn':false,'slideInLeft':false,'delay-2s':false,'display-hidden':false};
      const objStaticData = this.findObjectByQustionId(this.answers, questionid);
      const objStaticDataShow = this.findObjectByQustionId(this.staticDataToShow, questionid);
      const index = this.answers.indexOf(objStaticData);
      const indexShow = this.staticDataToShow.indexOf(objStaticDataShow);
      console.log('objStaticData', objStaticData);
      console.log('objStaticDataShow', objStaticDataShow);
      console.log('index', index);
      console.log('indexShow', indexShow);

      if (choose === 'confirm') {
        this.answers[index].confirmed = true;
        this.answers[index].imgUrl = this.getUrl(this.answers[index].result, this.answers[index].confirmed);

        // this.answers[index].color = this.getColor(this.answers[index].result);
        console.log('prepost', this.answers[index]);
        this.staticDataToShow[indexShow] = this.answers[index];

        this.postDataAnswer(this.channalId, this.answers[index].attributes.questionid, this.answers[index].result);
        // this.getDataAnswers(300, 1, this.channalId);

        // this.putAnswer(answerId, this.answers[index].result);
      } else if (choose !== 'confirm') {
        this.answers[index].confirmed = false;
        this.answers[index].result = choose;
        this.answers[index].imgUrl = this.getUrl(choose, this.answers[index].confirmed);
        // if (this.staticData[index].status === "new") {
        this.staticDataToShow[indexShow] = this.answers[index];
      }

      if (choose === 'confirm') {
        console.log('confirm');
      }
    }
  }
}
