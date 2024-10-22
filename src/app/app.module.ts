import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TeacherDashboardComponent } from './teacher/teacher.component'; 
import { AuthGuard } from './authguard/auth.guard';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './sidebar-item/home/home.component';
import { ClassesComponent } from './sidebar-item/classes/classes.component';
import { CoursesComponent } from './sidebar-item/courses/courses.component';
import { CalendarComponent } from './sidebar-item/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TeacherDashboardComponent,
    SidebarComponent,
    HomeComponent,
    ClassesComponent,
    CoursesComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
