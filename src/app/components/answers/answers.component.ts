import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent  {

  answers: any;

  isModalOpen = false;

  answerSelected  = {} as any;

  constructor(private service: SurveyService) {

this.service.getAllAnswersFromDb().subscribe(res => {
  this.answers = res;
})

   }

  setOpen(isOpen: boolean, answer?) {
    this.answerSelected = answer;
    this.isModalOpen = isOpen;
  }
}
