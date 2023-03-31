import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
  goToHomePage() {
    this.router.navigate(['/']);
  }
}
