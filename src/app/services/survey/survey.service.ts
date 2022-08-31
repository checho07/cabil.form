import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Survey } from 'src/app/interfaces/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  /** 
   * URL base de la API
   */
  private baseUrl = 'https://cabilapp.herokuapp.com/';

  constructor(private httpClient: HttpClient) { }

  
  /**
   * Funcion que hace llamado a la API para obtener una encuesta por id
   * @param {string} id id de la encuesta  
   * @returns 
   */
  getSurveyById(id:string){
    return this.httpClient.get(`${this.baseUrl}survey/${id}`);
  }

  /**
   * Funcion que hace llamado a la API para obtener todas las encuestas de la base de datos
   * @returns retorna un observable con las encuestas
   */
  getAllSurveys(){
    return this.httpClient.get(`${this.baseUrl}survey`);
  }

  /**
   * Funcion que hace llamado a la API para actualizar una encuesta por id
   * @param {string} id id de la encuesta que se va a actualizar
   * @param {string} data  Objeto tipado que contiene la informacion para actualizar una encuesta
   * @returns retorna la respuesta de confirmacion
   */
  updateSurvey(id:string, data:Survey){

    var dataToUpdate = {id:id, data: data};

    return this.httpClient.patch(`${this.baseUrl}survey`,dataToUpdate);
  }

  /**
   * Funcion que hace llamado a la API para crear una encuesta en la base de datos
   * @param {object} data  Objeto tipado que contiene la informacion para crear una encuesta
   * @returns retorna la respuesta de confirmacion
   */
  createSurvey(data:Survey){
    return this.httpClient.post(`${this.baseUrl}survey`,data);
  }

  /**
   * Funcion que hace llamado a la API para eliminar una encuesta por id
   * @param {string} id id de la encuesta que se va a eliminar
   * @returns retorna la respuesta de confirmacion
   */
  deleteSurveyId(id:string){
    return this.httpClient.delete(`${this.baseUrl}survey/${id}`);
  }




}
