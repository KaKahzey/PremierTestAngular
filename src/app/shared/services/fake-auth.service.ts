import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {

  private _users : User[] = [
    { id : 1, firstname : 'Khun', email : 'khun@oui.com', password : 'Khun1234'},
    { id : 2, firstname : 'Aude', email : 'aude@oui.com', password : 'Aude1234'}
  ]

  constructor() { }

  login(email : string, password : string) : User | undefined {

    //On cherche le user dont le mail est celui reçu
    let userByMail : User | undefined = this._users.find(u => u.email === email);
    //Si l'utilisateur est trouvé
    if(userByMail) {
      // Si les mdp concordent
      if(userByMail.password === password) {
        //Stockage des infos du user dans le localStorage
        localStorage.setItem('userId', userByMail.id.toString() )
        //JSON.stringify(obj) -> Si vous voulez transformer tout un objet en chaine

        return userByMail;
      }
      else {
        return undefined;
      }
    }

    return userByMail;
  }

  logout() : undefined {
    //On nettoie le storage pour enlever le token
    localStorage.clear();
    //On met à jour notre Observable mais on sait pas encore cékoi un Observable
    return undefined;
  }

}
