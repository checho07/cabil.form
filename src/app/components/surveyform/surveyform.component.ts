import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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
export class SurveyformComponent  {

 /**
   * Variable que contiende el objeto del formulario 
   */
  surveyForm: FormGroup;

  /**
   * Variable que obtiene los datos del usuario guardados durante el login
   */
  private userinfo;

  /**
   * Varaible temporal para guardar las preguntas de la encuesta
   */
  pregunta = 1;

  /**
   * Array que guardara las preguntas que se van a enviar a la base de datos
   */
  preguntas = [];

  /**
   * Variable temporal para determinar estado de la encuesta a guardar
   */
  btnpreguntasdisabled = false;

  /**
   * Objeto inicializador tipado para guardar la encuesta a enviar a base de datos
   */
  preguntaObj: _pregunta = {
    id : this.pregunta,
    text: '',
    options: ['','','']

  }

  htmlToAdd:any;

  /**
   * Varaible que contendra la informacion de la hoja de excel
   */
  dataFromSheet:any;

  /**
   * Variable que obtendra de firebase las encuestas guardadas
   */
  encuestasFromDb


  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder, 
    private surveyService: SurveyService,
     private loadingController: LoadingController, 
     private toastController: ToastController,
     private alertController: AlertController
     ) { 

    this.userinfo = JSON.parse(sessionStorage.getItem('userInfo'))?.user?.email;


    this.setupForm();

    this.encuestasFromDb = this.surveyService.getAllSurveys();

  }

 /**
    * Funcion para asignar los controladores del formulario, e inicializarlo 
    */
  setupForm() {
    this.surveyForm = this.formBuilder.group({
      id: ['', [ Validators.required]],
      name: ['', [ Validators.required]],
      fecha_creacion: [new Date() ],
      creado_por: [this.userinfo],
      activo:[true,[Validators.required]]
    });
  }

  /**
   * Funcion que presenta un loading, luego ejecuta un servicio para guardar la encuesta en base de datos
   */
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

  /**
   * funcion ue toma la data de la hoja de excel, luego la mapea y la tipea en el formato adecuado
   * para luego invocar el servicio para guardarla en la base de datos
   */
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

  /**
   * Funcion que sirve para guardar preguntas de forma manual
   */
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

  /**
   * Funcion que sirve para eliminar una encuesta de la base de datos, por medio del ID
   * @param {string} id ID de la encuesta que servira para referencia en la BD de firebase
   */
  deleteSurvey(id){

    this.presentLoading();

    this.surveyService.deleteSurveyId(id).subscribe(data => {
      this.encuestasFromDb = this.surveyService.getAllSurveys();
      this.presentToast('Encuesta eliminada', 'succes');

    },err => {
      this.presentToast(err, 'danger')
    })

    console.log(id)
  }

  /**
   * Funcion para presentar un toaster con texto y color especifico
   * @param {string} text mensaje que llevara el toaster
   * @param {string} color  Color que llevara el toaster
   */
  async presentToast(text,color) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color:`${color}`
    });
    toast.present();
  }

  /**
   * Funcion que muestra un loading que dura 2 segundos
   */
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Guardando',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
  }


  /**
   * Funcion que se ejecuta cuando se selecciona un archivo de excel
   * @param target datos del archvio obtenido por que input
   */
  onChange(target){

    const file = target.target.files[0];

    this.readFile(file);
 
  }


  /**
   * Funcion que toma como parametro el archvio seleccionado, y se ejecutan los pasos para leer y mapear la data de excel a JSON
   * @param file 
   */
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

  /***
   * Funcion para presentar una alerta de confimarcion cuando se elimina una encuesta
   */
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar esta encuesta?',
      message: ' <strong>Esta encuesta se borrará de forma permanente</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si, borrar',
          handler: () => {
           this.deleteSurvey(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

}


