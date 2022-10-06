import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentTime: any;
  loggedOut: boolean = false;
  message: string = "";
  currentUser: any = {};
  token: string = "";
  constructor(
    public router: Router,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) { 
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.user;
    });
  }
  ngOnInit(): void {
    this.tokenExpired(localStorage.getItem('jwt_token')!)
  }
  private tokenExpired(token: string){

    const result = (JSON.parse(atob(token.split('.')[1])))
    const date = new Date(0);
    date.setUTCSeconds(result.exp)
    this.currentTime = Math.round(new Date().getTime() / 1000)
    console.log(this.currentTime > result.exp)
    if (this.currentTime > result.exp){
      this.authService.doLogout
      this.loggedOut = true
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000)  // po 5 sekundach redirect na login page pokud jwt vypršel
    }
  }
}
