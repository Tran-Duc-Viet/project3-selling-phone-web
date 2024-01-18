import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({

  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css',

})
export class BsNavbarComponent {

  constructor(public auth: AuthenticationService){
  }

  logout(){
    this.auth.logout();
  }
}
