import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { SurveyformComponent } from '../components/surveyform/surveyform.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, LoginComponent,SurveyformComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomePageModule {}
