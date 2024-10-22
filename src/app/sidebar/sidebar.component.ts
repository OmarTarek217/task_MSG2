import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}

  logout() {
    console.log('Logout called');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

