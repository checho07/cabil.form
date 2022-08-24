import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Survey } from 'src/app/interfaces/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private baseUrl = 'https://cabilapp.herokuapp.com/';

  constructor(private httpClient: HttpClient) { }

  
  getSurveyById(id:string){
    return this.httpClient.get(`${this.baseUrl}survey/${id}`);
  }

  getAllSurveys(){
    return this.httpClient.get(`${this.baseUrl}survey`);
  }

  updateSurvey(id:string, data:Survey){

    var dataToUpdate = {id:id, data: data};

    return this.httpClient.patch(`${this.baseUrl}survey`,dataToUpdate);
  }

  createSurvey(data:Survey){
    return this.httpClient.post(`${this.baseUrl}survey`,data);
  }

  deleteSurveyId(id:string){
    return this.httpClient.delete(`${this.baseUrl}survey/${id}`);
  }




}
