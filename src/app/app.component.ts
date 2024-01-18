import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project3-selling-phone-web';
   constructor(private auth: AuthenticationService, private router: Router){
    auth.currentUser$.subscribe(user=>{
      if(!user){
        return;
      }
      let returnUrl=localStorage.getItem('returnUrl') as string;
      if(!returnUrl){
        return;
      }
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    });
  }

}
