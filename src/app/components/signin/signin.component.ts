import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errorExists: boolean = false;
  error: string = "";

  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public router: Router
  ) { 
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  ngOnInit(): void {
  }
  loginUser() {
    this.authService.signIn(this.signinForm.value).subscribe({
      next: res => {
        localStorage.setItem('jwt_token', res.token);
        this.router.navigate(['profil']);
      },
      error: err => {
        if (err.status === 401) {
          this.errorExists = true;
          this.error = "Špatné údaje";
        }
      }
    });
  }
}
