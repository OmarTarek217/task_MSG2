import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherDashboardComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}

  logout() {
    console.log('Logout called');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
