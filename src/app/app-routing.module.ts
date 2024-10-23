import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TeacherDashboardComponent } from './teacher/teacher.component';
import { AuthGuard } from './authguard/auth.guard';
import { HomeComponent } from './sidebar-item/home/home.component';
import { ClassesComponent } from './sidebar-item/classes/classes.component';
import { CoursesComponent } from './sidebar-item/courses/courses.component';
import { CalendarComponent } from './sidebar-item/calendar/calendar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
