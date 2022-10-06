import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/entities/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User;
  errorMessage: any;
  request_body: any;
  successful: boolean = false;
  emailAlreadyExists: boolean = false

  signupForm: FormGroup;
  constructor(
    public fb: FormBuilder, 
    public authService: AuthService, 
    public router: Router
    ) { 
      this.signupForm = this.fb.group({
        full_name: [''],
        name: [''],
        email: [''],
        password: [''],
        password_confirmation: ['']
      });
      this.signupForm.get('email')?.valueChanges.subscribe(change => {
        this.checkEmail
      })
    }

  ngOnInit(): void {
  }
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe(
      data => {
        this.successful = true;
        this.errorMessage = "Registrace úspěšná, probíhá přesměrování"
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000)  // po 3 sekundach redirect
      }, err => {
        console.log(err.error.error);
        if (err?.status == 422) {
          this.errorMessage = []
          err.error.error.forEach((element: { "": string; }) => {
            this.errorMessage.push(element)
          });
          console.log(err);
        } else {
          this.errorMessage = []
          err.error.error.forEach((element: { "": string; }) => {
            this.errorMessage.push(element)
          });
          console.log(err);
        }
    });
  }
  checkEmail(){
    if (this.signupForm.controls['email'].valid) {
      this.authService.validateEmail(this.signupForm.controls['email'].value).subscribe(
        (res) => {
          console.log(res);
          console.log(res.status)
      }, err => {
        if(err?.status ==  409){
          this.emailAlreadyExists = true;
          console.log(err);
        }
      })
    }
  }
}
