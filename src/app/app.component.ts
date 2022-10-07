import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuCollapsed = true;
  constructor(public authService: AuthService, public userService: UserService) {}
  logout() {
    this.userService.doLogout();
  }
}
