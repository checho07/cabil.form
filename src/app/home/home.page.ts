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

  /**
   * @ignore
   */
  constructor(private modalController: ModalController, private authService:AuthService) {

    var userInfo = sessionStorage.getItem('userInfo')


    if(userInfo == null){
      this.presentModal();
    }


  }

  /**
   * Funcion que sirve para presentar la ventana modal del lOGIN
   */
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

  /**
   * Funcion que sirve ara terminar sesion
   */
  logout(){
    this.authService.logout();
    this.presentModal();
  }

}
