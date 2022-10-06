import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
        console.log(res.user.id)
        this.authService.getUserProfile(res.user.id).subscribe((res) => {
          this.authService.currentUser = res.user;
          this.router.navigate(['profil/' + res.user.id]);
        })
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
