import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide=true;



  constructor(private authService: AuthenticationService, private router: Router, private hotToast: HotToastService){

  }

  loginForm = new FormGroup({
    email: new FormControl( '', [Validators.required, Validators.email]),
    password: new FormControl( '', Validators.required)
  });

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  submit(){
    if(!this.loginForm.valid){
      return;
    }
    const{ email, password }= this.loginForm.value;
    console.log(email, password);
    this.authService.login( email as string,password as string).pipe(this.hotToast.observe({
      success: 'Logged Successfully',
      loading: 'Logging in',
      error: 'Login Failed'
    })).subscribe(() => this.router.navigate(['/home']));


  }
}
