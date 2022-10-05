import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User;
  errorMessage: string = "";
  confirmedPassowrd: string = "";

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
  registerUser(){
    console.log(this.user)
    this.authService.signUp(this.user).subscribe(
      data => {
        this.router.navigate(['/login']);
      }, err => {
        if (err?.status == 409) {
          this.errorMessage = 'Uživatelské ';
        } else {
          this.errorMessage = 'Chyba ' + err.errorMessage;
          console.log(err);
        }
      })
  }

}
