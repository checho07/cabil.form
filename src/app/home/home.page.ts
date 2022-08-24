import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController, private authService:AuthService) {

    var userInfo = sessionStorage.getItem('userInfo')


    if(userInfo == null){
      this.presentModal();
    }


  }


  async presentModal() {
    const modal = await this.modalController.create({
    component: LoginComponent,
    componentProps: { value: 123 },
    backdropDismiss:false,
    animated:true,
    mode:'ios'
    });
  
    await modal.present();
  
  }

  logout(){
    this.authService.logout();
    this.presentModal();
  }

}
