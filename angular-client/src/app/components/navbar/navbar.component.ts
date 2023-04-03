import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  constructor(private router: Router, public userService: UserService) {

  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }


  logout(): void {
    this.userService.logout();
  }

}
