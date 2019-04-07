import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-user-ask',
  templateUrl: './user-ask.component.html',
  styleUrls: ['./user-ask.component.scss']
})
export class UserAskComponent implements OnInit {
  @Input() channelId: string;
  @Output() emitAddText = new EventEmitter<boolean>();

  loading = false;
  yellow = false;
  green = false;
  currentTextAreaLength = 0;
  submitted = false;
  userText: FormGroup;
  addText = false;
  confirm = 'confirm';
  totalElements: number;
  totalQuestion: number;
  totalAnswers: number;
  questions;
  answers;
  answer;
  pageCAll = 0;
  page = 1;
  staticDataToShow = [];
  staticDataToShowFix = [];
  questionsAddText;
  setClassAddText = {
    animated: true,
    lightSpeedIn: false,
    slideInRight: true,
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
  }

  ngOnInit() {

    this.questionsAddText = [
      {
        imgUrl: 'assets/images/Answer_options.png',
        result: '',
        color: '',
        confirmed: false,
        status: 'Question',
        id: this.channelId
      }
    ];
    this.userText = this.formBuilder.group({
      Text: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(140)]]
    });
    this.addText = true;
    console.log(' questionsAddText', this.questionsAddText);
  }

  get f() {
    return this.userText.controls;
  }

  onKey(event) {
    // this.userText;
    // this.tempCount += 1;
    this.currentTextAreaLength = event.target.value.length;
    // console.log(event.target.value.length);
    // console.log(this.userText);

  }

  goToQuestions() {

    // this.addText = false;
    this.emitAddText.emit(false);
    console.log('goToQuestions question', this.staticDataToShowFix);

  }


  onSubmit() {
    // this.submitted = true;
    console.log('submit pressed');
    // stop here if form is invalid
    if (this.userText.invalid) {
      return;
    }
  }

  chooseFix() {

  }

  getAllAnswers(sizeAn, pageAn, channalId): void {
    this.userService.getAllAnswers(sizeAn, pageAn, this.channelId).subscribe(answers => {
      this.answers = answers.data;

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

      return this.answers;
      // return this.questions.concat(this.answers);
    });
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
        id: this.channelId
      }
    ];
    this.addText = true;
    console.log('gotoAdd question', this.staticDataToShowFix[0]);
    console.log('gotoAdd questionsAddText', this.questionsAddText);

  }

  postUserAnswer(data): void {
    if (data.Answer === 'Y') {
      this.green = true;
    } else {
      this.yellow = true;
    }
    this.loading = true;
    console.log({data});
    this.userService.sendUserQuestion(data, this.channelId).subscribe(data => {
      const res = data;
      console.log({res});
      // this.getAllAnswers(300, 1, this.channalId);
      this.questionsAddText.length = 0;
      // this.addText = false;

      this.emitAddText.emit(false);

      // this.userText.reset();
      // this.loading = false;
      return data;
    });
  }

  getUrlUserText(choose, confirmed) {
    switch (choose) {
      case 'Y':
        if (confirmed) {
          return 'assets/images/button_writing_yes_approved.png';
        } else {
          return 'assets/images/Button_Writing yes_updated.png';
        }
      case 'N':
        if (confirmed) {
          return 'assets/images/button_writing_no_approved.png';
        } else {
          return 'assets/images/button_writing_no.png';
        }
      case 'S':
        if (confirmed) {
          return 'assets/images/user-skip-choosed.png';
        } else {
          return 'assets/images/user-skip-choosed.png';
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
          setTimeout(() => {
            this.postUserAnswer({'Text': this.userText.controls.Text.value, 'Answer': this.questionsAddText[0].result});

            console.log('Run after two seconds');
          }, 500);
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
        console.log('im here');
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

}
