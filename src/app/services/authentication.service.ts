import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$: Observable<firebase.default.User|null>;


  constructor(private auth: AngularFireAuth, private route: ActivatedRoute) {
    this.currentUser$=this.auth.authState;
  }


  login(username: string, password: string){
    let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl')||'/';
    localStorage.setItem('returnUrl',returnUrl);
    return from(this.auth.signInWithEmailAndPassword( username, password));
  }

  logout(){
    return from(this.auth.signOut());
  }

}
