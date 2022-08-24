import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loading:any;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController) {

   

   }

   setupForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['',  [Validators.minLength(6), Validators.required]],
    });
  }

  ngOnInit() {
    this.setupForm();
  }

  login(){

    this.presentLoading();
    this.authService.loginWithEmail(this.loginForm.value).then(res => {

      sessionStorage.setItem('userInfo',JSON.stringify(res));
      this.modalController.dismiss();
    },async (err) => {
      this.presentToast(err.message);
      

    })

  }
 
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      color:'danger',
      buttons:['ok']
    });
    toast.present();
  }

  async presentLoading() {
     const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration:1000
    });
    await loading.present();


  }

}
