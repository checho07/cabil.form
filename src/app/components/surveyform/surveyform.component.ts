import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Survey, _pregunta } from 'src/app/interfaces/survey';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-surveyform',
  templateUrl: './surveyform.component.html',
  styleUrls: ['./surveyform.component.scss'],
})
export class SurveyformComponent implements OnInit {

  surveyForm: FormGroup;
  private userinfo;
  pregunta = 1;
  preguntas = [];
  btnpreguntasdisabled = false;
  preguntaObj: _pregunta = {
    id : this.pregunta,
    text: '',
    options: ['','','']

  }

  htmlToAdd:any;
  dataFromSheet:any;

  encuestasFromDb

  constructor(private formBuilder: FormBuilder, private surveyService: SurveyService, private loadingController: LoadingController, private toastController: ToastController) { 

    this.userinfo = JSON.parse(sessionStorage.getItem('userInfo'))?.user?.email;


    this.setupForm();

    this.encuestasFromDb = this.surveyService.getAllSurveys();

  }

  ngOnInit() {

  }


  setupForm() {
    this.surveyForm = this.formBuilder.group({
      id: ['', [ Validators.required]],
      name: ['', [ Validators.required]],
      fecha_creacion: [new Date() ],
      creado_por: [this.userinfo],
      activo:[true,[Validators.required]]
    });
  }

  createSurvey(){

    this.presentLoading();

    var surveyToSave: Survey = {
      ...this.surveyForm.value,
      preguntas: this.preguntas
    }

    this.surveyService.createSurvey(surveyToSave).subscribe(res => {
      this.surveyForm.reset();
      this.presentToast('Encuesta guardada','success');

    }, err => {
      this.presentToast(err,'danger');
    })


  }

  createSurveyFromExcel(){

    this.presentLoading();

    var survey = {} as Survey 

    survey.id = this.dataFromSheet[0].id;
    survey.name = this.dataFromSheet[0].nombre;
    survey.activo = true;
    survey.creado_por = this.userinfo;
    survey.fecha_creacion = new Date();
    survey.preguntas = [{}as _pregunta];


    this.dataFromSheet.forEach((element,index) => {

      if(index == 0){
        survey.preguntas.pop();
      }

      var obj: _pregunta = {
        id:index+1,
        text: element.pregunta,
        options:[element.opcion1, element.opcion2, element.opcion3] 
      }
      survey.preguntas.push(obj);
     
    });

    this.surveyService.createSurvey(survey).subscribe(res => {
      this.dataFromSheet = null;
      this.encuestasFromDb = this.surveyService.getAllSurveys();
      this.presentToast('Encuesta guardada','success');

    }, err => {
      this.presentToast(err,'danger');
    })

  }

  saveQuestion(){

    this.preguntaObj.id = this.pregunta;

    if(this.pregunta <= 12){

      this.pregunta = this.pregunta +1;
      
      this.preguntas.push(this.preguntaObj);

      this.preguntaObj = {
        id : this.pregunta,
        text: '',
        options: new Array(3)
    
      }
      
    }else{
      
    }
  }

  async presentToast(text,color) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color:color
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Guardando',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  excelFileData(ev){
    debugger
    console.log(ev)
  }


  onChange(target){

    const file = target.target.files[0];

    this.readFile(file);
 

  }


  readFile(file:File, ){

    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bufferArray);

      const wsname:string =  wb.SheetNames[0];

      const ws:XLSX.WorkSheet = wb.Sheets[wsname];

      this.dataFromSheet = XLSX.utils.sheet_to_json(ws);



    }
  }

}
