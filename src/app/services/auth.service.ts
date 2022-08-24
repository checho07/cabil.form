import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbAuth: AngularFireAuth) { }


  loginWithEmail(userData: Credentials){

    return this.fbAuth.signInWithEmailAndPassword(userData.email,userData.password);
  
  }

  logout(){
    this.fbAuth.signOut();
    sessionStorage.clear();
    
  }

}
