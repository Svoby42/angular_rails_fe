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
  nickAlreadyExists: boolean = false

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
    }

  ngOnInit(): void {
  }
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe({
        next: (data) => {
          this.successful = true;
          this.errorMessage = "Registrace úspěšná, probíhá přesměrování"
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000)  // po 3 sekundach redirect
        },
        error: (err) => {
          console.log(err.error.error);
          err.error.error.forEach((element: { "": string; }) => {
            this.errorMessage.push(element)
          });
          console.log(err);
        }
      });
  }
  checkEmail(){
    if (this.signupForm.controls['email'].valid) {
      this.authService.validateEmail(this.signupForm.controls['email'].value).subscribe({
        next: (res) => {
          console.log(res);
          this.emailAlreadyExists = false;
        },
        error: (err) => {
          if (err?.status == 409){
            this.emailAlreadyExists = true;
            console.log(err);
          }
        }
      });
    }
  }
  checkNick(){
    if (this.signupForm.controls['name'].valid) {
      this.authService.validateNick(this.signupForm.controls['name'].value).subscribe({
        next: (res) => {
          console.log(res);
          this.nickAlreadyExists = false;
        },
        error: (err) => {
          if (err?.status == 409){
            this.nickAlreadyExists = true;
            console.log(err);
          }
        }
      })
    }
  }
}
