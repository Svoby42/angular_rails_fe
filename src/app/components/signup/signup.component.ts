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
  request_body: any;
  successful: boolean = false;

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
    this.authService.signUp(this.signupForm.value).subscribe(
      data => {
        this.successful = true;
        this.errorMessage = "Registrace úspěšná, probíhá přesměrování"
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000)  // po 3 sekundach redirect
      }, err => {
        console.log(err.error);
        if (err?.status == 409) {
          this.errorMessage = 'Uživatelské jméno již existuje';
        } else {
          this.errorMessage = 'Chyba ' + err.errorMessage;
          console.log(err);
        }
    });
  }
}
