import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {Staticdata} from '../staticContainer';
import {ImageUrl} from '../staticContainer';
// import { Staticdata } from './../staticContainer';
import {UserService} from './../_services/user.service';
import {switchMap} from 'rxjs/operators';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../_models';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss']
})
export class ListMessageComponent implements OnInit {
  currentTextAreaLength = 0;
  submitted = false;
  userText: FormGroup;
  addText = false;
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
  questionsAddText;
  currentUser: User;
  tempEvent;
  setClassAddText = {
    animated: true,
    lightSpeedIn: false,
    slideInRight: true,
    'delay-2s': true,
    'display-hidden': false
  };
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

// s
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    // this.userService.userEmitter.subscribe(user => {
    //   this.currentUser = user;
    // });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser list-component', this.currentUser);

    console.log('staticDataToShow', this.staticDataToShow);
    console.log('staticData', this.staticData);
    console.log('staticDataToShowFix', this.staticDataToShowFix);
  }

  ngOnInit() {
    this.userText = this.formBuilder.group({
      Text: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(140)]]
    });
    this.activatedRoute.params.subscribe(routeParams => {
      // this.catName=routeParams;
      console.log('routeParams.id', routeParams.id);
      this.channalId = routeParams.id;
    });
    this.staticDataToShow = [];
    // console.log("TimeStamp", Math.floor(Date.now() / 1000));
    this.staticDataToShowFix = [];
    // this.getAllAnswers();
    this.getAllQuestions(300, this.page, this.channalId);
  }


  onKey(event) {
    // this.userText;
    // this.tempCount += 1;
    this.currentTextAreaLength = event.target.value.length;
    console.log(event.target.value.length);
    console.log(this.userText);

  }

  get f() {
    return this.userText.controls;
  }

  onSubmit() {
    // this.submitted = true;
    console.log('submit pressed');
    // stop here if form is invalid
    if (this.userText.invalid) {
      return;
    }
  }

  goToAddText() {
    // debugger;
    this.questionsAddText = [
      {
        imgUrl: 'assets/images/button_writing.png',
        result: '',
        color: '',
        confirmed: false,
        status: 'Question',
        id: this.channalId
      }
    ];
    this.addText = true;
    console.log('gotoAdd question', this.staticDataToShowFix[0]);
    console.log('gotoAdd questionsAddText', this.questionsAddText);

  }

  goToQuestions(event: boolean) {
    this.tempEvent = event;
    // this.addText = event;
    this.getAllAnswers(300, 1, this.channalId,);
    console.log('goToQuestions question', this.staticDataToShowFix);

  }

  getAllQuestions(size, page, channelId): void {
    this.userService.getAllQuestions(size, page, channelId).subscribe(questions => {
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

        this.postSeenQuetion(this.questions[0], this.channalId);
        console.log('questions[0]111', this.questions[0]);


        console.log('10 staticDataToShowFix', this.staticDataToShowFix[0]);
      } else {
        this.questions = this.fakeQuestion;
        this.staticDataToShowFix.push(this.questions[0]);
      }
      this.getAllAnswers(300, 1, this.channalId);
      (this.questions[0]) ? this.totalQuestion = this.questions[0].attributes.totalnumber : this.totalQuestion = 0;

      // this.totalQuestion = this.questions[0].attributes.totalnumber;
      console.log('totalQuestion', this.totalQuestion);
      return this.questions;
    });
  }

  getAllQuestionsPaging(size, page, channelId): void {
    this.userService.getAllQuestions(size, page, channelId).subscribe(questions => {
      const newQuestion = this.questions.concat(questions.data);
      // this.questions.concat(questions.data);
      this.questions = newQuestion;
      // this.questions = this.questions.sort(this.compareKeys);

      this.questions.forEach(function (value) {
        value.result = '';
        value.imgUrl = 'assets/images/05-01.png';
        value.color = '';
        value.confirmed = false;
        value.status = 'new';
      });
      this.staticDataToShowFix.push(this.questions[0]);

      this.getAllAnswers(300, 1, this.channalId);
      return this.questions;
    });
  }

  getAllAnswers(sizeAn, pageAn, channalId): void {
    console.log('addText', this.addText, this.tempEvent);

    this.userService.getAllAnswers(sizeAn, pageAn, channalId).subscribe(answers => {
      this.answers = answers.data;
      console.log('addText', this.addText, this.tempEvent);

      this.answers.forEach(function (value) {
        if (value.attributes.currentanswer && value.attributes.currentanswer != undefined) {
          console.log('16 answers', value.attributes.currentanswer);
          value.result = value.attributes.currentanswer;

          // debugger;
          switch (value.attributes.currentanswer) {
            case 'Y':
              value.imgUrl = 'assets/images/yes-choosed.png';
              value.color = '#bfd6bf';
              break;
            case 'N':
              value.imgUrl = 'assets/images/no-choosed.png';
              value.color = '#f09f9d';
              break;
            case 'S':
              value.imgUrl = 'assets/images/skip-choosed.png';
              value.color = '#fbe59f';
              break;
            default:
              value.imgUrl = 'assets/images/05-01.png';
              value.color = '#f1f1f1';
              break;
          }

          value.status = 'answer';
        }
        value.confirmed = false;
        value.answerId = value.id;
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
      if (!this.tempEvent) {
        this.addText = this.tempEvent;
        console.log('addText', this.addText, this.tempEvent);
      }
      return this.answers;
      // return this.questions.concat(this.answers);
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

  postUserAnswer(data): void {
    console.log({data});
    // this.userService.sendUserQuestion(data, this.channalId).subscribe(data => {
    //   const res = data;
    //   console.log({res});
    this.getAllAnswers(300, 1, this.channalId);
    //   return data;
    // });
    this.questionsAddText = [];
    this.addText = false;
    this.userText.reset();
  }

  putAnswer(answerId, result): void {
    this.userService.putAnswer(answerId, result).subscribe(answer => {
      this.answer = answer;

      return this.answer;
    });
  }

  // data;
  postSeenQuetion(question, channelId): void {
    const objStaticData = this.findObjectById(this.questions, question.id);
    const index = this.questions.indexOf(objStaticData);
    console.log('postSeenq', question, 'index', index);

    this.userService.postSeenQuetion(question.id, channelId).subscribe(data => {
      question.answerId = data.id;
      console.log('postSeenq', question, 'index', index);
      // this.answer = answer;
      this.staticDataToShowFix.push(question);

      this.questions[index] = question;
      return question;
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

  getUrlUserText(choose, confirmed) {
    switch (choose) {
      case 'Y':
        if (confirmed) {
          return 'assets/images/button_writing_yes_approved.png';
        } else {
          return 'assets/images/button_writing_yes.png';
        }
      case 'N':
        if (confirmed) {
          return 'assets/images/button_writing_no_approved.png';
        } else {
          return 'assets/images/button_writing_no.png';
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
  test = false;

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

  findObjectByAnswer(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].answerId === value) {
        return array[i];
      }
    }
    return null;
  }


  chooseFix(choose, answerId, id, status) {
    if (status !== 'fake') {
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
          this.postSeenQuetion(this.questions[index + 1], this.channalId);
          this.staticDataToShowFix[0] = this.questions[index + 1];
          //  this.postSeenQuetion( this.staticDataToShowFix[0].id);
          console.log('this.staticDataToShowFix[0]', this.staticDataToShowFix[0]);
          this.pageCAll = this.pageCAll + 1;
          console.log('10 this.pageCAll', this.pageCAll);
          if (this.pageCAll === 98) {
            console.log('paging', index, this.page);
            this.page = this.page + 1;
            this.getAllQuestionsPaging(100, this.page, this.channalId);
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
        // }r
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

  chooseAddText(choose, answerId, id, status) {
    if (status !== 'fake') {
      console.log('choose@@,answerId,id', choose, answerId, id);
      if (choose === 'confirm' && this.questionsAddText[0].result) {
        this.questionsAddText[0].confirmed = true;
        this.questionsAddText[0].imgUrl = this.getUrlUserText(this.questionsAddText[0].result, this.questionsAddText[0].confirmed);
        // this.questionsAddText[0].color = this.getColor(this.questionsAddText[0].result);
        console.log('this.questionsAddText[0]', this.questionsAddText[0]);
// dontforge
        if (this.userText.controls.Text.status === 'VALID') {
          this.postUserAnswer({'Text': this.userText.controls.Text.value, 'Answer': this.questionsAddText[0].result});
          console.log('VALID', this.userText.controls.Text.value);
        } else {
          console.log('not working', this.userText.controls.Text.status);
        }
        this.setClassTop = {
          animated: false,
          slideInUp: false,
          overfloyY: false,
          'display-hidden': false
        };
        this.containerScroll = {
          overfloyY: false
        };
        // if (this.questions[index + 1]) {
        //   this.postSeenQuetion(this.questions[index + 1], this.channalId);
        //   this.staticDataToShowFix[0] = this.questions[index + 1];
        //   console.log('this.staticDataToShowFix[0]', this.staticDataToShowFix[0]);
        //   this.pageCAll = this.pageCAll + 1;
        //   console.log('10 this.pageCAll', this.pageCAll);
        //   if (this.pageCAll === 98) {
        //     console.log('paging', index, this.page);
        //     this.page = this.page + 1;
        //     this.getAllQuestionsPaging(100, this.page, this.channalId);
        //     this.pageCAll = 0;
        //   }
        //   console.log('index', index + 1);
        // } else {
        //   console.log('staticDataToShowFix before', this.staticDataToShowFix);
        //
        //   this.staticDataToShowFix = this.fakeQuestion;
        //   console.log('staticDataToShowFix', this.staticDataToShowFix);
        //
        //   console.log(' this.isShow', this.isShow);
        // }
        console.log('im here');

        // this.questions[index].status = 'up';
        // this.staticDataToShow.unshift(this.questions[index]);
        // console.log('staticDataToShow', this.staticDataToShow);
        // this.setClassFixed = {
        //   animated: true,
        //   lightSpeedIn: false,
        //   slideInLeft: true,
        //   'delay-2s': true,
        //   'display-hidden': false
        // };
        // this.setClassTop = {
        //   animated: true,
        //   slideInUp: true,
        //   overfloyY: false,
        //   'display-hidden': false
        // };
        // this.containerScroll = {
        //   overfloyY: false
        // };
        // }r
      } else if (choose !== 'confirm' && status !== 'fake') {
        this.questionsAddText[0].result = choose;
        this.questionsAddText[0].imgUrl = this.getUrlUserText(choose, this.questionsAddText[0].confirmed);
        // this.questionsAddText[0] = this.questions[index];
      }

      if (choose === 'confirm') {
        console.log('confirm');
      }
    }
  }

  chooseUp(choose, answerId, status) {
    if (status === 'new') {
      console.log({choose, answerId, status});
      // this.setClassFixed={'animated':false ,'lightSpeedIn':false,'slideInLeft':false,'delay-2s':false,'display-hidden':false};
      const objStaticData = this.findObjectByAnswer(this.questions, answerId);
      const objStaticDataShow = this.findObjectByAnswer(this.staticDataToShow, answerId);
      const index = this.questions.indexOf(objStaticData);
      const indexShow = this.staticDataToShow.indexOf(objStaticDataShow);
      console.log('objStaticData', objStaticData);
      console.log('objStaticDataShow', objStaticDataShow);
      console.log('index', index);
      console.log('indexShow', indexShow);

      if (choose === 'confirm') {
        this.questions[index].confirmed = true;
        this.questions[index].imgUrl = this.getUrl(this.questions[index].result, this.questions[index].confirmed);

        this.questions[index].color = this.getColor(this.questions[index].result);

        this.staticDataToShow[indexShow] = this.questions[index];
        this.putAnswer(answerId, this.questions[index].result);
      } else if (choose !== 'confirm') {
        this.questions[index].confirmed = false;
        this.questions[index].result = choose;
        this.questions[index].imgUrl = this.getUrl(choose, this.questions[index].confirmed);
        // if (this.staticData[index].status === "new") {
        this.staticDataToShow[indexShow] = this.questions[index];
      }

      if (choose === 'confirm') {
        console.log('confirm');
      }
    } else {
      console.log({choose, answerId, status});
      // this.setClassFixed={'animated':false ,'lightSpeedIn':false,'slideInLeft':false,'delay-2s':false,'display-hidden':false};
      const objStaticData = this.findObjectByAnswer(this.answers, answerId);
      const objStaticDataShow = this.findObjectByAnswer(this.staticDataToShow, answerId);
      const index = this.answers.indexOf(objStaticData);
      const indexShow = this.staticDataToShow.indexOf(objStaticDataShow);
      console.log('objStaticData', objStaticData);
      console.log('objStaticDataShow', objStaticDataShow);
      console.log('index', index);
      console.log('indexShow', indexShow);

      if (choose === 'confirm') {
        this.answers[index].confirmed = true;
        this.answers[index].imgUrl = this.getUrl(this.answers[index].result, this.answers[index].confirmed);

        this.answers[index].color = this.getColor(this.answers[index].result);

        this.staticDataToShow[indexShow] = this.answers[index];
        this.putAnswer(answerId, this.answers[index].result);
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
