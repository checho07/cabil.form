import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * @ignore
   * @param fbAuth 
   */
  constructor(private fbAuth: AngularFireAuth) { }

  /**
   * Funcion que toma el email y contraseña y permite realizar el inicio de sesion con firebaseauth
   * @param {object} userData objeto tipado que contiene el usuario y contraseña
   * @returns retorna un observable 
   */
  loginWithEmail(userData: Credentials){

    return this.fbAuth.signInWithEmailAndPassword(userData.email,userData.password);
  
  }

  /**
   * Funcion para cerrar sesion y eliminar la data del usuario de la base de datos temporal
   */
  logout(){
    this.fbAuth.signOut();
    sessionStorage.clear();
    
  }

}
