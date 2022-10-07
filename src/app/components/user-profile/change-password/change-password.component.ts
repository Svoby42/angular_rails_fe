import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  successful: boolean = false;
  errorMessage: any;
  errorPresent: boolean = false;

  changePasswordForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public router: Router
  ) { 
    this.changePasswordForm = this.fb.group({
      old_password: [''],
      password: [''],
      password_confirmation: ['']
    })
  }
  ngOnInit(): void {
    this.userService.tokenExpired();
  }
  changePassword() {
    this.userService.updatePassword(this.changePasswordForm.value, this.userService.getIdFromToken()).subscribe({
      next: res => {
        console.log(res);
        this.successful = true;
        this.errorMessage = "Heslo úspěšně změněno. Přihlaste se novým heslem. Probíhá odhlášení."
        setTimeout(() => {
          this.userService.doLogout();
        }, 3000)  // po 3 sekundach redirect
      }, 
      error: err => {
        this.errorPresent = true;
        if (err?.status === 400){
          console.log(err);
          this.errorMessage = "Nové heslo se liší od potvrzení";
        } else if(err?.status === 401){
          this.errorMessage = "Staré heslo není správné";
        }
      }
    })
  }
  public getIdFromToken(token: string){
    const result = (JSON.parse(atob(token.split('.')[1])))
    return result.id
  }
}
