import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  message: string = "";
  currentUser: any = {};
  token: string = "";
  constructor(
    public router: Router,
    public authService: AuthService,
    public userService: UserService
  ) { }
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((res) => {
      this.currentUser = res.user
    });
  }
}
